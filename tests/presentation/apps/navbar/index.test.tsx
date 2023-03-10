import React from 'react';
import {render, screen} from '@testing-library/react';
import {Navbar} from '@/presentation/apps';
import {baseComponentMock} from '@/tests/mocks/base-component';

const baseComponentProps = baseComponentMock();

describe('NavbarComponent', () => {
	it('should render the component', () => {
		render(
			<Navbar
				zendesk={baseComponentProps.zendesk}
				tickets={baseComponentProps.tickets}
				users={baseComponentProps.users}
				githubClient={baseComponentProps.githubClient}
				settings={baseComponentProps.settings}
			/>,
		);
		expect(screen.queryByTestId('navbarWrap')?.textContent).toBe('Isso é um navbar');
	});
});
