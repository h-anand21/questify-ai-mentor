
import React from 'react';
import { MicrophoneIcon } from './icons';

const VoiceInput = () => {
  // Voice input functionality is commented out as in the original code
  return (
    <div className="input-container mt-6">
      <div className="flex items-center gap-2 mb-4">
        <MicrophoneIcon />
        <h2 className="text-xl font-semibold">Voice Input</h2>
      </div>
      <p className="text-muted-foreground mb-4">Ask questions using your voice</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="primary-button flex-1 flex items-center justify-center gap-2" disabled>
          <span className="h-2 w-2 rounded-full bg-primary-foreground"></span>
          Start Recording
        </button>
        <button className="primary-button flex-1 bg-secondary text-secondary-foreground" disabled>
          Stop Recording
        </button>
      </div>
      <p className="text-sm text-muted-foreground mt-3 italic">
        Voice recording functionality coming soon
      </p>
    </div>
  );
};

export default VoiceInput;
