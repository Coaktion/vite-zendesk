import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import {Sidebar} from '@/presentation/apps';
import {baseComponentMock} from '@/tests/mocks/base-component';
import {ZendeskTicketsClient} from '@coaktion/zendesk-clients-react';
import {GithubClient} from '@coaktion/aktie-clients';
import {GithubUserModelMock, GitHubUserReposModelMock} from '@/tests/mocks/sidebar-state';

const baseComponentProps = baseComponentMock();

jest.mock('@coaktion/aktie-clients');
jest.mock('react-i18next', () => ({
	useTranslation() {
		return {
			t: (str: string) => str,
		};
	},
}));

jest.mock('i18next', () => ({
	t: (key: string) => key,
}));

const makeSidebar = () => {
	const spyResize = jest.spyOn(ZendeskTicketsClient.prototype, 'resizeFrame')
		.mockImplementation(() => '');

	render(
		<Sidebar
			zendesk={baseComponentProps.zendesk}
			tickets={baseComponentProps.tickets}
			users={baseComponentProps.users}
			githubClient={baseComponentProps.githubClient}
			settings={baseComponentProps.settings}
		/>,
	);

	return {spyResize};
};

describe('Sidebar', () => {
	it('should render with initial state', () => {
		const {spyResize} = makeSidebar();
		expect(screen.queryByTestId('sidebarWrap')).toBeInTheDocument();
		expect(screen.queryByTestId('sidebar-input')).toBeInTheDocument();
		expect(screen.queryByTestId('sidebar-button')).toBeInTheDocument();
		expect(screen.queryByTestId('sidebar-button')?.textContent)
			.toBe('presentation.apps.sidebar.button');
		expect(spyResize).toHaveBeenCalled();
	});

	it('Should show required error if search button is clicked without githubUser', async () => {
		makeSidebar();
		const button = screen.queryByTestId('sidebar-button');
		button?.click();
		await waitFor(() => {
			expect(screen.queryByTestId('errorWrap')?.textContent)
				.toBe('presentation.apps.sidebar.validation.required');
		});
	});

	it('Should show min error if search button is clicked when githubUser has less than 3 characters', async () => {
		makeSidebar();
		const input = screen.queryByTestId('content-input');
		fireEvent.input(input as HTMLInputElement, {target: {value: 'ab'}});
		const button = screen.queryByTestId('sidebar-button');
		button?.click();
		await waitFor(() => {
			expect(screen.queryByTestId('errorWrap')?.textContent)
				.toBe('presentation.apps.sidebar.validation.min');
		});
	});

	it('Should show error if githubClient.fetch fails', async () => {
		const spyFetch = jest.spyOn(GithubClient.prototype, 'fetch')
			.mockRejectedValue(new Error('githubError'));

		makeSidebar();
		const input = screen.queryByTestId('content-input');
		fireEvent.input(input as HTMLInputElement, {target: {value: 'github'}});
		const button = screen.queryByTestId('sidebar-button');
		button?.click();
		await waitFor(() => {
			expect(spyFetch).toHaveBeenCalled();
			expect(screen.queryByTestId('errorWrap')).toBeInTheDocument();
		});
	});

	it('Should show error if githubClient.getRepositories fails', async () => {
		baseComponentProps.githubClient.fetch = jest.fn().mockResolvedValue({data: GithubUserModelMock});
		const spyGetRepositories = jest.spyOn(GithubClient.prototype, 'getRepositories')
			.mockRejectedValue(new Error('githubError'));

		makeSidebar();
		const input = screen.queryByTestId('content-input');
		fireEvent.input(input as HTMLInputElement, {target: {value: 'github'}});
		const button = screen.queryByTestId('sidebar-button');
		button?.click();
		await waitFor(() => {
			expect(baseComponentProps.githubClient.fetch).toHaveBeenCalled();
			expect(spyGetRepositories).toHaveBeenCalled();
			expect(screen.queryByTestId('errorWrap')).toBeInTheDocument();
		});
	});

	it('Should show GithubUserData if handleSubmit succeeds', async () => {
		baseComponentProps.githubClient.fetch = jest.fn().mockResolvedValue({data: GithubUserModelMock});
		baseComponentProps.githubClient.getRepositories = jest.fn().mockResolvedValue({data: GitHubUserReposModelMock});

		makeSidebar();
		const input = screen.queryByTestId('content-input');
		fireEvent.input(input as HTMLInputElement, {target: {value: 'github'}});
		const button = screen.queryByTestId('sidebar-button');
		button?.click();

		await waitFor(() => {
			expect(baseComponentProps.githubClient.fetch).toHaveBeenCalled();
			expect(baseComponentProps.githubClient.getRepositories).toHaveBeenCalled();
			expect(screen.queryByTestId('githubUserDataWrap')).toBeInTheDocument();
		});
	});
});
