/* eslint-disable no-constructor-return */
import ZAFClient from 'zendesk_app_framework_sdk';
import {type Settings} from '@/interfaces';

export class Zendesk {
	static _instance: Zendesk;
	public _client: any = null;
	public _settings: Settings = {} as Settings;

	constructor() {
		if (Zendesk._instance) return Zendesk._instance;
		Zendesk._instance = this;
		this._client = ZAFClient.init();
	}

	public async getSettings(): Promise<void> {
		const {settings} = await this._client.metadata();
		this._settings = settings;
	}

	public resize(
		width: string | number = '100%', height: string | number = 170,
	): void {
		this._client.invoke('resize', {width, height});
	}

	public notify(message: string, type: 'success' | 'error'): void {
		this._client.invoke(
			'notify',
			message,
			type,
		);
	}

	public setTicketField(fieldId: string, value: string): void {
		this._client.set(`ticket.customField:custom_field_${fieldId}`, value);
	}
}
