import React from 'react';
import {type GithubClient} from './clients/github-client';
import {Sidebar} from './presentation/apps';

type Props = {
	zendesk: any;
	githubClient: GithubClient;
};

const MainApp: React.FC<Props> = ({zendesk, githubClient}: Props) => {
	const urlParams = new URLSearchParams(window.location.search);
	const destinationApp = urlParams.get('type') ?? urlParams.get('modal');

	if (destinationApp === 'sidebar') return <Sidebar zendesk={zendesk} githubClient={githubClient} />;

	return <div>Not found</div>;
};

export default MainApp;

