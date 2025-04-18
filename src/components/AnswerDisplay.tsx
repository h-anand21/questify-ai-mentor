
import React, { useEffect, useRef } from 'react';
import { BrainIcon } from './icons';

interface AnswerDisplayProps {
  answer: string;
  isLoading: boolean;
}

const AnswerDisplay = ({ answer, isLoading }: AnswerDisplayProps) => {
  const responseRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of response when answer changes
  useEffect(() => {
    if (responseRef.current && answer) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [answer]);

  // Format text with markdown-like syntax
  const formatText = (text: string) => {
    // Split by newlines and map each line
    return text.split('\n').map((line, index) => {
      // Simple code block detection (starts with 4 spaces or tab)
      if (line.match(/^(\s{4}|\t)/)) {
        return (
          <pre key={index} className="bg-gray-800 p-2 rounded-md my-2 overflow-x-auto">
            <code>{line.replace(/^(\s{4}|\t)/, '')}</code>
          </pre>
        );
      }
      // Bold text
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic text
      const formattedLine = boldLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return (
        <p 
          key={index} 
          className="mb-4" 
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
      {!answer && !isLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <BrainIcon className="w-16 h-16 text-teal-500 mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-200">How can I help you today?</h2>
          <p className="text-gray-400 max-w-md">
            Ask questions using voice or text, or upload an image to analyze.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center h-full pt-20">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Thinking...</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto" ref={responseRef}>
          <div className="flex items-start mb-4">
            <div className="bg-teal-600 rounded-full p-2 mr-3 flex-shrink-0">
              <BrainIcon className="w-5 h-5" />
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-200 leading-relaxed">
                {formatText(answer)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
