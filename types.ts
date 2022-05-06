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
	[k: string]: unknown;
}

export interface DiagnosticEventContract extends Contract<DiagnosticEventData> {
	type: 'diagnostic-event';
}

export interface DiagnosticEventContractDefinition
	extends ContractDefinition<DiagnosticEventData> {
	type: 'diagnostic-event';
}
