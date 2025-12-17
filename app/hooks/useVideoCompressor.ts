import { useState, useRef } from 'react';

export function useVideoCompressor() {
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0); // New: Track progress percentage
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const ffmpegRef = useRef<any>(null);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

    if (!ffmpegRef.current) {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');

      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      ffmpeg.on('progress', (event) => {
        const percentage = Math.round(event.progress * 100);
        setProgress(percentage);
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }
  };

  const compress = async (file: File): Promise<File | null> => {
    setCompressing(true);
    setProgress(0); // Reset progress on start

    try {
      await load();
      const ffmpeg = ffmpegRef.current;
      const { fetchFile } = await import('@ffmpeg/util');

      // Write file to memory
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));

      // --- THE SPEED SETTINGS ---
      // -vf scale=320:-2  -> Low resolution (320px width)
      // -r 1              -> 1 Frame Per Second (Huge speed boost)
      // -crf 35           -> Low quality (Pixelated but fine for AI)
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', 'scale=160:-2',
        '-r', '1',
        '-c:v', 'libx264',
        '-crf', '35',
        '-preset', 'ultrafast',
        'output.mp4'
      ]);

      // Read result
      const data = await ffmpeg.readFile('output.mp4');
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const compressedBlob = new Blob([data as any], { type: 'video/mp4' });
      /* eslint-enable @typescript-eslint/no-explicit-any */

      return new File([compressedBlob], "compressed_" + file.name, { type: 'video/mp4' });

    } catch (error) {
      console.error("Compression failed", error);
      return null;
    } finally {
      setCompressing(false);
      setProgress(0);
    }
  };

  // Return 'progress' so the Dashboard can see it
  return { compress, compressing, progress };
}
