
import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface InfoCardProps {
  title: string;
  content: string;
  isHashtagList?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, isHashtagList = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 relative">
      <h3 className="text-md font-bold text-stone-700 mb-2">{title}</h3>
      {isHashtagList ? (
         <div className="flex flex-wrap gap-2">
            {content.split(' ').map((tag, index) => (
                <span key={index} className="bg-stone-200 text-stone-700 px-2 py-1 rounded-md text-sm font-medium">
                    {tag}
                </span>
            ))}
         </div>
      ) : (
        <p className="text-stone-600 whitespace-pre-wrap">{content}</p>
      )}
      
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/50 hover:bg-stone-200 transition-colors duration-200"
        aria-label="Copy to clipboard"
      >
        {copied ? <CheckIcon className="w-5 h-5 text-green-600" /> : <ClipboardIcon className="w-5 h-5 text-stone-500" />}
      </button>
    </div>
  );
};

export default InfoCard;
