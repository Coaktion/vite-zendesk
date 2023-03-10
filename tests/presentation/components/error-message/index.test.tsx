import React from 'react';
import {render, screen} from '@testing-library/react';
import {ErrorMessage} from '@/presentation/components';

describe('ErrorMessageComponent', () => {
	it('should render the component with error message', () => {
		render(<ErrorMessage error='ErrorJest' />);
		expect(screen.queryByTestId('errorWrap')?.textContent).toBe('ErrorJest');
	});
});
