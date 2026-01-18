"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchives = getArchives;
async function getArchives() {
    const credentials = await this.getCredentials('topfactArchivApi');
    const apiUrl = credentials.apiUrl;
    const loginOptions = {
        method: 'GET',
        url: `${apiUrl}/api/auth/login`,
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
            method: 'GET',
            url: `${apiUrl}/api/archives`,
            headers: {
                accesskey: accessKey,
            },
            json: true,
        };
        const response = await this.helpers.httpRequest(requestOptions);
        if (Array.isArray(response)) {
            return response.map(archive => ({
                json: archive,
            }));
        }
        return [{ json: response }];
    }
    catch (error) {
        throw new Error(`Failed to get archives: ${error.message}`);
    }
}
//# sourceMappingURL=getArchives.js.map