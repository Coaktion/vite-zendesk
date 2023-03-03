import {object, string} from 'yup';
import {t} from 'i18next';
import {type SidebarState} from '@/interfaces';

type Props = {
	state: SidebarState;
	setState: React.Dispatch<React.SetStateAction<SidebarState>>;
};

export const validationGithub = async ({setState, state}: Props): Promise<boolean> => {
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
			error: String(error.message),
		}));
		return false;
	}
};
