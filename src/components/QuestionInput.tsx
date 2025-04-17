
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');
  const [examples] = useState([
    "Explain quantum computing in simple terms",
    "How do I write a for loop in Python?",
    "What's the difference between UX and UI design?",
    "What is the Pythagorean theorem?",
    "How to develop critical thinking skills?",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full min-h-[120px] p-4 rounded-lg bg-[#40414f] border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-white placeholder-gray-400 resize-none"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="absolute bottom-3 right-3 p-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading || !question.trim()}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-gray-400">
          <p>Try these examples:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setQuestion(example)}
                className="text-xs px-3 py-1.5 bg-[#40414f] hover:bg-[#4a4b57] rounded-full transition-colors"
                disabled={isLoading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionInput;
