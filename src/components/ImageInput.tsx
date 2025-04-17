
import React from 'react';
import { ImageIcon } from './icons';

const ImageInput = () => {
  // Image processing functionality is commented out as in the original code
  return (
    <div className="input-container mt-6">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon />
        <h2 className="text-xl font-semibold">Image Analysis</h2>
      </div>
      <p className="text-muted-foreground mb-4">Upload an image to analyze</p>
      <form>
        <div className="mb-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon />
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
              </div>
              <input id="image-upload" type="file" className="hidden" disabled />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-md border border-input"
            placeholder="Question about the image (optional)"
            disabled
          />
        </div>
        <button className="primary-button w-full" disabled>
          Upload & Process
        </button>
      </form>
      <p className="text-sm text-muted-foreground mt-3 italic">
        Image analysis functionality coming soon
      </p>
    </div>
  );
};

export default ImageInput;
