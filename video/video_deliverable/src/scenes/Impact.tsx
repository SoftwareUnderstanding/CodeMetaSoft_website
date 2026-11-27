import { Interactive } from "remotion";
import { GrowBar, Reveal } from "../anim";
import { theme } from "../theme";

type Outcome = { readonly lead: string; readonly text: string };

const ImpactInner = ({
  heading,
  outcomes = [],
}: {
  readonly heading: string;
  readonly outcomes?: readonly Outcome[];
}) => (
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
    <Reveal delay={6}>
      <div style={{ fontSize: 100, fontWeight: 700, color: theme.text }}>{heading}</div>
    </Reveal>
    <div style={{ margin: "28px 0 72px" }}>
      <GrowBar delay={16} width={200} color={theme.accent} />
    </div>
    <div style={{ display: "flex", gap: 56 }}>
      {outcomes.map((o, i) => (
        <Reveal key={o.lead} delay={24 + i * 16} style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: theme.surface,
              borderRadius: 28,
              padding: "44px 44px 52px",
              height: "100%",
              borderTop: `8px solid ${theme.accent2}`,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: theme.accent,
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              {o.lead}
            </div>
            <div style={{ fontSize: 46, color: theme.text, lineHeight: 1.3 }}>
              {o.text}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

export const Impact = Interactive.create({
  Component: ImpactInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    heading: { type: "string", default: "", description: "Heading" },
  },
});
