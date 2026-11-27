import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { clamp, Reveal } from "../anim";
import { theme } from "../theme";

// Two file cards: the release version moves on, codemeta.json does not.
const DriftCards = ({
  stale,
  releases,
}: {
  readonly stale: string;
  readonly releases: readonly string[];
}) => {
  const frame = useCurrentFrame();
  const step = Math.min(
    releases.length - 1,
    Math.max(0, Math.floor((frame - 50) / 22)),
  );
  const flagged = interpolate(frame, [108, 120], [0, 1], clamp);
  const card: React.CSSProperties = {
    backgroundColor: theme.surface,
    borderRadius: 20,
    padding: "28px 40px",
    width: 620,
    fontSize: 44,
  };
  return (
    <div style={{ display: "flex", gap: 48, alignItems: "center", marginTop: 72 }}>
      <Reveal delay={30}>
        <div
          style={{
            ...card,
            outline: `4px solid rgba(255, 211, 138, ${flagged})`,
          }}
        >
          <div style={{ color: theme.muted, fontSize: 36, marginBottom: 10 }}>
            codemeta.json
          </div>
          <div style={{ color: theme.text, fontWeight: 600 }}>
            version: <span style={{ color: theme.accent }}>{stale}</span>
          </div>
        </div>
      </Reveal>
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: theme.accent,
          opacity: flagged,
          scale: interpolate(flagged, [0, 1], [0.6, 1]),
        }}
      >
        ≠
      </div>
      <Reveal delay={38}>
        <div style={card}>
          <div style={{ color: theme.muted, fontSize: 36, marginBottom: 10 }}>
            Latest release
          </div>
          <div style={{ color: theme.text, fontWeight: 600 }}>
            version: <span style={{ color: theme.accent2 }}>{releases[step]}</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const HookInner = ({
  kicker,
  headline,
  highlight,
}: {
  readonly kicker: string;
  readonly headline: string;
  readonly highlight: string;
}) => {
  const words = headline.split(" ");
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "0 160px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Reveal delay={0} distance={20}>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: theme.accent2,
            marginBottom: 32,
          }}
        >
          {kicker}
        </div>
      </Reveal>
      <div
        style={{
          fontSize: 100,
          fontWeight: 700,
          lineHeight: 1.08,
          color: theme.text,
          display: "flex",
          flexWrap: "wrap",
          columnGap: "0.25em",
        }}
      >
        {words.map((w, i) => (
          <Reveal key={i} delay={4 + i * 3}>
            {w}
          </Reveal>
        ))}
        <Reveal delay={4 + words.length * 3 + 6}>
          <span style={{ color: theme.accent }}>{highlight}</span>
        </Reveal>
      </div>
      <DriftCards stale="1.2.0" releases={["1.2.0", "1.3.0", "1.4.0"]} />
    </div>
  );
};

export const Hook = Interactive.create({
  Component: HookInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    kicker: { type: "string", default: "", description: "Kicker" },
    headline: { type: "string", default: "", description: "Headline" },
    highlight: { type: "string", default: "", description: "Highlighted end" },
  },
});
