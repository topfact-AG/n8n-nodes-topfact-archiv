"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = getVersion;
async function getVersion() {
    const credentials = await this.getCredentials('topfactArchivApi');
    const apiUrl = credentials.apiUrl;
    try {
        const requestOptions = {
            method: 'GET',
            url: `${apiUrl}/api/info/version`,
            json: true,
        };
        const response = await this.helpers.httpRequest(requestOptions);
        return [{ json: response }];
    }
    catch (error) {
        throw new Error(`Failed to get version: ${error.message}`);
    }
}
//# sourceMappingURL=getVersion.js.map