import { Composition } from "remotion";
import { CodeMetaSoftVideo } from "./CodeMetaSoftVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CodeMetaSoft"
      component={CodeMetaSoftVideo}
      durationInFrames={1560}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
