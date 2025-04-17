
import React from 'react';
import { BrainIcon } from './icons';

interface AnswerDisplayProps {
  answer: string;
  isLoading: boolean;
}

const AnswerDisplay = ({ answer, isLoading }: AnswerDisplayProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Thinking...</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto py-6">
          {answer && (
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 whitespace-pre-line leading-relaxed">{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
