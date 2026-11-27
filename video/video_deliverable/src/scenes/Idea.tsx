import type React from "react";
import { Interactive } from "remotion";
import { GrowBar, Reveal } from "../anim";
import { theme } from "../theme";

// Shared layout for the three key ideas. The visual is passed as children:
// "side" puts it to the right of the text, "stacked" puts it below.
const IdeaInner = ({
  index,
  title,
  body,
  arrangement = "stacked",
  children,
}: {
  readonly index: string;
  readonly title: string;
  readonly body: string;
  readonly arrangement?: "side" | "stacked";
  readonly children?: React.ReactNode;
}) => {
  const side = arrangement === "side";
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "0 160px",
        display: "flex",
        flexDirection: side ? "row" : "column",
        justifyContent: side ? "space-between" : "center",
        alignItems: side ? "center" : "stretch",
        gap: side ? 80 : 64,
      }}
    >
      <div style={{ maxWidth: side ? 760 : 1500 }}>
        <Reveal delay={6} distance={0}>
          <div style={{ fontSize: 56, fontWeight: 700, color: theme.accent }}>
            {index}
          </div>
        </Reveal>
        <Reveal delay={10} distance={60}>
          <div
            style={{ fontSize: 110, fontWeight: 700, color: theme.text, lineHeight: 1.05 }}
          >
            {title}
          </div>
        </Reveal>
        <div style={{ margin: "28px 0 32px" }}>
          <GrowBar delay={20} width={200} color={theme.accent} />
        </div>
        <Reveal delay={26}>
          <div style={{ fontSize: 50, lineHeight: 1.3, color: theme.muted }}>
            {body}
          </div>
        </Reveal>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
};

export const Idea = Interactive.create({
  Component: IdeaInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    index: { type: "string", default: "01", description: "Number" },
    title: { type: "string", default: "", description: "Title" },
    body: { type: "string", default: "", description: "Body" },
  },
});
