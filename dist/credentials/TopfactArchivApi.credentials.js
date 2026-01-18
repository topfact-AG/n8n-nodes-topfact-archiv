"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopfactArchivApi = void 0;
class TopfactArchivApi {
    constructor() {
        this.name = 'topfactArchivApi';
        this.displayName = 'topfact Archiv Logon';
        this.icon = 'file:topfact.svg';
        this.documentationUrl = 'https://services.topfact.de//tic';
        this.properties = [
            {
                displayName: 'Username',
                name: 'username',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
            {
                displayName: 'API URL',
                name: 'apiUrl',
                type: 'string',
                default: 'https://app.topfactcloud.de/topfact/api',
                required: true,
                description: 'Base URL of the topfact Archiv API',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                auth: {
                    username: '={{$credentials.username}}',
                    password: '={{$credentials.password}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.apiUrl}}',
                url: '/Auth/Login',
                method: 'GET',
            },
        };
    }
}
exports.TopfactArchivApi = TopfactArchivApi;
//# sourceMappingURL=TopfactArchivApi.credentials.js.map