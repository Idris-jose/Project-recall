"use client"

import { useState, useRef } from 'react';
import { Upload, Bot, User } from 'lucide-react';
import { useVideoCompressor } from '../hooks/useVideoCompressor'; 
import MarkdownRenderer from './components/MarkdownRenderer'; 

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  // NEW: Store the Gemini URI here
  const [geminiFileUri, setGeminiFileUri] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [prompt, setPrompt] = useState('');
  
  const { compress, compressing, progress } = useVideoCompressor();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setVideoUrl(URL.createObjectURL(selectedFile));
      
      // IMPORTANT: Reset the URI because it's a new video!
      setGeminiFileUri(null); 
      setChatLog([]); // Optional: clear chat for new video
    }
  };

  const seekVideo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  const handleAnalyze = async () => {
    if (!file && !geminiFileUri) return; // Need at least a file or a URI
    setLoading(true);
    setChatLog(prev => [...prev, { role: 'user', content: prompt || "Analyze this video" }]);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt || "Summarize this video with timestamps.");

      // LOGIC BRANCH:
      if (geminiFileUri) {
         // SCENARIO A: We already uploaded it. Just send the ID.
         console.log("🚀 Using existing Gemini URI - Skipping upload!");
         formData.append('fileUri', geminiFileUri);
      } else {
         // SCENARIO B: First time. Compress & Upload.
         let fileToSend = file!;
         
         // Only compress if no URI exists yet
         if (file!.size > 10 * 1024 * 1024) {
            const compressedFile = await compress(file!);
            if (compressedFile) fileToSend = compressedFile;
         }
         
         formData.append('file', fileToSend);
      }

      const res = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.error) {
        setChatLog(prev => [...prev, { role: 'ai', content: `Error: ${data.error}` }]);
      } else {
        setChatLog(prev => [...prev, { role: 'ai', content: data.result }]);
        
        // SAVE THE URI FOR NEXT TIME
        if (data.fileUri) {
            setGeminiFileUri(data.fileUri);
        }
      }
    } catch (err) {
      setChatLog(prev => [...prev, { role: 'ai', content: "Connection failed." }]);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col md:flex-row">
      {/* ... Sidebar Code ... */}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* ... Header Code ... */}

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left: Video Player */}
          <div className="flex-1 p-6 border-r border-white/10 flex flex-col bg-black/40">
             <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-center">
                {!file ? (
                  <label className="border-2 border-dashed border-white/10 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-[#39FF14]/50 transition-all">
                    <Upload className="text-neutral-400 mb-4" />
                    <span className="text-neutral-300">Upload Video</span>
                    <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                  </label>
                ) : (
                  <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    <video 
                      ref={videoRef}
                      src={videoUrl || ""} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                    <button onClick={() => setFile(null)} className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded text-xs text-red-400 hover:bg-black">Change Video</button>
                  </div>
                )}
             </div>
          </div>

          {/* Right: Chat Interface */}
          <div className="w-full md:w-[450px] bg-[#0A0A0A] flex flex-col border-l border-white/5">
             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatLog.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-[#39FF14]/10 text-[#39FF14]'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    
                    <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-[#39FF14]/5 border border-[#39FF14]/10'}`}>
                       {msg.role === 'ai' ? (
                         <MarkdownRenderer content={msg.content} onTimestampClick={seekVideo} />
                       ) : (
                         <p>{msg.content}</p>
                       )}
                    </div>
                  </div>
                ))}
                
                {/* 4. Update Loading State to show what is happening */}
               {(loading || compressing) && (
   <div className="flex flex-col gap-2 w-full max-w-[85%] bg-[#39FF14]/5 p-4 rounded-xl border border-[#39FF14]/10">

     <div className="flex gap-4 items-center animate-pulse">
       <div className="w-8 h-8 rounded-full bg-[#39FF14]/10 text-[#39FF14] flex items-center justify-center">
         <Bot size={14} />
       </div>
       <div className="text-neutral-300 text-sm font-medium">
          {compressing ? "Optimizing video for AI..." : "Gemini is watching..."}
       </div>
     </div>

     {/* PROGRESS BAR - Only show if compressing */}
     {compressing && (
       <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2 overflow-hidden">
         <div 
           className="bg-[#39FF14] h-full transition-all duration-300 ease-out" 
           style={{ width: `${progress}%` }}
         ></div>
       </div>
     )}
   </div>
)}
             </div>

              
             {/* Input Area */}
             <div className="p-4 border-t border-white/10 bg-black/40">
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                   placeholder="Ask something..."
                   disabled={loading || compressing} // Disable input while processing
                   className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#39FF14] focus:outline-none text-white disabled:opacity-50"
                 />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

