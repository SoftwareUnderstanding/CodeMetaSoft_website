import { Img, Interactive, staticFile } from "remotion";
import { GrowBar, Reveal } from "../anim";
import { theme } from "../theme";

// Logos sit on a white band: the LAPP and OSCARS marks use dark text.
const logos = [
  { src: "logos/eu.png", height: 112 },
  { src: "logos/oscars.png", height: 100 },
  { src: "logos/upm.svg", height: 136 },
  { src: "logos/lapp_logo.png", height: 96 },
];

const OutroInner = ({
  message,
  url,
  funding,
}: {
  readonly message: string;
  readonly url: string;
  readonly funding: string;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      padding: "0 160px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Reveal delay={6}>
      <div
        style={{
          fontSize: 100,
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.1,
          maxWidth: 1100,
        }}
      >
        {message}
      </div>
    </Reveal>
    <div style={{ margin: "36px 0" }}>
      <GrowBar delay={18} width={260} color={theme.accent} />
    </div>
    <Reveal delay={24}>
      <div style={{ fontSize: 64, fontWeight: 600, color: theme.accent }}>{url}</div>
    </Reveal>
    <Reveal delay={40} style={{ width: "100%", marginTop: 72 }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 24,
          height: 190,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {logos.map((l) => (
          <Img key={l.src} src={staticFile(l.src)} style={{ height: l.height }} />
        ))}
      </div>
      <div
        style={{
          fontSize: 30,
          color: theme.muted,
          lineHeight: 1.35,
          marginTop: 24,
        }}
      >
        {funding}
      </div>
    </Reveal>
  </div>
);

export const Outro = Interactive.create({
  Component: OutroInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
    message: { type: "string", default: "", description: "Message" },
    url: { type: "string", default: "", description: "URL" },
    funding: { type: "string", default: "", description: "Funding statement" },
  },
});
