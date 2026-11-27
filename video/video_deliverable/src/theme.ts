import { loadFont } from "@remotion/google-fonts/SourceSans3";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

// Dark background, two accents (amber + blue), one sans-serif family.
export const theme = {
  fontFamily,
  background: "#0f1226",
  surface: "#1b1f3b",
  text: "#f4f5fa",
  muted: "#9aa0b8",
  accent: "#ffd38a",
  accent2: "#7b9cf0",
};
