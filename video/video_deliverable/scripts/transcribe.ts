// Transcribes each voice file in public/voice/ to public/voice/captions/<name>.json.
// Run: node --strip-types scripts/transcribe.ts
import { registerMediabunnyServer } from "@mediabunny/server";
import {
  WHISPER_WEBGPU_SAMPLE_RATE,
  canUseWhisperWebGpu,
  downloadWhisperModel,
  loadWhisperModel,
  toCaptions,
  transcribe,
} from "@remotion/whisper-webgpu";
import {
  ALL_FORMATS,
  Conversion,
  FilePathSource,
  Input,
  NullTarget,
  Output,
  WavOutputFormat,
} from "mediabunny";
import { readdir, writeFile } from "node:fs/promises";

registerMediabunnyServer();

const support = await canUseWhisperWebGpu();
if (!support.supported) throw new Error(support.detailedReason);

const decode = async (path: string) => {
  const chunks: { startFrame: number; waveform: Float32Array }[] = [];
  using input = new Input({ formats: ALL_FORMATS, source: new FilePathSource(path) });
  const audioTrack = await input.getPrimaryAudioTrack();
  if (audioTrack === null) throw new Error(`${path} has no audio track`);
  const conversion = await Conversion.init({
    input,
    output: new Output({ format: new WavOutputFormat(), target: new NullTarget() }),
    video: { discard: true },
    audio: (track) => {
      if (track.id !== audioTrack.id) return { discard: true };
      return {
        codec: "pcm-f32",
        forceTranscode: true,
        numberOfChannels: 1,
        sampleFormat: "f32",
        sampleRate: WHISPER_WEBGPU_SAMPLE_RATE,
        process: (sample) => {
          const waveform = new Float32Array(
            sample.allocationSize({ format: "f32", planeIndex: 0 }) /
              Float32Array.BYTES_PER_ELEMENT,
          );
          sample.copyTo(waveform, { format: "f32", planeIndex: 0 });
          chunks.push({
            startFrame: Math.round(sample.timestamp * WHISPER_WEBGPU_SAMPLE_RATE),
            waveform,
          });
          return sample;
        },
      };
    },
  });
  if (!conversion.isValid) throw new Error(`${path} cannot be decoded`);
  await conversion.execute();
  const length = chunks.reduce((m, c) => Math.max(m, c.startFrame + c.waveform.length), 0);
  const out = new Float32Array(length);
  for (const c of chunks) out.set(c.waveform.subarray(0, length - c.startFrame), c.startFrame);
  return out;
};

const model = "small.en";
await downloadWhisperModel({ model });
await using _handle = await loadWhisperModel({ model });

const files = (await readdir("public/voice")).filter((f) => f.endsWith(".wav")).sort();
for (const f of files) {
  const channelWaveform = await decode(`public/voice/${f}`);
  const transcription = await transcribe({ channelWaveform, model });
  const { captions } = toCaptions({ whisperWebGpuOutput: transcription });
  const name = f.replace(/\.wav$/, "");
  await writeFile(`public/voice/captions/${name}.json`, JSON.stringify(captions, null, 2));
  console.log(`${name}: ${captions.map((c) => c.text).join("").trim()}`);
}
