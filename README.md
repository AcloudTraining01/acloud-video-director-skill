# ACloud Video Director Skill

A portable agent skill for planning, routing, budgeting, checkpointing, reviewing, and exporting video productions. It turns a brief or questionnaire into a provider-neutral `VideoProjectSpec` and coordinates specialized tools such as HyperFrames, FFmpeg, VoiceStudio, stock providers, and optional media-generation adapters.

The package follows the open `SKILL.md` convention. The skill is procedural: it does not contain provider credentials, hosted services, or a video renderer. Agents use it to create and govern production plans while calling the media tools available in their own environment.

## Install

### Codex, Claude Code, Cursor, and other compatible agents

```bash
npx skills add AcloudTraining01/acloud-video-director-skill@acloud-video-director -g -y
```

For project-only installation, omit `-g`.

### Hermes Agent

Hermes can install the skill directly from the raw `SKILL.md` URL and will fetch the explicitly referenced support files:

```bash
hermes skills install https://raw.githubusercontent.com/AcloudTraining01/acloud-video-director-skill/main/skills/acloud-video-director/SKILL.md
```

Then use it with `/acloud-video-director` or allow Hermes to select it from the request.

### Manual installation

Clone the repository and copy or symlink `skills/acloud-video-director` into the agent's skill directory. Common global locations include:

- Codex: `~/.codex/skills/acloud-video-director`
- Hermes: `~/.hermes/skills/acloud-video-director`
- Shared agent convention: `~/.agents/skills/acloud-video-director`

Cloning alone does not activate a skill unless the agent scans the clone or the skill directory is copied, linked, or installed through its skill manager.

## Canonical project contract

The portable runtime contract is [`skills/acloud-video-director/schemas/video-project-spec.schema.json`](skills/acloud-video-director/schemas/video-project-spec.schema.json). It uses JSON Schema Draft 2020-12 and keeps providers, credentials, job leases, signed URLs, and rendered bytes outside the creative project document.

Validate a project file with:

```bash
npm install
npm run validate -- path/to/video-project.json
```

Run the repository checks with:

```bash
npm test
```

## What the skill governs

- Eight production routes: Long-Form Video, Social Short, Motion Canvas, Single Scene, Documentary Story, Product Demo, Podcast Clips, and Faceless Explainer.
- A versioned machine-readable intake catalog with nine shared questions and five format-specific questions per route.
- A resumable lifecycle from intake through export.
- Provider-neutral capability planning and explicit fallbacks.
- Version-bound approvals, cost reservations, provenance, and reuse of successful billable outputs.
- Deterministic technical checks plus human creative and rights review.

## License

[MIT](LICENSE)
