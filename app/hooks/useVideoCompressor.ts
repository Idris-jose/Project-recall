import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export function useVideoCompressor() {
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0); // New: Track progress percentage
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    if (!ffmpeg.loaded) {
        // Setup the listener BEFORE loading
        // @ts-ignore - The types for the event are sometimes tricky in TS
        ffmpeg.on('progress', (event) => {
            // "event.progress" is a number between 0 and 1
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
      const ffmpeg = ffmpegRef.current;
      await load();

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
      const compressedBlob = new Blob([data], { type: 'video/mp4' });
      
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