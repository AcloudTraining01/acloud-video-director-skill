# Production routes

Select the route by the primary deliverable. The internal route ID remains stable while the customer-facing name can stay clear and specific. Route selection does not choose a paid provider.

| Route ID | Customer-facing name | Replaces / clarifies | Best use | Default |
| --- | --- | --- | --- | --- |
| `long_form` | **Long-Form Video** | Long-form video | Build a chaptered video with a sustained argument, tutorial, story, or lesson. | 16:9, 600 seconds, hyperframes |
| `short_form` | **Social Short** | Short-form video | Create a fast vertical or square video with one hook, one payoff, and one next action. | 9:16, 30 seconds, ffmpeg |
| `drag_drop_animation` | **Motion Canvas** | Drag-and-drop animation | Animate supplied text, brand assets, images, charts, and cards on a controlled timeline. | 16:9, 30 seconds, hyperframes |
| `single_scene` | **Single Scene** | Single-scene video | Design one focused visual moment with exact action, camera, timing, text, and sound. | 16:9, 8 seconds, hyperframes |
| `documentary_montage` | **Documentary Story** | Documentary montage | Build a source-led story in which footage, records, interviews, and citations carry the argument. | 16:9, 480 seconds, ffmpeg |
| `product_demo` | **Product Demo** | Product demonstration | Show a real product or workflow through a clear user journey with controlled captures and callouts. | 16:9, 90 seconds, ffmpeg |
| `podcast_repurpose` | **Podcast Clips** | Podcast repurposing | Turn an approved podcast or interview recording into transcript-led, reviewable social clips. | 9:16, 45 seconds, ffmpeg |
| `faceless_video` | **Faceless Explainer** | Faceless video | Create a narration-led video using typography, diagrams, stock, stills, screen captures, or generated media. | 16:9, 300 seconds, hyperframes |

## Shared intake

Ask these after the format is selected. Store each answer in the target field; do not ask again when a saved project or Brand Kit already supplies it.

| Question | Target | Required |
| --- | --- | --- |
| What should this video help the viewer understand, feel, or do? | `brief.goal` | Yes |
| Who is this video for? | `brief.audience` | Yes |
| Where will the main version be watched? | `brief.platform` | Yes |
| How long should the main version be? | `brief.targetDurationSeconds` | Yes |
| Which frame should we design first? | `brief.aspectRatio` | Yes |
| What language should the finished video use? | `brief.language` | Yes |
| How should the video sound and feel? | `brief.tone` | Yes |
| What should the viewer do next? | `brief.callToAction` | No |

## Long-Form Video (`long_form`)

Build a chaptered video with a sustained argument, tutorial, story, or lesson.

**Best for:** YouTube episodes, training lessons, deep tutorials, case studies.

**Planning defaults:** youtube; 16:9; 180–3600 seconds with 600 seconds recommended; `hyperframes` compositor.

**Initial capabilities:** `research`, `stock_search`, `narration`, `composition`, `media_editing`, `captions`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **What are we starting from?**<br>`sourceStage` | This determines whether the first production step is research, outlining, script adaptation, or transcript editing. | single choice: A topic or rough idea; An approved outline; A finished script; An existing recording |
| **Which structure best fits the story?**<br>`narrativeShape` | Choose the dominant structure; individual chapters can still vary. | single choice: Step-by-step tutorial; Documentary narrative; Case study; Numbered or ranked list; Commentary or analysis |
| **How many major sections should it contain?**<br>`sectionCount` | Count chapters, not individual shots. | number (3–20 sections) |
| **What should carry the visuals?**<br>`visualApproach` | Pick the main visual system so the storyboard does not become an inconsistent mix of styles. | single choice: A controlled mix of footage, graphics, and text; Screen recordings and interface demonstrations; Licensed footage and source-led B-roll; A presenter or supplied talking-head recording; Motion graphics, diagrams, and typography |
| **What evidence standard should the script follow?**<br>`researchStandard` | Current research adds source work and review. It never authorizes copying or unsupported claims. | single choice: Use only sources I provide; Research current public sources; Require a source for every factual claim |

## Social Short (`short_form`)

Create a fast vertical or square video with one hook, one payoff, and one next action.

**Best for:** TikTok, Instagram Reels, YouTube Shorts, paid social.

**Planning defaults:** instagram; 9:16; 6–90 seconds with 30 seconds recommended; `ffmpeg` compositor.

