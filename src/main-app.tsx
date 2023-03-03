import React from 'react';
import {Sidebar} from './presentation/apps';

type Props = {
	zendesk: any;
};

const MainApp: React.FC<Props> = ({zendesk}: Props) => {
	const urlParams = new URLSearchParams(window.location.search);
	const destinationApp = urlParams.get('type') ?? urlParams.get('modal');

	if (destinationApp === 'sidebar') return <Sidebar zendesk={zendesk} />;

	return <div>Not found</div>;
};

export default MainApp;

