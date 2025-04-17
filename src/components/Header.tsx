
import React from 'react';
import { BrainIcon } from './icons';

const Header = () => {
  return (
    <header className="mb-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="bg-white/10 p-2 rounded-md">
          <BrainIcon className="text-teal-500 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          AI Tutor
        </h1>
      </div>
      <p className="text-gray-400">Your personal AI learning assistant</p>
    </header>
  );
};

export default Header;
