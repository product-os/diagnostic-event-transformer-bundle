import type { Contract, ContractDefinition } from '@balena/transformer-sdk';

export interface ExternalEventData {
	payload: {
		[k: string]: unknown;
	};
	source: string;
	[k: string]: unknown;
}

export interface ExternalEventContract extends Contract<ExternalEventData> {
	type: 'external-event';
}

export interface ExternalEventContractDefinition
	extends ContractDefinition<ExternalEventData> {
	type: 'external-event';
}

export interface DiagnosticEventData {
	level: string;
	message: string;
	source: string;
	timestamp: string;
	project: string;
	environment: string;
	release: string;
	[k: string]: unknown;
}

export interface DiagnosticEventContract extends Contract<DiagnosticEventData> {
	type: 'diagnostic-event';
}

export interface DiagnosticEventContractDefinition
	extends ContractDefinition<DiagnosticEventData> {
	type: 'diagnostic-event';
}

export interface GlitchTipPayload {
	alias: string;
	text: string;
	attachments: Array<{
		title: string;
		title_link: string;
		text: string;
		image_url: string | null;
		color: string;
		fields: Array<{
			title: string;
			value: string;
			short: boolean;
		}>;
		mrkdwn_in: string[];
	}>;
	sections: Array<{
		activityTitle: string;
		activitySubtitle: string;
	}>;
	[k: string]: unknown;
}
