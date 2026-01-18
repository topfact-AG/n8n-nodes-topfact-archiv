import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { getArchives } from './operations/getArchives';
import { searchDocuments } from './operations/searchDocuments';
import { getUser } from './operations/getUser';

export class TopfactArchiv implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'topfact Archiv API',
		name: 'topfactArchiv',
		icon: { light: 'file:topfact.svg', dark: 'file:topfact.dark.svg' },
		group: ['input'],
		version: 1,
		description: 'Access topfact Archiv API to get archives and search documents',
		defaults: {
			name: 'topfact Archiv API',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'topfactArchivApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Archives',
						value: 'getArchives',
						description: 'Get all available archives',
						action: 'Get all archives',
					},
					{
						name: 'Get User',
						value: 'getUser',
						description: 'Get current user information',
						action: 'Get user information',
					},
					{
						name: 'Search Documents',
						value: 'searchDocuments',
						description: 'Search for documents in archives',
						action: 'Search documents',
					},
				],
				default: 'getArchives',
			},
			// Parameters for Search Documents
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['searchDocuments'],
					},
				},
				description: 'The search query to find documents',
			},
			{
				displayName: 'Archive ID',
				name: 'archiveId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['searchDocuments'],
					},
				},
				description: 'Optional: Limit search to a specific archive',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				displayOptions: {
					show: {
						operation: ['searchDocuments'],
					},
				},
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'getArchives') {
					const archives = await getArchives.call(this);
					returnData.push(...archives);
				} else if (operation === 'getUser') {
					const user = await getUser.call(this);
					returnData.push(...user);
				} else if (operation === 'searchDocuments') {
					const documents = await searchDocuments.call(this, i);
					returnData.push(...documents);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: i,
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex: i,
					});
				}
			}
		}

		return [returnData];
	}
}
