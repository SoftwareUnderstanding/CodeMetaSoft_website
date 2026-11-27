import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Chrome } from "./Chrome";
import { Hook } from "./scenes/Hook";
import { Idea } from "./scenes/Idea";
import { Impact } from "./scenes/Impact";
import { Outro } from "./scenes/Outro";
import { theme } from "./theme";
import { CatalogueCard, DriftBars, Pipeline } from "./visuals";

// All on-screen text lives in this file. Edit a string, then run `npm run render`.
//
// Timing: each scene overlaps the next by a 0.5 s crossfade, so scene lengths
// add up to 54.5 s and the video lasts 52 s. Scenes start at
// 0 · 5.5 · 14.5 · 23.5 · 33 · 43 s. If you change a duration, update the Chrome
// timing below, durationInFrames in Root.tsx, and output/codemetasoft.en.vtt.
// Each voice clip has a `from` that centres its speech in the scene.
export const CodeMetaSoftVideo = () => {
  const { fps } = useVideoConfig();
  const bg = { backgroundColor: theme.background };
  const crossfade = linearTiming({ durationInFrames: 0.5 * fps });
  return (
    <AbsoluteFill
      style={{ backgroundColor: theme.background, fontFamily: theme.fontFamily }}
    >
      <TransitionSeries>
        {/* 0–5.5 s: hook */}
        <TransitionSeries.Sequence name="Hook" durationInFrames={6 * fps}>
          <Hook
            style={bg}
            kicker="CodeMetaSoft"
            headline="Research software metadata is written once,"
            highlight="then left to rot."
          />
          <Audio name="Voice 01-hook" from={0.6 * fps} src={staticFile("voice/01-hook.wav")} volume={0.9} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={crossfade} />

        {/* 5.5–33 s: three key ideas */}
        <TransitionSeries.Sequence name="01 Measure" durationInFrames={9.5 * fps}>
          <Idea
            style={bg}
            index="01"
            title="Measure"
            body="We compared the CodeMeta file of 1,500 research software repositories with their releases, package files and citation files."
          >
            <DriftBars
              rows={[
                { value: 30, label: "give a version that is not the latest release" },
                { value: 24, label: "contradict their own package file" },
                { value: 56, label: "list dependencies without versions" },
              ]}
            />
          </Idea>
          <Audio name="Voice 02-measure" from={1 * fps} src={staticFile("voice/02-measure.wav")} volume={0.9} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={crossfade} />

        <TransitionSeries.Sequence name="02 Diagnose" durationInFrames={9.5 * fps}>
          <Idea
            style={bg}
            arrangement="side"
            index="02"
            title="Diagnose"
            body="From 150 repositories checked by hand, we wrote a public catalogue of 29 recurring issues. Each one has a permanent link, a real example and a fix."
          >
            <CatalogueCard
              code="P001"
              kind="Pitfall · 1 of 29"
              title="Version does not match the latest release"
              rows={[
                { label: "Found in", value: "codemeta.json, GitHub releases" },
                { label: "Suggested fix", value: "Set version to 1.4.0, the latest release" },
              ]}
              link="w3id.org/rsmetacheck/catalog/#P001"
            />
          </Idea>
          <Audio name="Voice 03-diagnose" from={1 * fps} src={staticFile("voice/03-diagnose.wav")} volume={0.9} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={crossfade} />

        <TransitionSeries.Sequence name="03 Repair & monitor" durationInFrames={10 * fps}>
          <Idea
            style={bg}
            index="03"
            title="Repair & monitor"
            body="Open-source tools run these checks on any repository, on every change, and tell maintainers what to fix."
          >
            <Pipeline
              source="Your repository"
              engine="rsmetacheck"
              engineNote="29 checks"
              outputs={[
                "A check on each push (GitHub, GitLab)",
                "An issue opened by a bot",
                "A public dashboard",
              ]}
            />
          </Idea>
          <Audio name="Voice 04-repair" from={2 * fps} src={staticFile("voice/04-repair.wav")} volume={0.9} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={crossfade} />

        {/* 33–52 s: results and impact, then conclusion */}
        <TransitionSeries.Sequence name="Impact" durationInFrames={10.5 * fps}>
          <Impact
            style={bg}
            heading="What it changes"
            outcomes={[
              { lead: "90% accuracy", text: "Our tooling is highly accurate, with 90% of flagged issues being correct" },
              { lead: "Registries", text: "like the ESCAPE OSSR now check that metadata is correct, not just present" },
              { lead: "Any lab", text: "can use the tools: open source, on PyPI, ready for CI" },
            ]}
          />
          <Audio name="Voice 05-impact" from={1.1 * fps} src={staticFile("voice/05-impact.wav")} volume={0.9} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={crossfade} />

        <TransitionSeries.Sequence name="Conclusion" durationInFrames={9 * fps}>
          <Outro
            style={bg}
            message="Metadata that stays true to the code."
            url="w3id.org/codemetasoft"
            funding="CodeMetaSoft is funded by OSCARS, which has received funding from the European Commission's Horizon Europe Research and Innovation programme under grant agreement No. 101129751."
          />
          <Audio name="Voice 06-outro" from={1.6 * fps} src={staticFile("voice/06-outro.wav")} volume={0.9} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Chrome
        label="CodeMetaSoft"
        from={5.5 * fps}
        to={43.5 * fps}
      />
    </AbsoluteFill>
  );
};
