
import React, { useState } from 'react';
import { SendIcon, Mic, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput = ({ onSubmit, isLoading }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      recorder.addEventListener('dataavailable', (event) => {
        setAudioChunks(prev => [...prev, event.data]);
      });

      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // Here you would typically send the audioBlob to your server
        setRecordingStatus('Processing audio...');
        // For now, we'll just show a message
        setRecordingStatus('Voice recording feature coming soon!');
        setIsRecording(false);
      });

      recorder.start();
      setIsRecording(true);
      setRecordingStatus('Recording... Speak clearly');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setRecordingStatus('Error accessing microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setAudioChunks([]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically handle the image upload
      // For now, we'll just show a message
      setQuestion(prev => prev + "\n[Image upload feature coming soon!]");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            className="w-full min-h-[120px] p-4 pr-20 rounded-lg bg-[#40414f] border border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-white placeholder-gray-400 resize-none"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageUpload}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => document.getElementById('image-upload')?.click()}
              disabled={isLoading}
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'text-red-500' : ''}`} />
            </Button>
            <Button
              type="submit"
              variant="default"
              size="icon"
              className="bg-teal-500 text-white hover:bg-teal-600"
              disabled={isLoading || !question.trim()}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <SendIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        {recordingStatus && (
          <p className="text-sm text-gray-400">{recordingStatus}</p>
        )}
      </form>
    </div>
  );
};

export default QuestionInput;
