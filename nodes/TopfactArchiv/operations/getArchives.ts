import type { IExecuteFunctions, INodeExecutionData, IHttpRequestMethods } from 'n8n-workflow';

export async function getArchives(this: IExecuteFunctions): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('topfactArchivApi');
	const apiUrl = credentials.apiUrl as string;

	// Step 1: Login to get the access key
	const loginOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `${apiUrl}/api/auth/login`,
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

		// Step 2: Get archives with the access key in header
		const requestOptions = {
			method: 'GET' as IHttpRequestMethods,
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
	} catch (error) {
		throw new Error(`Failed to get archives: ${error.message}`);
	}
}
