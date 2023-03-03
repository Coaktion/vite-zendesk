import {ClientBasic} from '@coaktion/client-core';
import {type GitHubUserReposModel} from '@/models/github-models';

export class GithubClient extends ClientBasic {
	constructor(baseUrl: string) {
		super(baseUrl, {
			appName: 'github-client',
			endpoints: {
				fetch: '/users/:id',
			},
		});
	}

	async getRepositories(repositoryUrl: string): Promise<GitHubUserReposModel[]> {
		const {data} = await this.makeRequest('GET', repositoryUrl);
		return data as GitHubUserReposModel[];
	}
}
