import React from 'react';
import {Sidebar} from '@/presentation/apps';
import {useZendesk} from '@/presentation/hooks/use-zendesk';
import {GithubClient} from '@/services/github-client';

const MakeSidebar: React.FC = () => {
	const {zendesk} = useZendesk();
	const githubClient = new GithubClient(String(zendesk?._settings.base_url));
	return <Sidebar zendesk={zendesk} githubClient={githubClient} />;
};

export default MakeSidebar;
