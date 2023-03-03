import React from 'react';
import ReactDOM from 'react-dom/client';
import ZAFClient from 'zendesk_app_framework_sdk';
import {GithubClient} from './clients/github-client';
import MainApp from './main-app';
import './presentation/styles/global.scss';
import './presentation/translations';

const zendesk = ZAFClient.init();
const githubClient = new GithubClient('https://api.github.com');

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MainApp zendesk={zendesk} githubClient={githubClient} />
	</React.StrictMode>,
);
