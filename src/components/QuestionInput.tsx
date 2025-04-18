
import React, { useState, useRef } from 'react';
import { SendIcon, MicrophoneIcon, ImageIcon } from './icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { toast } from "sonner";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isRecording, startRecording, stopRecording } = useVoiceInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      const recognition = startRecording();
      if (recognition) {
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setQuestion(current => current + ' ' + transcript);
          stopRecording();
        };
        
        recognition.onerror = () => {
          stopRecording();
          toast.error('Error recording voice input');
        };
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          // For now, just add the image name to the question
          setQuestion(current => 
            current + ` [Uploaded image: ${file.name}] `
          );
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  return (
    <div className="w-full bg-[#343541] px-4">
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto flex items-center space-x-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleVoiceInput}
          className={`text-gray-400 hover:text-gray-200 transition-all duration-200 ${
            isRecording ? 'animate-pulse bg-red-500/10 text-red-500' : ''
          }`}
        >
          <MicrophoneIcon className="w-5 h-5" />
        </Button>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-gray-200 transition-all duration-200 hover:scale-105"
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
        
        <Textarea
          className="flex-1 min-h-[60px] p-4 pr-16 rounded-lg bg-[#40414f] border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-white placeholder-gray-400 resize-none transition-all duration-200"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          variant="default"
          size="icon"
          className={`bg-teal-500 text-white hover:bg-teal-600 transition-all duration-200 ${
            question.trim() ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
          }`}
          disabled={isLoading || !question.trim()}
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default QuestionInput;
