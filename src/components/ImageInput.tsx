
import React, { useState } from 'react';
import { ImageIcon } from './icons';
import { processImageWithGroq } from '@/utils/groqApi';
import { toast } from 'sonner';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FileImage, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageInput = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processImageWithGroq(selectedFile);
      toast.success('Image processed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="shadow-lg border-0 bg-white rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50 pb-4">
        <div className="flex items-center gap-2">
          <FileImage className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-black">Image Analysis</h2>
        </div>
        <p className="text-black mt-2">Upload a math problem image to solve</p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
          {!previewUrl ? (
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-blue-500 mb-2" />
                    <p className="text-lg font-medium text-black mb-2">Click to upload</p>
                    <p className="text-sm text-gray-500">
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageSelection}
                    disabled={isProcessing}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Selected preview" 
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={resetSelection}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={resetSelection}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-black"
                  disabled={isProcessing}
                >
                  Choose Different Image
                </Button>
                
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process Image'}
                </Button>
              </div>
            </div>
          )}
          
          {isProcessing && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-black font-medium">Processing image...</p>
              <p className="text-sm text-gray-500">This may take a few moments</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ImageInput;
