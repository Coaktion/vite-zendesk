import {type SidebarState} from '@/interfaces';
import {type GitHubUserReposModel, type GitHubUserModel} from '@/models/github-models';

export const GithubUserModelMock: GitHubUserModel = {
	avatar_url: 'https://anyhost/',
	bio: 'Bio',
	followers: 1,
	following: 1,
	location: 'location',
	name: 'name',
	repos_url: 'https://anyhost/',
} as GitHubUserModel;

export const GitHubUserReposModelMock: GitHubUserReposModel[] = [
	{
		name: 'repo-name',
		description: 'description',
		language: 'language',
	},
] as GitHubUserReposModel[];

export const SidebarStateMock: SidebarState = {
	error: '',
	githubUser: '',
	userFound: false,
	githubUserData: {
		user: GithubUserModelMock,
		repositories: GitHubUserReposModelMock,
	},
} as SidebarState;
