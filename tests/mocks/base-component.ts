import {type Settings, type BaseComponentProps} from '@/interfaces';
import {GithubClient} from '@coaktion/aktie-clients';
import {ZendeskTicketsClient, ZendeskUsersClient} from '@coaktion/zendesk-clients-react';

const settingsMock = {
	language: 'en',
	repo_description_id: '123',
	repo_language_id: '123',
} as Settings;

export const baseComponentMock = (): BaseComponentProps => {
	const zendeskClient = '';
	const tickets = new ZendeskTicketsClient(zendeskClient);
	const users = new ZendeskUsersClient(zendeskClient);
	const githubClient = new GithubClient('http://anyhost/');

	return {
		zendesk: {},
		tickets,
		users,
		githubClient,
		settings: settingsMock,
	};
};
