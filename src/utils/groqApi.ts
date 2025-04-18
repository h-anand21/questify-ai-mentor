import Groq from "groq-sdk";

// Create a new Groq client
// IMPORTANT: In a production environment, you should store this key securely
// and not directly in the code
const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true // Add this option to allow browser usage
});

export const processImageWithGroq = async (imageFile: File) => {
  try {
    // Create a blob from the file
    const blob = new Blob([imageFile]);
    const file = new File([blob], imageFile.name);

    // Upload file to Groq
    const uploadedFile = await groq.files.create({
      file: file,
      purpose: 'batch'
    });

    console.log('File uploaded:', uploadedFile.id);
    return {
      fileId: uploadedFile.id,
      filename: uploadedFile.filename,
      bytes: uploadedFile.bytes,
      createdAt: uploadedFile.created_at
    };
  } catch (error) {
    console.error("Error with Groq API file upload:", error);
    throw new Error("Failed to process image with Groq API");
  }
};

export const getGroqChatCompletion = async (userQuestion: string) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Provide concise, accurate, and helpful responses.",
        },
        {
          role: "user",
          content: userQuestion,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });
    
    return chatCompletion.choices[0]?.message?.content || "I couldn't generate a response. Please try a different question.";
  } catch (error) {
    console.error("Error with Groq API:", error);
    throw new Error("Failed to get response from Groq API");
  }
};
