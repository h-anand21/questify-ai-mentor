
import React from 'react';
import { BrainIcon } from './icons';

const Header = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-md">
          <BrainIcon />
        </div>
        <h1 className="text-3xl font-bold text-primary">Questify</h1>
      </div>
      <p className="text-muted-foreground mt-2">Your personal AI learning assistant</p>
    </header>
  );
};

export default Header;
