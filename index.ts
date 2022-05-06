import type { InputManifest, Result } from '@balena/transformer-sdk';
import { v4 as uuidv4 } from 'uuid';
import type {
	ExternalEventContract,
	DiagnosticEventContractDefinition,
} from './types';

export async function externalevent2diagnosticevent(
	input: InputManifest<ExternalEventContract>,
): Promise<Array<Result<DiagnosticEventContractDefinition>>> {
	const results: Array<Result<DiagnosticEventContractDefinition>> = [];
	if (!Array.isArray(input.input.contract.data.payload.attachments)) {
		return results;
	}

	const type = 'diagnostic-event';
	for (const attachment of input.input.contract.data.payload.attachments) {
		results.push({
			contract: {
				handle: uuidv4(),
				type,
				slug: `${type}-${uuidv4()}`,
				data: {
					message: attachment.title.match(/\smsg="(.+)$/)[1],
					level: attachment.title.match(/\slevel=(\w+)\s/)[1],
					source: attachment['title_link'],
					timestamp: attachment.title.match(/time="([^\s]+)"\s/)[1],
				},
			},
		});
	}

	return results;
}
