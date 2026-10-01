# Production lifecycle

| Stage | Required result | Default gate |
| --- | --- | --- |
| `intake` | Validated brief, route, sources, constraints | No |
| `proposal` | Creative direction, capability plan, estimate | Human approval |
| `script` | Versioned script and narration plan | Human approval |
| `storyboard` | Ordered scenes with duration and asset requests | Human approval |
| `assets` | Resolved assets with provenance, licenses, hashes | Human approval before expensive composition |
| `edit` | Timeline/EDL, captions, mix and transition decisions | No |
| `compose` | Reproducible composition source and draft render | No |
| `review` | Technical findings, visual review, exact-version decision | Human approval |
| `export` | Verified immutable deliverables and metadata | Explicit request when external publication is involved |

Checkpoints are append-only stage records. A revised artifact creates a new version and invalidates downstream approvals that depended on the prior version. Failed work resumes at the first incomplete step. Successful provider outputs are reused by checksum and provider task ID.

The production board reads checkpoints and artifacts; it does not invent state from optimistic browser UI.
