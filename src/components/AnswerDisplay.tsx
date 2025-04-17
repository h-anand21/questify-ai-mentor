
import React from 'react';
import { BrainIcon } from './icons';

interface AnswerDisplayProps {
  answer: string;
  isLoading: boolean;
}

const AnswerDisplay = ({ answer, isLoading }: AnswerDisplayProps) => {
  return (
    <div className="w-full mt-8">
      <div className="rounded-lg bg-[#40414f] p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Thinking...</p>
          </div>
        ) : (
          <>
            {!answer && (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                  <BrainIcon className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">AI Assistant Ready</h3>
                <p className="text-gray-400">
                  Ask a question to get started. Your answer will appear here.
                </p>
              </div>
            )}
            {answer && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 whitespace-pre-line">{answer}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerDisplay;
