
import React, { useState, useEffect, useCallback } from 'react';
import { generatePinterestContent } from './services/geminiService';
import { PinterestContent } from './types';
import VideoUpload from './components/VideoUpload';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';

enum AppState {
  IDLE,
  PROCESSING,
  RESULTS,
  ERROR
}

const App: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [pinterestContent, setPinterestContent] = useState<PinterestContent | null>(null);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Please upload a valid video file.');
      setAppState(AppState.ERROR);
      return;
    }

    setVideoFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    setAppState(AppState.PROCESSING);
    setError(null);
    setPinterestContent(null);

    try {
      const content = await generatePinterestContent(file.name);
      setPinterestContent(content);
      setAppState(AppState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('Failed to generate content. Please check your API key and try again.');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = useCallback(() => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setPinterestContent(null);
    setError(null);
    setAppState(AppState.IDLE);
  }, [videoPreviewUrl]);

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <VideoUpload onFileChange={handleFileChange} />;
      case AppState.PROCESSING:
        return (
          <div className="text-center p-8">
            <LoadingSpinner />
            <p className="text-stone-600 mt-4 text-lg">Enhancing your video for Pinterest...</p>
          </div>
        );
      case AppState.RESULTS:
        if (pinterestContent && videoPreviewUrl) {
          return (
            <ResultsDisplay
              content={pinterestContent}
              videoUrl={videoPreviewUrl}
              videoType={videoFile?.type || 'video/mp4'}
              onReset={handleReset}
            />
          );
        }
        // Fallback to error if content is missing
        setAppState(AppState.ERROR);
        setError("An unexpected error occurred while displaying results.");
        return null;
      case AppState.ERROR:
         return (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
            <p className="text-stone-700 mb-6">{error || 'An unknown error occurred.'}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return <VideoUpload onFileChange={handleFileChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
       <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-800 tracking-tight">
          Pinterest Video <span className="text-red-500">Enhancer</span>
        </h1>
        <p className="text-stone-500 mt-2 text-lg">
          Generate AI-powered titles, descriptions, and tags for your videos.
        </p>
      </header>
      <main className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
