# n8n-nodes-topfact-archiv - AI Agent Instructions

## Project Overview

This is an **n8n community node package** for integrating topfact Archiv API. n8n nodes are TypeScript plugins that extend n8n's workflow automation capabilities with custom integrations.

**Architecture**: Single node (`TopfactArchiv.node.ts`) with operation-based routing to modular operation handlers in `operations/` directory.

## Critical Workflow Commands

- **Development**: `npm run dev` - Builds with watch mode and starts n8n locally at http://localhost:5678
- **Linting**: `npm run lint` (check) or `npm run lint:fix` (auto-fix)
- **Build**: `npm run build` - Compiles TypeScript to `dist/` for publishing
- **Release**: `npm run release` - Uses release-it for versioning

All commands use `@n8n/node-cli` which is included as a dev dependency.

## Project-Specific Patterns

### Node Structure (Non-Declarative Approach)
This project uses **custom execute methods** rather than n8n's declarative/low-code style:
- Main node: `nodes/TopfactArchiv/TopfactArchiv.node.ts` defines UI properties and routes operations
- Operations: Separated into `operations/getArchives.ts` and `operations/searchDocuments.ts`
- Each operation handles its own HTTP requests using `this.helpers.httpRequest()`

### Authentication Flow (Two-Step Pattern)
**Critical**: topfact Archiv API requires login before every API call:
1. Call `GET /Auth/Login` with Basic Auth (username/password) → returns `accessKey`
2. Use `accessKey` in `accesskey` header for subsequent API requests

Example from `getArchives.ts`:
```typescript
// Step 1: Login
const loginResponse = await this.helpers.httpRequest({
  method: 'GET',
  url: `${apiUrl}/api/auth/login`,
  auth: { username, password },
});
const accessKey = loginResponse.accessKey;

// Step 2: Use accessKey
await this.helpers.httpRequest({
  url: `${apiUrl}/api/archives`,
  headers: { accesskey: accessKey },
});
```

### Operation Handler Pattern
- Operations receive `IExecuteFunctions` context via `call(this, ...)`
- Use `this.getNodeParameter()` for user inputs, with item index for batch processing
- Return array of `INodeExecutionData[]` with `json` property containing response data
- Array responses automatically map to multiple items: `response.map(item => ({ json: item }))`

### Credential Configuration
File: `credentials/TopfactArchiv.credentials.ts`
- Credentials expose: `username`, `password`, `apiUrl`
- Access via: `await this.getCredentials('topfactArchivApi')`
- Built-in auth test uses `/Auth/Login` endpoint

### Error Handling Convention
- Operations throw descriptive errors: `throw new Error('Failed to get archives: ${error.message}')`
- Main node wraps calls in try-catch, respects `continueOnFail()` setting
- Failed items return error in JSON when continue-on-fail is enabled

## Key Files and Directories

- `nodes/TopfactArchiv/TopfactArchiv.node.ts` - Main node definition with UI properties
- `nodes/TopfactArchiv/operations/` - Operation handlers (getArchives, searchDocuments)
- `credentials/TopfactArchiv.credentials.ts` - Auth configuration
- `package.json` → `n8n.nodes` array registers nodes; `n8n.credentials` registers credentials
- `tsconfig.json` - Strict TypeScript config, outputs to `dist/`, includes JSON files

## Package Configuration

- **Package name must start with** `n8n-nodes-` (npm/n8n requirement)
- **Keywords must include** `n8n-community-node-package` for npm discoverability
- Icon files (`.svg`) in node directory must be referenced in node definition
- Built output in `dist/` is what gets published (see `files` in package.json)

## Development Constraints

- **No external runtime dependencies** - only peer dependency on `n8n-workflow`
- Uses n8n's `IHttpRequestMethods`, `INodeExecutionData`, `IExecuteFunctions` types
- ESLint config from `@n8n/node-cli` enforces n8n-specific rules (e.g., credential field naming)
- TypeScript target is ES2019 with CommonJS modules

## Adding New Operations

1. Create operation handler in `operations/newOperation.ts` exporting async function
2. Add operation to `TopfactArchiv.node.ts` properties options array
3. Add operation-specific parameters with `displayOptions.show.operation` conditions
4. Add case to execute method: `if (operation === 'newOperation') { ... }`
5. Follow two-step auth pattern: login → accessKey → API call
