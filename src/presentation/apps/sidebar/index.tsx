import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {TextField, Button, CircularProgress} from '@mui/material';
import ZAFClient from 'zendesk_app_framework_sdk';
import {ErrorMessage} from '../../components';
import './sidebar.scss';
import {type GitHubUserModel, type GitHubUserReposModel} from '../../../models/github-models';
import GithubUserData from './github-user-data';

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

const client = ZAFClient.init();

const Sidebar: React.FC = () => {
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
		setState(current => ({...current, userFound: false}));
		client.invoke('resize', {width: '100%', height: 170});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await client.request({
				url: `https://api.github.com/users/${state.githubUser}`,
				headers: {
					'Content-Type': 'application/json',
				},
				type: 'GET',
				httpCompleteResponse: true,
			});
			const user = response.responseJSON as GitHubUserModel;

			const response2 = await client.request({
				url: user.repos_url,
				headers: {
					'Content-Type': 'application/json',
				},
				type: 'GET',
				httpCompleteResponse: true,
			});
			const repositories = response2.responseJSON as GitHubUserReposModel[];

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
				error: error.message,
			}));
			setLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setState(current => ({
			...current, githubUser: event.target.value, error: '',
		}));
	};

	useEffect(() => {
		client.invoke('resize', {width: '100%', height: 170});
	}, []);

	if (state.userFound) {
		return <GithubUserData goBack={goBack} sidebarState={state} />;
	}

	return (
		<form onSubmit={handleSubmit} className='sidebarWrap'>
			<TextField
				variant='outlined'
				name='githubuser'
				label={t('presentation.apps.sidebar.label')}
				onChange={handleChange}
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
