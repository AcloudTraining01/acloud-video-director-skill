# VideoProjectSpec contract

`schemas/video-project-spec.schema.json` is the portable runtime contract. UI questionnaires, application services, durable jobs, agent tools, and render workers should exchange this provider-neutral shape. `scripts/validate-project-spec.mjs` adds the cross-field rules that JSON Schema cannot express cleanly.

The spec contains creative intent and the approved production plan. Workspace authorization, job leases, usage-ledger entries, provider secrets, signed URLs, and rendered bytes stay outside it.

Required groups:

- `identity`: schema version, route, title, project/revision references.
- `brief`: goal, audience, platform, language, duration, aspect ratio, tone, CTA.
- `routePlan`: questionnaire version and the five validated answers specific to the selected format.
- `brand`: brand-kit reference and the exact revision used.
- `sources`: user, project, research, stock, or generated inputs with provenance and rights notes.
- `creative`: style, narration, captions, music, and ordered scenes.
- `capabilities`: required production capabilities without assuming a provider.
- `routing`: approved provider/runtime selections and fallback policy.
- `budget`: estimate, currency, cap, approval policy, and per-capability estimates.
- `workflow`: current stage and required approval gates.
- `outputs`: requested deliverables and technical settings.
- `quality`: recorded findings and review state.

Every scene has a stable UUID, order, purpose, duration, narration, visual direction, text, media request, transition, and locks. Locks protect approved creative fields across regeneration.

Serialized project documents should materialize every field, including empty strings and arrays. Validate at every untrusted boundary. Do not accept a browser-provided workspace identity or provider credential inside the spec.

The validator also requires:

- unique scene order values;
- the sum of scene durations to remain within 10% of the target, with a two-second minimum tolerance;
- estimated cost not to exceed the project cap;
- the current workflow stage not to appear among completed stages.
