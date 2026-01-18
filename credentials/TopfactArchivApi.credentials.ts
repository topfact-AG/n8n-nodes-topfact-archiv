import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

class TopfactArchivApi implements ICredentialType {
	name = 'topfactArchivApi';

	displayName = 'Topfact Archiv Logon API';

	icon: Icon = 'file:topfact.svg';

	documentationUrl = 'https://services.topfact.de//tic';

	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			url: '/Auth/Login',
			method: 'GET',
		},
	};
}

export default TopfactArchivApi;
