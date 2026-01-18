"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDocuments = searchDocuments;
async function searchDocuments(index) {
    const credentials = await this.getCredentials('topfactArchivApi');
    const apiUrl = credentials.apiUrl;
    const searchQuery = this.getNodeParameter('searchQuery', index);
    const archiveId = this.getNodeParameter('archiveId', index, '');
    const limit = this.getNodeParameter('limit', index, 50);
    const loginOptions = {
        method: 'GET',
        url: `${apiUrl}/Auth/Login`,
        auth: {
            username: credentials.username,
            password: credentials.password,
        },
        json: true,
    };
    try {
        const loginResponse = await this.helpers.httpRequest(loginOptions);
        const accessKey = loginResponse.accessKey || loginResponse.token || loginResponse.accessToken;
        if (!accessKey) {
            throw new Error('No access key received from login');
        }
        const requestOptions = {
            method: 'POST',
            url: `${apiUrl}/documents/search`,
            headers: {
                accesskey: accessKey,
            },
            body: {
                query: searchQuery,
                ...(archiveId && { archiveId }),
                limit,
            },
            json: true,
        };
        const response = await this.helpers.httpRequest(requestOptions);
        if (Array.isArray(response)) {
            return response.map(document => ({
                json: document,
            }));
        }
        return [{ json: response }];
    }
    catch (error) {
        throw new Error(`Failed to search documents: ${error.message}`);
    }
}
//# sourceMappingURL=searchDocuments.js.map