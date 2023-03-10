import React, {useEffect, useState} from 'react';
import ZAFClient from 'zendesk_app_framework_sdk';
import {useZendesk} from '@coaktion/zendesk-clients-react';
import MakeBaseComponent from './factory';
import {type Settings} from './interfaces';

let settings: Settings;

const MainApp: React.FC = () => {
	const {setZendesk} = useZendesk();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const zendesk = ZAFClient.init();
		setZendesk(zendesk);
		zendesk.on('app.registered', async (data: any) => {
			settings = data.metadata.settings as Settings;
			setLoading(false);
		});
	}, []);

	if (loading) return <div>Loading...</div>;

	const urlParams = new URLSearchParams(window.location.search);
	const destinationApp = urlParams.get('type') ?? urlParams.get('modal');

	return <MakeBaseComponent type={destinationApp} settings={settings} />;
};

export default MainApp;

