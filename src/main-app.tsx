import React from 'react';
import {Sidebar} from './presentation/apps';

const MainApp: React.FC = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const destinationApp = urlParams.get('type') ?? urlParams.get('modal');

	if (destinationApp === 'sidebar') {
		return <Sidebar />;
	}

	return <div>Not found</div>;
};

export default MainApp;

