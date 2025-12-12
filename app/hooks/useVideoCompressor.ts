import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export function useVideoCompressor() {
  const [compressing, setCompressing] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    // Only load if not already loaded
    if (!ffmpeg.loaded) {
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
    }
  };

  const compress = async (file: File): Promise<File | null> => {
    setCompressing(true);
    try {
      const ffmpeg = ffmpegRef.current;
      await load();

      // Write file to memory
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));

      // Run compression command
      // -vf scale=480:-2 : Downscale to 480p width (keep aspect ratio)
      // -r 10 : Reduce framerate to 10fps (AI doesn't need 60fps)
      // -crf 28 : High compression (lower quality visual, but fine for AI)
      // -preset ultrafast : Prioritize speed over perfect compression
      await ffmpeg.exec([
          '-i', 'input.mp4', 
          '-vf', 'scale=480:-2', 
          '-r', '10', 
          '-c:v', 'libx264', 
          '-crf', '30', 
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
    }
  };

  return { compress, compressing };
}