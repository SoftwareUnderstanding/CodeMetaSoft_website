import { interpolate, useCurrentFrame } from "remotion";
import { clamp } from "./anim";
import { theme } from "./theme";

// Persistent wordmark drawn above the middle scenes.
export const Chrome = ({
  label,
  from,
  to,
}: {
  readonly label: string;
  readonly from: number;
  readonly to: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(frame, [from, from + 15, to - 15, to], [0, 1, 1, 0], clamp),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 160,
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: theme.accent2,
        }}
      >
        {label}
      </div>
    </div>
  );
};
