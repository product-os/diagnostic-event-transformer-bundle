import { externalevent2diagnosticevent } from './index';
import type { ExternalEventContract } from './types';
import { v4 as uuidv4 } from 'uuid';

describe('Diagnostic event life-cycle', function () {
	it('should transform external-event to diagnostic-event', async function () {
		const externalEvent: ExternalEventContract = {
			type: 'external-event',
			handle: uuidv4(),
			id: uuidv4(),
			slug: `external-event-${uuidv4()}`,
			version: '1.0.0',
			active: true,
			created_at: new Date().toISOString(),
			tags: [],
			capabilities: [],
			markers: [],
			requires: [],
			data: {
				source: 'glitchtip',
				payload: {
					alias: 'GlitchTip',
					text: 'GlitchTip Alert (1 issue)',
					attachments: [
						{
							title:
								'time="2022-05-04T05:50:14.468760956Z" level=info msg="shim balena-engine-containerd-shim started" ad…',
							title_link: 'http://glitchtip.monarci.com/monarci/issues/10',
							text: '',
							image_url: null,
							color: '#4b60b4',
							fields: [
								{
									title: 'Project',
									value: 'logwatcher',
									short: true,
								},
								{
									title: 'Environment',
									value: 'production',
									short: true,
								},
								{
									title: 'Release',
									value: '1.0.0',
									short: false,
								},
							],
							mrkdown_in: ['text'],
						},
					],
					sections: [
						{
							activityTitle:
								'time="2022-05-04T05:50:14.468760956Z" level=info msg="shim balena-engine-containerd-shim started" ad…',
							activitySubtitle:
								'[View Issue LOGWATCHER-7](http://glitchtip.monarci.com/monarci/issues/10)',
						},
					],
				},
			},
		};
		const result = await externalevent2diagnosticevent({
			input: {
				artifactPath: '/tmp',
				contract: externalEvent,
				transformerContract: {
					handle: 'transformer',
					type: 'type',
					id: uuidv4(),
					slug: 'transformer',
					version: '1.0.0',
					active: true,
					created_at: new Date().toISOString(),
					tags: [],
					capabilities: [],
					markers: [],
					requires: [],
					data: {},
				},
			},
		});

		expect(result.length).toBe(1);
		expect(result[0].contract.type).toBe('diagnostic-event');
		expect(result[0].contract.data.level).toBe('info');
		expect(result[0].contract.data.timestamp).toBe(
			'2022-05-04T05:50:14.468760956Z',
		);
		expect(result[0].contract.data.message).toBe(
			'shim balena-engine-containerd-shim started" ad…',
		);
	});
});
