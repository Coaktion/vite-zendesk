import {type GitHubUserModel, type GitHubUserReposModel} from '@/models/github-models';

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

