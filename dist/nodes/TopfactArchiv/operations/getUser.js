"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
async function getUser() {
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
            url: `${apiUrl}/api/user`,
            headers: {
                accesskey: accessKey,
            },
            json: true,
        };
        const response = await this.helpers.httpRequest(requestOptions);
        return [{ json: response }];
    }
    catch (error) {
        throw new Error(`Failed to get user: ${error.message}`);
    }
}
//# sourceMappingURL=getUser.js.map