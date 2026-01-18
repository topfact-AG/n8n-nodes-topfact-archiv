/* eslint-disable n8n-nodes-base/cred-class-field-display-name-missing-api */
/* eslint-disable n8n-nodes-base/cred-class-field-display-name-miscased */
import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class TopfactArchivApi implements ICredentialType {
	name = 'topfactArchivApi';

	displayName = 'topfact Archiv Logon';

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
