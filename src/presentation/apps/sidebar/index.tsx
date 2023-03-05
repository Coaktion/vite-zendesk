import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TextField, Button, CircularProgress} from '@mui/material';
import {type GithubClient, type Zendesk} from '@/services';
import {type SidebarState} from '@/interfaces';
import {type GitHubUserModel} from '@/models/github-models';
import {ErrorMessage} from '@/presentation/components';
import {validationGithub} from './validation';
import GithubUserData from './github-user-data';
import './sidebar.scss';

type Props = {
	zendesk: Zendesk;
	githubClient: GithubClient;
};

const Sidebar: React.FC<Props> = ({zendesk, githubClient}: Props) => {
	const {t} = useTranslation();
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState<SidebarState>({
		githubUser: '',
		error: '',
		userFound: false,
		githubUserData: {
			user: {} as GitHubUserModel,
			repositories: [],
		},
	});

	const goBack = (): void => {
		setState(current => ({...current, userFound: false, githubUser: ''}));
		zendesk.resize();
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const isValid = await validationGithub({state, setState});
		if (!isValid) return;
		setLoading(true);

		try {
			const {data} = await githubClient.fetch(state.githubUser);
			const user = data as GitHubUserModel;
			const repositories = await githubClient.getRepositories(user.repos_url);
			setState(current =>
				({
					...current,
					userFound: true,
					githubUserData: {user, repositories},
				}),
			);
			setLoading(false);
		} catch (error: any) {
			setState(current => ({
				...current,
				error: error.message || t('presentation.apps.sidebar.default-error'),
			}));
			setLoading(false);
		}
	};

	useEffect(() => {
		zendesk.resize();
	}, []);

	if (state.userFound)
		return <GithubUserData goBack={goBack} sidebarState={state} zendesk={zendesk} />;

	return (
		<form onSubmit={handleSubmit} className='sidebarWrap'>
			<TextField
				variant='outlined'
				name='githubuser'
				label={t('presentation.apps.sidebar.label')}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setState(current => ({
						...current, githubUser: event.target.value, error: '',
					}));
				}}
				fullWidth
			/>
			{state.error && <ErrorMessage error={state.error} />}
			<Button type='submit' variant='contained'>
				{loading
					? <CircularProgress size={30} />
					: <>{t('presentation.apps.sidebar.button')}</>
				}
			</Button>
		</form>
	);
};

export default Sidebar;
