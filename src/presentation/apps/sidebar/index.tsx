import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {TextField, Button, CircularProgress} from '@mui/material';
import {object, string} from 'yup';
import {ErrorMessage} from '@/presentation/components';
import {type GitHubUserModel, type GitHubUserReposModel} from '@/models/github-models';
import GithubUserData from './github-user-data';
import './sidebar.scss';

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

type Props = {
	zendesk: any;
};

const Sidebar: React.FC<Props> = ({zendesk}: Props) => {
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
		zendesk.invoke('resize', {width: '100%', height: 170});
	};

	const validation = async (): Promise<boolean> => {
		try {
			const githubSchema = object({
				githubUser: string()
					.required(
						t('presentation.apps.sidebar.validation.required') || '',
					)
					.min(3, t('presentation.apps.sidebar.validation.min') || ''),
			});
			await githubSchema.validate(state);
			return true;
		} catch (error: any) {
			setState(current => ({
				...current,
				error: error.message,
			}));
			return false;
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const isValid = await validation();
		if (!isValid) return;
		setLoading(true);

		try {
			const response = await zendesk.request({
				url: `https://api.github.com/users/${state.githubUser}`,
				headers: {
					'Content-Type': 'application/json',
				},
				type: 'GET',
				httpCompleteResponse: true,
			});
			const user = response.responseJSON as GitHubUserModel;

			const response2 = await zendesk.request({
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

	useEffect(() => {
		zendesk.invoke('resize', {width: '100%', height: 170});
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
