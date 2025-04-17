
import React, { useState, useEffect } from 'react';
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
  const [displayedExamples, setDisplayedExamples] = useState<string[]>([]);

  useEffect(() => {
    // Select 3 random examples to display
    const randomExamples = [...examples]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setDisplayedExamples(randomExamples);
  }, [examples]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  const useExample = (example: string) => {
    setQuestion(example);
  };

  return (
    <div className="input-container">
      <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <textarea
            className="w-full min-h-[120px] p-3 rounded-md border border-input focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="absolute bottom-3 right-3 primary-button p-2 rounded-full transition-all"
            disabled={isLoading || !question.trim()}
          >
            <SendIcon />
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Ask anything! Try:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {displayedExamples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => useExample(example)}
                className="text-xs px-3 py-1.5 bg-secondary/70 hover:bg-secondary text-secondary-foreground rounded-full transition-colors"
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
