import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './main-app';
import {ZendeskProvider} from '@coaktion/zendesk-clients-react';
import './presentation/styles/global.scss';
import './presentation/translations';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ZendeskProvider>
			<MainApp />
		</ZendeskProvider>
	</React.StrictMode>,
);
