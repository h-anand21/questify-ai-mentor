
import React, { useState } from 'react';
import { SendIcon, MicrophoneIcon, ImageIcon } from './icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <div className="w-full bg-[#343541] px-4">
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto flex items-center space-x-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-gray-200" 
          disabled
        >
          <MicrophoneIcon className="w-5 h-5" />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-gray-200" 
          disabled
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
        
        <Textarea
          className="flex-1 min-h-[60px] p-4 pr-16 rounded-lg bg-[#40414f] border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-white placeholder-gray-400 resize-none"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="bg-teal-500 text-white hover:bg-teal-600"
          disabled={isLoading || !question.trim()}
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default QuestionInput;
