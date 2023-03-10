import React from 'react';
import './error-message.scss';

type Props = {
	error: string;
};

const ErrorMessage: React.FC<Props> = ({error}: Props) => (
	<div className='errorWrap' data-testid='errorWrap'>{error}</div>
);

export default ErrorMessage;
