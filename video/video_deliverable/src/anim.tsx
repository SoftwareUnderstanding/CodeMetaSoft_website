import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Fades and lifts its children in, starting `delay` frames into the scene.
export const Reveal = ({
  delay = 0,
  distance = 40,
  children,
  style,
}: {
  readonly delay?: number;
  readonly distance?: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        opacity: interpolate(frame, [delay, delay + 18], [0, 1], clamp),
        translate: interpolate(
          frame,
          [delay, delay + 24],
          [`0px ${distance}px`, "0px 0px"],
          { ...clamp, easing: ease },
        ),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Bar that grows from 0 to `width` pixels.
export const GrowBar = ({
  delay = 0,
  width,
  color,
  height = 8,
}: {
  readonly delay?: number;
  readonly width: number;
  readonly color: string;
  readonly height?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        height,
        borderRadius: height,
        backgroundColor: color,
        width: interpolate(frame, [delay, delay + 30], [0, width], {
          ...clamp,
          easing: ease,
        }),
      }}
    />
  );
};

// Number that counts up from 0 to `value`.
export const CountUp = ({
  value,
  delay = 0,
  suffix = "",
}: {
  readonly value: number;
  readonly delay?: number;
  readonly suffix?: string;
}) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + 40], [0, value], {
    ...clamp,
    easing: ease,
  });
  return (
    <>
      {Math.round(v)}
      {suffix}
    </>
  );
};
