
import Groq from "groq-sdk";

// Create a new Groq client
// IMPORTANT: In a production environment, you should store this key securely
// and not directly in the code
const groq = new Groq({
  apiKey: "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"
});

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
