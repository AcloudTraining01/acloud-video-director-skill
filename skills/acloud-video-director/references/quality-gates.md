# Video quality gates

## Deterministic checks

- Every referenced asset exists, is authorized, and matches its recorded checksum.
- Scene order and timing cover the intended timeline without accidental gaps or overlaps.
- Captions remain within their source-word or approved narration timing.
- Output duration, dimensions, aspect ratio, frame rate, codec, and container match the spec.
- Narration is not truncated; audio streams are present when requested.
- Loudness, true peak, music ducking, and channel layout meet the selected delivery profile.
- Safe-area, text overflow, missing-font, failed-request, and composition runtime checks pass.
- Export is playable and its exact project/spec revision is recorded.

## Human review

- Hook, pacing, claims, pronunciation, identity consistency, reframing, transitions, caption readability, and call to action.
- Rights and provenance for stock, music, fonts, uploaded media, voice, and generated assets.
- A representative frame from every scene and motion across every transition.

Findings record `severity`, `kind`, `location`, `evidence`, `proposedFix`, and `status`. Only unresolved deterministic `error` findings block export. Publication requires an explicit approval bound to the final artifact version.
