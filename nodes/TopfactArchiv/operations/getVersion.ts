import type { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';

export async function getVersion(this: IExecuteFunctions): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('topfactArchivApi');
	const apiUrl = credentials.apiUrl as string;

	try {
		const requestOptions = {
			method: 'GET' as IHttpRequestMethods,
			url: `${apiUrl}/api/info/version`,
			json: true,
		};

		const response = await this.helpers.httpRequest(requestOptions);
		
		return [{ json: response }];
	} catch (error) {
		throw new Error(`Failed to get version: ${error.message}`);
	}
}
