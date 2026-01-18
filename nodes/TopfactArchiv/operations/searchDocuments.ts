import type { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';

export async function searchDocuments(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('topfactArchivApi');
	const apiUrl = credentials.apiUrl as string;
	
	const searchQuery = this.getNodeParameter('searchQuery', index) as string;
	const archiveId = this.getNodeParameter('archiveId', index, '') as string;
	const limit = this.getNodeParameter('limit', index, 50) as number;

	// Step 1: Login to get the access key
	const loginOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `${apiUrl}/Auth/Login`,
		auth: {
			username: credentials.username as string,
			password: credentials.password as string,
		},
		json: true,
	};

	try {
		const loginResponse = await this.helpers.httpRequest(loginOptions);
		const accessKey = loginResponse.accessKey || loginResponse.token || loginResponse.accessToken;

		if (!accessKey) {
			throw new Error('No access key received from login');
		}

		// Step 2: Search documents with the access key in header
		const requestOptions = {
			method: 'POST' as IHttpRequestMethods,
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
	} catch (error) {
		throw new Error(`Failed to search documents: ${error.message}`);
	}
}
