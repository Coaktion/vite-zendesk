import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {GroupAdd, Group, Badge, LocationCity, ArrowBack} from '@mui/icons-material';
import {type Settings, type SidebarState} from '@/interfaces';
import './github-user-data.scss';
import {type ZendeskTicketsClient} from '@coaktion/zendesk-clients-react';

type Props = {
	sidebarState: SidebarState;
	setState: React.Dispatch<React.SetStateAction<SidebarState>>;
	zendesk: ZendeskTicketsClient;
	settings: Settings;
};

const GithubUserData: React.FC<Props> = ({
	sidebarState, setState, zendesk, settings}: Props,
) => {
	const {t} = useTranslation();
	const {githubUserData: {user, repositories}} = sidebarState;

	const goBack = (): void => {
		zendesk.resizeFrame();
		setState(current => ({...current, userFound: false, githubUser: ''}));
	};

	const handleRepository = (description: string, language: string): void => {
		zendesk.setTicketField(settings.repo_description_id, description);
		zendesk.setTicketField(settings.repo_language_id, language);
		zendesk.notifyUser(
			t('presentation.apps.sidebar.github-user-data.success'),
			'success',
		);
	};

	useEffect(() => {
		zendesk.resizeFrame(700);
	}, []);

	return (
		<div data-testid='githubUserDataWrap' className='githubUserDataWrap'>
			<div data-testid='github-user-data-goback' className='dataWrap' onClick={goBack}>
				<span className='goBack'>
					<ArrowBack />
					{t('presentation.apps.sidebar.github-user-data.goback-button')}
				</span>
			</div>

			<img
				src={user.avatar_url}
				alt={user.name}
				data-testid='github-user-data-avatar-img'
			/>

			<div className='dataWrap'>
				<span data-testid='github-user-data-followers'>
					<GroupAdd />
					{t('presentation.apps.sidebar.github-user-data.followers')}:
					<b>{user.followers}</b>
				</span>
				<span data-testid='github-user-data-following'>
					<Group />
					{t('presentation.apps.sidebar.github-user-data.following')}:
					<b>{user.following}</b>
				</span>
			</div>

			<div className='dataWrap'>
				<span data-testid='github-user-data-name'>
					<Badge />
					{t('presentation.apps.sidebar.github-user-data.name')}:
					<b>{user.name}</b>
				</span>
			</div>

			<div className='dataWrap'>
				<span data-testid='github-user-data-city'>
					<LocationCity />
					{t('presentation.apps.sidebar.github-user-data.city')}:
					<b>{user.location}</b>
				</span>
			</div>

			<div className='divider' data-testid='github-user-data-divider'/>

			<div data-testid='github-user-data-repos' className='reposWraps'>
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
