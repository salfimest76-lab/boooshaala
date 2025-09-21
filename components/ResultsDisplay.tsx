
import React from 'react';
import { PinterestContent } from '../types';
import InfoCard from './InfoCard';

interface ResultsDisplayProps {
  content: PinterestContent;
  videoUrl: string;
  videoType: string;
  onReset: () => void;
}

const PinterestBestPractices: React.FC = () => (
  <div className="bg-stone-100 p-6 rounded-xl border border-stone-200">
    <h3 className="text-lg font-bold text-stone-800 mb-3">Pinterest Best Practices</h3>
    <ul className="space-y-2 text-stone-600">
      <li className="flex items-center"><span className="text-red-500 mr-2">✓</span><strong>Aspect Ratio:</strong> 9:16 (Vertical) recommended</li>
      <li className="flex items-center"><span className="text-red-500 mr-2">✓</span><strong>Resolution:</strong> 1080x1920 pixels</li>
      <li className="flex items-center"><span className="text-red-500 mr-2">✓</span><strong>Format:</strong> .MP4 or .MOV</li>
      <li className="flex items-center"><span className="text-red-500 mr-2">✓</span><strong>Length:</strong> 4 seconds to 15 minutes</li>
    </ul>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ content, videoUrl, videoType, onReset }) => {
  return (
    <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Video & Best Practices */}
        <div className="flex flex-col gap-6">
          <div className="aspect-w-9 aspect-h-16 bg-stone-200 rounded-xl overflow-hidden shadow-md">
            <video controls className="w-full h-full object-contain">
              <source src={videoUrl} type={videoType} />
              Your browser does not support the video tag.
            </video>
          </div>
          <PinterestBestPractices />
        </div>

        {/* Right Column: AI Content */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-stone-800 border-b pb-2">AI-Generated Content</h2>
          <InfoCard title="Catchy Title" content={content.title} />
          <InfoCard title="Engaging Description" content={content.description} />
          <InfoCard title="Relevant Hashtags" content={content.hashtags.join(' ')} isHashtagList={true} />
           <button
            onClick={onReset}
            className="w-full mt-4 px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Enhance Another Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
