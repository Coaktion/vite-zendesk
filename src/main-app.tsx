import React, {useEffect, useState} from 'react';
import {Zendesk} from './services';
import {MakeSidebar} from './factories/sidebar';
import {useZendesk} from './presentation/hooks/use-zendesk';

const MainApp: React.FC = () => {
	const {setZendesk} = useZendesk();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const zendesk = new Zendesk();
		setZendesk(zendesk);
		zendesk.getSettings().then(() => setLoading(false));
	}, []);

	if (loading) return <div>Loading...</div>;

	const urlParams = new URLSearchParams(window.location.search);
	const destinationApp = urlParams.get('type') ?? urlParams.get('modal');

	if (destinationApp === 'sidebar') return <MakeSidebar />;

	return <div>Not found</div>;
};

export default MainApp;

