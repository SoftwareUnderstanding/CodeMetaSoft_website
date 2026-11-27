import type React from "react";
import { CountUp, GrowBar, Reveal } from "./anim";
import { theme } from "./theme";

// Idea 1: share of repositories with each problem, as horizontal bars.
export const DriftBars = ({
  rows,
  delay = 50,
}: {
  readonly rows: readonly { readonly value: number; readonly label: string }[];
  readonly delay?: number;
}) => {
  const trackWidth = 1300;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {rows.map((r, i) => {
        const d = delay + i * 14;
        return (
          <Reveal key={r.label} delay={d} distance={24}>
            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 700,
                  color: theme.accent,
                  width: 200,
                  lineHeight: 1,
                }}
              >
                <CountUp value={r.value} delay={d} suffix="%" />
              </div>
              <div>
                <div style={{ fontSize: 44, color: theme.text, marginBottom: 12 }}>
                  {r.label}
                </div>
                <div
                  style={{
                    width: trackWidth,
                    height: 14,
                    borderRadius: 14,
                    backgroundColor: theme.surface,
                  }}
                >
                  <GrowBar
                    delay={d + 6}
                    width={(r.value / 100) * trackWidth}
                    color={theme.accent}
                    height={14}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};

// Idea 2: one entry of the catalogue, built line by line.
export const CatalogueCard = ({
  code,
  kind,
  title,
  rows,
  link,
  delay = 40,
}: {
  readonly code: string;
  readonly kind: string;
  readonly title: string;
  readonly rows: readonly { readonly label: string; readonly value: string }[];
  readonly link: string;
  readonly delay?: number;
}) => (
  <Reveal delay={delay} distance={50}>
    <div
      style={{
        width: 760,
        backgroundColor: theme.surface,
        borderRadius: 28,
        padding: "44px 52px",
        borderTop: `8px solid ${theme.accent}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: theme.background,
            backgroundColor: theme.accent,
            borderRadius: 12,
            padding: "6px 20px",
          }}
        >
          {code}
        </div>
        <div style={{ fontSize: 40, color: theme.muted }}>{kind}</div>
      </div>
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.15,
          margin: "28px 0 32px",
        }}
      >
        {title}
      </div>
      {rows.map((r, i) => (
        <Reveal key={r.label} delay={delay + 22 + i * 16} distance={20}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 32, color: theme.muted, marginBottom: 4 }}>
              {r.label}
            </div>
            <div style={{ fontSize: 44, color: theme.text, lineHeight: 1.2 }}>
              {r.value}
            </div>
          </div>
        </Reveal>
      ))}
      <Reveal delay={delay + 22 + rows.length * 16} distance={20}>
        <div style={{ fontSize: 34, color: theme.accent2, marginTop: 8 }}>{link}</div>
      </Reveal>
    </div>
  </Reveal>
);

const Box = ({
  children,
  strong = false,
  style,
}: {
  readonly children: React.ReactNode;
  readonly strong?: boolean;
  readonly style?: React.CSSProperties;
}) => (
  <div
    style={{
      backgroundColor: theme.surface,
      border: `3px solid ${strong ? theme.accent : theme.accent2}`,
      borderRadius: 20,
      padding: "24px 32px",
      fontSize: 44,
      fontWeight: 600,
      color: theme.text,
      lineHeight: 1.2,
      ...style,
    }}
  >
    {children}
  </div>
);

const Arrow = ({ delay }: { readonly delay: number }) => (
  <div style={{ display: "flex", alignItems: "center", width: 110 }}>
    <GrowBar delay={delay} width={90} color={theme.accent} height={6} />
    <div
      style={{
        width: 0,
        height: 0,
        borderTop: "14px solid transparent",
        borderBottom: "14px solid transparent",
        borderLeft: `20px solid ${theme.accent}`,
      }}
    />
  </div>
);

// Idea 3: from a repository, through rsmetacheck, to three outputs.
export const Pipeline = ({
  source,
  engine,
  engineNote,
  outputs,
  delay = 50,
}: {
  readonly source: string;
  readonly engine: string;
  readonly engineNote: string;
  readonly outputs: readonly string[];
  readonly delay?: number;
}) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Reveal delay={delay}>
      <Box style={{ width: 330 }}>{source}</Box>
    </Reveal>
    <Reveal delay={delay + 12} distance={0}>
      <Arrow delay={delay + 12} />
    </Reveal>
    <Reveal delay={delay + 22}>
      <Box strong style={{ width: 360 }}>
        {engine}
        <div style={{ fontSize: 36, fontWeight: 400, color: theme.muted, marginTop: 6 }}>
          {engineNote}
        </div>
      </Box>
    </Reveal>
    <Reveal delay={delay + 34} distance={0}>
      <Arrow delay={delay + 34} />
    </Reveal>
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {outputs.map((o, i) => (
        <Reveal key={o} delay={delay + 44 + i * 12}>
          <Box style={{ width: 560 }}>{o}</Box>
        </Reveal>
      ))}
    </div>
  </div>
);
