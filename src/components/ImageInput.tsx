
import React, { useState } from 'react';
import { ImageIcon } from './icons';
import { processImageWithGroq } from '@/utils/groqApi';
import { toast } from 'sonner';

const ImageInput = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processImageWithGroq(file);
      toast.success(`Image processed successfully! File ID: ${result.fileId}`);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
              <input 
                id="image-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isProcessing}
              />
            </label>
          </div>
        </div>
        {isProcessing && (
          <p className="text-sm text-muted-foreground text-center">
            Processing image...
          </p>
        )}
      </form>
    </div>
  );
};

export default ImageInput;
