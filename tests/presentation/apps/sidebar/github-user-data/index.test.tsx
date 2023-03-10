import React from 'react';
import {screen, waitFor, render} from '@testing-library/react';
import {ZendeskTicketsClient} from '@coaktion/zendesk-clients-react';
import GithubUserData from '@/presentation/apps/sidebar/github-user-data';
import {baseComponentMock} from '@/tests/mocks/base-component';
import {SidebarStateMock} from '@/tests/mocks/sidebar';

const baseComponentProps = baseComponentMock();

jest.mock('@coaktion/aktie-clients');
jest.mock('react-i18next', () => ({
	useTranslation() {
		return {
			t: (str: string) => str,
		};
	},
}));

const makeGithubUserData = () => {
	const spyResize = jest.spyOn(ZendeskTicketsClient.prototype, 'resizeFrame')
		.mockImplementation(() => '');
	const setStateMock = jest.fn();

	render(
		<GithubUserData
			setState={setStateMock}
			settings={baseComponentProps.settings}
			zendesk={baseComponentProps.tickets}
			sidebarState={SidebarStateMock}
		/>,
	);

	return {spyResize, setStateMock};
};

describe('GithubUserData', () => {
	it('should render with initial state', async () => {
		const {spyResize} = makeGithubUserData();
		expect(screen.queryByTestId('githubUserDataWrap')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-goback')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-followers')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-following')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-name')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-city')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-divider')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-repos')).toBeInTheDocument();
		expect(screen.queryByTestId('github-user-data-repos')?.textContent)
			.toContain(SidebarStateMock.githubUserData.repositories[0].name);
		expect(spyResize).toHaveBeenCalledWith(700);
	});

	it('Should call handleRepository when repository is clicked', async () => {
		const spySetTicketField = jest.spyOn(ZendeskTicketsClient.prototype, 'setTicketField')
			.mockResolvedValue(() => '');
		const spyNotifyUser = jest.spyOn(ZendeskTicketsClient.prototype, 'notifyUser')
			.mockImplementation(() => '');

		makeGithubUserData();
		const repo = screen.getByText(SidebarStateMock.githubUserData.repositories[0].name);
		repo.click();

		await waitFor(() => {
			expect(spySetTicketField).toHaveBeenCalledWith(
				'123',
				SidebarStateMock.githubUserData.repositories[0].description,
			);
			expect(spySetTicketField).toHaveBeenCalledWith(
				'123',
				SidebarStateMock.githubUserData.repositories[0].language,
			);
			expect(spyNotifyUser).toHaveBeenCalledWith(
				'presentation.apps.sidebar.github-user-data.success',
				'success',
			);
		});
	});

	it('Should call setState when goback is clicked', async () => {
		const {setStateMock, spyResize} = makeGithubUserData();
		const goback = screen.getByTestId('github-user-data-goback');
		goback.click();

		await waitFor(() => {
			expect(setStateMock).toHaveBeenCalledTimes(1);
			expect(spyResize).toHaveBeenCalled();
		});
	});
});
