import React from 'react';
import {ZendeskTicketsClient, ZendeskUsersClient} from '@coaktion/zendesk-clients-react';
import {useZendesk} from '@coaktion/zendesk-clients-react';
import {GithubClient} from '@coaktion/aktie-clients';
import {Navbar, Sidebar} from '@/presentation/apps';
import {type Settings} from './interfaces';

type Props = {
	type: string | null;
	settings: Settings;
};

const MakeBaseComponent: React.FC<Props> = ({type, settings}: Props) => {
	const Component = type === 'sidebar' ? Sidebar : Navbar;
	const {zendeskClient} = useZendesk();
	const tickets = new ZendeskTicketsClient(zendeskClient);
	const users = new ZendeskUsersClient(zendeskClient);
	const githubClient = new GithubClient(String(settings.base_url));
	return <Component
		zendesk={zendeskClient}
		githubClient={githubClient}
		tickets={tickets}
		users={users}
	/>;
};

export default MakeBaseComponent;
