# CodeMetaSoft explainer video

A 52-second explainer video about [CodeMetaSoft](https://w3id.org/codemetasoft), built with [Remotion](https://www.remotion.dev): every frame is drawn by React code, so the video can be re-rendered after any text change.

- Format: 1920×1080, 30 fps, H.264 + AAC
- Output: `output/codemetasoft.mp4`, with English subtitles in `output/codemetasoft.en.vtt`

## Reproduce the video

You need [Node.js](https://nodejs.org) 20.19 or newer.

```bash
cd codemetasoft-video
npm install       # installs the libraries into node_modules/ (about 1 min)
npm run render    # writes output/codemetasoft.mp4 (about 1–2 min)
```

The first render downloads a headless Chrome that Remotion uses to draw the frames. This happens once and needs internet access.

### What `node_modules` is

`npm install` creates `node_modules/`, the folder holding the libraries the project depends on (Remotion, React, and their own dependencies), about 2 GB. Don't edit, back up or share it. `package.json` lists the packages and `package-lock.json` pins their exact versions, so `npm install` rebuilds it identically. It is excluded from git, and you can delete it at any time.

## Edit the video

Preview with live reload:

```bash
npm run dev       # opens Remotion Studio at http://localhost:3000
```

| To change | Edit |
|---|---|
| Any on-screen text | `src/CodeMetaSoftVideo.tsx` (all text lives there) |
| Colours and font | `src/theme.ts` |
| Scene layouts and animations | `src/scenes/` and `src/visuals.tsx` |
| Logos | `public/logos/` |

Then run `npm run render` again. This overwrites `output/codemetasoft.mp4`.

### Timing

Scenes start at 0 · 5.5 · 14.5 · 23.5 · 33 · 43 s. Consecutive scenes overlap by a 0.5 s crossfade, so the scene durations in `src/CodeMetaSoftVideo.tsx` add up to 54.5 s for a 52 s video. If you change a duration, also update:

1. `durationInFrames` in `src/Root.tsx` (total seconds × 30),
2. the `from` / `to` of `<Chrome>` (the corner wordmark) in `src/CodeMetaSoftVideo.tsx`,
3. the cue times in `output/codemetasoft.en.vtt`.

## Voiceover

The video plays the six clips in `public/voice/` (`01-hook.wav` to `06-outro.wav`), one per scene. Each `<Audio>` in `src/CodeMetaSoftVideo.tsx` has a `from` offset that centres the speech in its scene, so a new clip of a different length needs a new offset: (scene length − speech length) / 2. The script is in `voiceover-script.md`. The original recordings (Fenrir) are in `voices/fenrir/`. The video does not read from that folder.

To replace a clip:

1. Overwrite the file in `public/voice/`, keeping its name.
2. Check what it says: `node --strip-types scripts/transcribe.ts`. This runs Whisper locally, prints each clip's text and writes word timings to `public/voice/captions/`. The first run downloads the model.
3. If the wording or timing changed, update `output/codemetasoft.en.vtt`.
4. Run `npm run render`.

Keep each clip shorter than its scene (see the script for the time slots).

## Publish on a website

```html
<video controls playsinline width="100%">
  <source src="codemetasoft.mp4" type="video/mp4">
  <track kind="subtitles" src="codemetasoft.en.vtt" srclang="en" label="English" default>
</video>
```

The video does not include the full Horizon Europe disclaimer ("Views and opinions expressed are however those of the author(s) only…"). Put it in the text next to the video.

## Files

| Path | Kept in git | Purpose |
|---|---|---|
| `src/` | yes | Scenes, text, animations |
| `public/` | yes | Logos, voice clips, voice transcripts |
| `package.json`, `package-lock.json` | yes | Dependencies, pinned versions |
| `remotion.config.ts`, `tsconfig.json`, `eslint.config.mjs` | yes | Project settings |
| `scripts/transcribe.ts` | yes | Transcribes voice clips |
| `voiceover-script.md` | yes | Voiceover script and time slots |
| `voices/` | your choice | Original recordings |
| `output/` | yes | Rendered video and subtitles |
| `node_modules/` | no | Rebuilt by `npm install` |

## Credits

CodeMetaSoft is a project of Universidad Politécnica de Madrid and LAPP (CNRS / Université Savoie Mont-Blanc), funded by OSCARS, which has received funding from the European Commission's Horizon Europe Research and Innovation programme under grant agreement No. 101129751.

Remotion is free for individuals and organisations of up to three people. Larger organisations may need a [company licence](https://www.remotion.pro/license).
