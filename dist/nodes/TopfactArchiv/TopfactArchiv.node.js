"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopfactArchiv = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const getArchives_1 = require("./operations/getArchives");
const searchDocuments_1 = require("./operations/searchDocuments");
const getUser_1 = require("./operations/getUser");
const getVersion_1 = require("./operations/getVersion");
class TopfactArchiv {
    constructor() {
        this.description = {
            displayName: 'topfact Archiv API',
            name: 'topfactArchiv',
            icon: { light: 'file:topfact.svg', dark: 'file:topfact.dark.svg' },
            group: ['input'],
            version: 1,
            description: 'Access topfact Archiv API to get archives and search documents',
            defaults: {
                name: 'topfact Archiv API',
            },
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            usableAsTool: true,
            credentials: [
                {
                    name: 'topfactArchivApi',
                    required: true,
                    displayOptions: {
                        show: {},
                    },
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Get Archives',
                            value: 'getArchives',
                            description: 'Get all available archives',
                            action: 'Get all archives',
                        },
                        {
                            name: 'Get User',
                            value: 'getUser',
                            description: 'Get current user information',
                            action: 'Get user information',
                        },
                        {
                            name: 'Get Version',
                            value: 'getVersion',
                            description: 'Get API version information',
                            action: 'Get version information',
                        },
                        {
                            name: 'Search Documents',
                            value: 'searchDocuments',
                            description: 'Search for documents in archives',
                            action: 'Search documents',
                        },
                    ],
                    default: 'getArchives',
                },
                {
                    displayName: 'Search Query',
                    name: 'searchQuery',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['searchDocuments'],
                        },
                    },
                    description: 'The search query to find documents',
                },
                {
                    displayName: 'Archive ID',
                    name: 'archiveId',
                    type: 'string',
                    default: '',
                    displayOptions: {
                        show: {
                            operation: ['searchDocuments'],
                        },
                    },
                    description: 'Optional: Limit search to a specific archive',
                },
                {
                    displayName: 'Limit',
                    name: 'limit',
                    type: 'number',
                    default: 50,
                    displayOptions: {
                        show: {
                            operation: ['searchDocuments'],
                        },
                    },
                    description: 'Max number of results to return',
                    typeOptions: {
                        minValue: 1,
                        maxValue: 1000,
                    },
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                if (operation === 'getArchives') {
                    const archives = await getArchives_1.getArchives.call(this);
                    returnData.push(...archives);
                }
                else if (operation === 'getUser') {
                    const user = await getUser_1.getUser.call(this);
                    returnData.push(...user);
                }
                else if (operation === 'getVersion') {
                    const version = await getVersion_1.getVersion.call(this);
                    returnData.push(...version);
                }
                else if (operation === 'searchDocuments') {
                    const documents = await searchDocuments_1.searchDocuments.call(this, i);
                    returnData.push(...documents);
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message,
                        },
                        pairedItem: i,
                    });
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), error, {
                        itemIndex: i,
                    });
                }
            }
        }
        return [returnData];
    }
}
exports.TopfactArchiv = TopfactArchiv;
//# sourceMappingURL=TopfactArchiv.node.js.map