**Initial capabilities:** `composition`, `media_editing`, `captions`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **What job should this short do?**<br>`shortPurpose` | A short performs better when it has one job instead of several competing goals. | single choice: Teach one useful idea; Promote an offer or product; Entertain or tell a quick story; Make an announcement; Turn an existing moment into a highlight |
| **What should earn attention in the first two seconds?**<br>`openingHook` | State the tension, result, surprise, or visual action. Avoid vague introductions. | textarea |
| **Where should the short come from?**<br>`sourceMode` | This separates original creation from transcript-led repurposing and product-asset editing. | single choice: Create it from this brief; Extract it from a longer recording; Build it from product or brand assets; Respond to a current topic with sourced context |
| **How prominent should captions be?**<br>`captionStyle` | Caption treatment affects framing and safe-area planning from the first storyboard. | single choice: Clean and understated; Bold social captions; Word-by-word emphasis; Minimal captions only when needed |
| **How many hook or edit variants should we plan?**<br>`variantCount` | Variants share approved source material but remain separate outputs for review. | number (1–10 variants) |

## Motion Canvas (`drag_drop_animation`)

Animate supplied text, brand assets, images, charts, and cards on a controlled timeline.

**Best for:** kinetic typography, animated explainers, logo reveals, data stories.

**Planning defaults:** website; 16:9; 3–300 seconds with 30 seconds recommended; `hyperframes` compositor.

**Initial capabilities:** `composition`, `media_editing`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **Which assets should appear on the canvas?**<br>`assetSource` | Select every approved source. Missing assets remain explicit requests rather than invented substitutes. | multi choice: My uploads; Brand Kit; Existing Library assets; Licensed stock; Text and shapes only |
| **Which motion system should lead the design?**<br>`motionPattern` | This sets a coherent visual grammar for the whole composition. | single choice: Kinetic typography; Cards and interface panels; Charts, diagrams, and data; Editorial slideshow; Logo or brand reveal |
| **How should timing be established?**<br>`timelineControl` | Automatic timing is a first draft; scene-by-scene timing gives precise control. | single choice: Create a timing proposal; I will set each scene duration |
| **How much movement should the design use?**<br>`motionIntensity` | Motion level controls transition distance, easing, camera movement, and simultaneous animation. | single choice: Subtle and premium; Balanced; Energetic |
| **Should the ending connect cleanly back to the beginning?**<br>`loopMode` | Enable this for displays, backgrounds, and repeating social assets. | boolean |

## Single Scene (`single_scene`)

Design one focused visual moment with exact action, camera, timing, text, and sound.

**Best for:** hero loops, announcements, title cards, product moments.

**Planning defaults:** website; 16:9; 3–30 seconds with 8 seconds recommended; `hyperframes` compositor.

**Initial capabilities:** `composition`, `media_editing`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **What is this scene responsible for?**<br>`scenePurpose` | One scene should communicate one clear idea or transition. | single choice: Website or campaign hero; Announcement; Quote or statement; Product spotlight; Section transition; End card or call to action |
| **What exactly happens from the first frame to the last?**<br>`subjectAction` | Describe subject, setting, action, and final state. Use observable actions rather than mood alone. | textarea |
| **What should the scene be built from?**<br>`visualMedium` | Generated media remains an optional provider step and requires its own estimate. | single choice: An uploaded asset; Motion graphics and typography; A generated image with motion; A generated video clip; Licensed stock |
| **How should the viewer's point of view move?**<br>`cameraMovement` | Choose one dominant move so the result stays readable. | single choice: Locked camera; Slow push in; Pull back; Pan; Orbit; Controlled handheld; Custom movement |
| **What should we hear?**<br>`audioMode` | Audio choice determines narration, dialogue timing, music, and caption needs. | single choice: Voiceover narration; On-screen dialogue; Music or sound design only; Silent |

## Documentary Story (`documentary_montage`)

Build a source-led story in which footage, records, interviews, and citations carry the argument.

**Best for:** mini documentaries, brand histories, profiles, evidence-led stories.

**Planning defaults:** youtube; 16:9; 60–3600 seconds with 480 seconds recommended; `ffmpeg` compositor.

**Initial capabilities:** `research`, `transcription`, `stock_search`, `narration`, `composition`, `media_editing`, `captions`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **What is the central question or thesis?**<br>`storyThesis` | The finished story should test or support this idea with traceable evidence. | textarea |
| **Which source types may we use?**<br>`sourcePolicy` | Every selected source still requires provenance and rights review. | multi choice: My uploads; Existing Library sources; Licensed stock; Public archives; Current public web research |
| **How should the evidence unfold?**<br>`storyStructure` | Select the primary editorial structure. | single choice: Chronological; Thematic chapters; Problem and response; Person or company profile; Question-led investigation |
| **How should sources appear in the deliverable?**<br>`evidenceStandard` | On-screen citations help viewers; the source log preserves production evidence. | single choice: On-screen citations; Production source log; Both on-screen citations and source log |
| **How should interview material be handled?**<br>`interviewMode` | Only use supplied or licensed recordings and accurate excerpts. | single choice: No interviews; Use supplied interview recordings; Narrate verified excerpts from supplied sources |

## Product Demo (`product_demo`)

Show a real product or workflow through a clear user journey with controlled captures and callouts.

**Best for:** software walkthroughs, feature launches, digital-product demos, sales pages.

