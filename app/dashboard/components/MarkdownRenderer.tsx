import React from 'react';

interface Props {
  content: string;
  onTimestampClick: (seconds: number) => void;
}

export default function MarkdownRenderer({ content, onTimestampClick }: Props) {
  // Regex to find timestamps like 00:00, 1:00:00, or 5:30
  const timestampRegex = /(\d{1,2}:\d{2}(?::\d{2})?)/g;

  // Split content by timestamps
  const parts = content.split(timestampRegex);

  const parseSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  return (
    <div className="whitespace-pre-wrap leading-relaxed text-neutral-200">
      {parts.map((part, i) => {
        if (timestampRegex.test(part)) {
          return (
            <button
              key={i}
              onClick={() => onTimestampClick(parseSeconds(part))}
              className="text-[#39FF14] hover:underline font-bold bg-[#39FF14]/10 px-1 rounded cursor-pointer transition-colors hover:bg-[#39FF14]/20"
            >
              {part}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}