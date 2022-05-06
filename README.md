# diagnostic-event-transformer-bundle

Transformer bundle for handling webhooks from GlitchTip.  Incoming application event payloads are stored as `diagnostic-event` type contracts.

## ToDo
- Recognize duplicate events so as to not create noise and unnecessary contracts
    - Based on event message, source, application details, etc
    - Increase `data.counter` (or equivalent) on original contract instead of creating a new one