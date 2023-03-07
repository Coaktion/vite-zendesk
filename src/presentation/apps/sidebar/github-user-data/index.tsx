import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {GroupAdd, Group, Badge, LocationCity, ArrowBack} from '@mui/icons-material';
import {type SidebarState} from '@/interfaces';
import './github-user-data.scss';
import {type ZendeskTicketsClient} from '@coaktion/zendesk-clients-react';

type Props = {
	sidebarState: SidebarState;
	goBack: () => void;
	zendesk: ZendeskTicketsClient;
};

const GithubUserData: React.FC<Props> = ({sidebarState, goBack, zendesk}: Props) => {
	const {t} = useTranslation();
	const {githubUserData: {user, repositories}} = sidebarState;

	const handleRepository = (description: string, language: string): void => {
		// Zendesk.setTicketField(zendesk._settings.repo_description_id, description);
		// zendesk.setTicketField(zendesk._settings.repo_language_id, language);
		zendesk.notifyUser(
			t('presentation.apps.sidebar.github-user-data.success'),
			'success',
		);
	};

	useEffect(() => {
		zendesk.resizeFrame(700);
	}, []);

	return (
		<div className='githubUserDataWrap'>
			<div className='dataWrap' onClick={goBack}>
				<span className='goBack'>
					<ArrowBack />
					{t('presentation.apps.sidebar.github-user-data.goback-button')}
				</span>
			</div>

			<img
				src={user.avatar_url}
				alt={user.name}
			/>

			<div className='dataWrap'>
				<span>
					<GroupAdd />
					{t('presentation.apps.sidebar.github-user-data.followers')}:
					<b>{user.followers}</b>
				</span>
				<span>
					<Group />
					{t('presentation.apps.sidebar.github-user-data.following')}:
					<b>{user.following}</b>
				</span>
			</div>

			<div className='dataWrap'>
				<span>
					<Badge />
					{t('presentation.apps.sidebar.github-user-data.name')}:
					<b>{user.name}</b>
				</span>
			</div>

			<div className='dataWrap'>
				<span>
					<LocationCity />
					{t('presentation.apps.sidebar.github-user-data.city')}:
					<b>{user.location}</b>
				</span>
			</div>

			<div className='divider'/>

			<div className='reposWraps'>
				{repositories.map(repository => (
					<div
						key={repository.name}
						onClick={() => {
							handleRepository(
								repository.description,
								repository.language,
							);
						}
						}
					>
						{repository.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default GithubUserData;