**Planning defaults:** website; 16:9; 15–600 seconds with 90 seconds recommended; `ffmpeg` compositor.

**Initial capabilities:** `screen_capture`, `narration`, `composition`, `media_editing`, `captions`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **What are we demonstrating?**<br>`demoSubject` | This determines the capture plan and what counts as accurate product behavior. | single choice: Website; Software or app; Digital product or template; Physical product; Process or workflow |
| **Which approved visuals are available?**<br>`captureSource` | Choose every real source available before requesting mockups or generated inserts. | multi choice: Screen recording; Product images; Product footage; A new capture we need to record; Generated mockups for supporting shots |
| **Which user journey should the demo prove?**<br>`userJourney` | List the starting state, essential actions, and visible result. Avoid a feature inventory. | textarea |
| **How should private or customer information be handled?**<br>`privacyTreatment` | Privacy treatment is part of capture planning and must happen before export. | single choice: No sensitive information appears; Blur sensitive fields; Use approved demonstration data |
| **How should the viewer's attention be guided?**<br>`highlightStyle` | Choose one dominant guidance system to keep the demo clean. | single choice: Cursor focus and controlled zooms; Callouts and labels; Interface plus explanation; Clean cuts with minimal overlays |

## Podcast Clips (`podcast_repurpose`)

Turn an approved podcast or interview recording into transcript-led, reviewable social clips.

**Best for:** speaker highlights, educational clips, episode promotion, quote videos.

**Planning defaults:** instagram; 9:16; 15–90 seconds with 45 seconds recommended; `ffmpeg` compositor.

**Initial capabilities:** `transcription`, `media_editing`, `captions`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **Which recording should we use?**<br>`sourceAssetId` | Choose an uploaded or Library asset you own or have permission to edit. A public URL is not treated as permission. | asset |
| **What kinds of moments should we look for?**<br>`clipObjective` | This guides transcript selection without changing the speaker's meaning. | single choice: Strongest insights; Educational explanations; Episode promotion; Personal or story moments; A specific speaker's best moments |
| **How many clip candidates should we prepare?**<br>`clipCount` | Candidates remain drafts until the exact transcript ranges and framing are reviewed. | number (1–20 clips) |
| **What length should each clip target?**<br>`clipLength` | The final cut may be shorter when the thought ends naturally. | single choice: Under 30 seconds; 30–60 seconds; 60–90 seconds |
| **How should speakers and supporting visuals be framed?**<br>`speakerLayout` | This determines crop review and when B-roll is needed. | single choice: Active speaker; Split screen; Audio waveform with branded visuals; Speaker audio with reviewed B-roll |

## Faceless Explainer (`faceless_video`)

Create a narration-led video using typography, diagrams, stock, stills, screen captures, or generated media.

**Best for:** educational channels, list videos, brand explainers, narrated stories.

**Planning defaults:** youtube; 16:9; 30–1800 seconds with 300 seconds recommended; `hyperframes` compositor.

**Initial capabilities:** `research`, `stock_search`, `narration`, `composition`, `media_editing`, `captions`, `audio_mix`, `quality_review`, `export`.

| Question | Why it is asked | Answer |
| --- | --- | --- |
| **What are we starting from?**<br>`scriptStage` | This decides whether the workflow begins with research, outlining, script adaptation, or audio timing. | single choice: Topic only; Approved outline; Finished script; Existing narration or audio |
| **Which editorial angle should lead?**<br>`storyAngle` | Choose one primary angle so the hook, scenes, and pacing support the same promise. | single choice: How-to; List or countdown; Concept explainer; Case study; Commentary or analysis |
| **What should carry the visual identity?**<br>`visualSystem` | This defines the reusable visual language before individual assets are sourced. | single choice: Licensed stock with motion graphics; Illustrations and diagrams; Kinetic typography; Screen captures and diagrams; A controlled mixed-media system |
| **How should narration sound?**<br>`narratorStyle` | Choose direction first; provider and voice selection happen during approved routing. | single choice: Warm and conversational; Authoritative and measured; Energetic; Calm and reflective; Use my approved recording |
| **Should this establish a reusable episode template?**<br>`reuseTemplate` | A reusable template locks approved typography, layout, captions, transitions, and audio treatment while leaving content editable. | boolean |

## Routing rules

- Keep `identity.route` and the selected route definition aligned.
- Save the five route-specific responses in `routePlan.answers`; shared responses populate their canonical `brief` fields.
- Start from the route defaults, then record justified changes. A default is a planning aid, not a provider commitment.
- Do not infer a premium generation provider from a route. A Faceless Explainer can use local narration, licensed stills, motion graphics, and FFmpeg.
- When more than one route fits, choose the route that matches the primary timeline. Use additional `outputs` for simple variants and separate linked specs when approval histories or timelines diverge.
- Revalidate the route answers, duration range, cost plan, sources, and downstream approvals whenever the route changes.
