import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import type { RepurposedContent, YoutubeShortScript } from './types';
import { generateRepurposedContent, generateYoutubeShortScript } from './services/geminiService';

export default function App() {
  const [longFormContent, setLongFormContent] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  
  const [repurposedContent, setRepurposedContent] = useState<RepurposedContent | null>(null);
  const [youtubeShort, setYoutubeShort] = useState<YoutubeShortScript | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRepurpose = useCallback(async (inputType: 'text' | 'youtube') => {
    if (inputType === 'text' && !longFormContent.trim()) {
      setError('Please enter some content to repurpose.');
      return;
    }
    if (inputType === 'youtube' && !transcript.trim()) {
      setError('Please paste the video transcript to generate a Short.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRepurposedContent(null);
    setYoutubeShort(null);

    try {
      if (inputType === 'text') {
        const result = await generateRepurposedContent(longFormContent);
        setRepurposedContent(result);
      } else {
        const result = await generateYoutubeShortScript(transcript);
        setYoutubeShort(result);
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating content. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [longFormContent, transcript]);
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <InputForm 
            longFormContent={longFormContent}
            setLongFormContent={setLongFormContent}
            transcript={transcript}
            setTranscript={setTranscript}
            onSubmit={handleRepurpose}
            isLoading={isLoading}
          />
          <OutputDisplay
            repurposedContent={repurposedContent}
            youtubeShort={youtubeShort}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
       <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>Powered by AI. Built for modern content creators.</p>
      </footer>
    </div>
  );
}
