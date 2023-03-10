import {SidebarStateMock} from '@/tests/mocks/sidebar-state';
import {validationGithub} from '@/presentation/apps/sidebar/validation';

jest.mock('i18next', () => ({
	t: (key: string) => key,
}));

describe('Sidebar Validation', () => {
	it('Should return required if githubUser is empty', async () => {
		const error = await validationGithub({state: SidebarStateMock});
		expect(error).toBe('presentation.apps.sidebar.validation.required');
	});

	it('Should return minError if githubUser is less than 3 characters', async () => {
		const state = SidebarStateMock;
		state.githubUser = 'ab';
		const error = await validationGithub({state});
		expect(error).toBe('presentation.apps.sidebar.validation.min');
	});

	it('Should return empty if githubUser is valid', async () => {
		const state = SidebarStateMock;
		state.githubUser = 'abc';
		const error = await validationGithub({state});
		expect(error).toBe('');
	});
});
