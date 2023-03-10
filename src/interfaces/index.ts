import {type GitHubUserModel, type GitHubUserReposModel} from '@/models/github-models';
import {type GithubClient} from '@coaktion/aktie-clients';
import {type ZendeskTicketsClient, type ZendeskUsersClient} from '@coaktion/zendesk-clients-react';

type GithubUserDataModel = {
	user: GitHubUserModel;
	repositories: GitHubUserReposModel[];
};

export type SidebarState = {
	githubUser: string;
	error: string;
	userFound: boolean;
	githubUserData: GithubUserDataModel;
};

export type Settings = {
	language: string;
	repo_description_id: string;
	repo_language_id: string;
	base_url: string;
};

export type BaseComponentProps = {
	zendesk: any;
	tickets: ZendeskTicketsClient;
	users: ZendeskUsersClient;
	githubClient: GithubClient;
	settings: Settings;
};

