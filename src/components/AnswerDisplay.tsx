
import React from 'react';
import { BrainIcon } from './icons';

interface AnswerDisplayProps {
  answer: string;
  isLoading: boolean;
}

const AnswerDisplay = ({ answer, isLoading }: AnswerDisplayProps) => {
  return (
    <div className="input-container h-full">
      <div className="flex items-center gap-2 mb-4">
        <BrainIcon />
        <h2 className="text-xl font-semibold">AI Response</h2>
      </div>
      <div className="bg-secondary/40 p-6 rounded-md min-h-[300px] relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Thinking...</p>
          </div>
        ) : (
          <>
            {!answer && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BrainIcon />
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI Assistant Ready</h3>
                  <p className="text-muted-foreground">
                    Ask a question to get started. Your answer will appear here.
                  </p>
                </div>
              </div>
            )}
            {answer && (
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{answer}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerDisplay;
