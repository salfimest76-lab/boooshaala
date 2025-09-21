
import { GoogleGenAI, Type } from "@google/genai";
import { PinterestContent } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const pinterestContentSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, SEO-friendly title for the Pinterest pin (max 100 characters).",
    },
    description: {
      type: Type.STRING,
      description: "An engaging and detailed description for the pin (max 500 characters), including a call to action.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A relevant hashtag, starting with #",
      },
      description: "A list of 5-10 relevant and trending hashtags.",
    },
  },
  required: ["title", "description", "hashtags"],
};

export async function generatePinterestContent(fileName: string): Promise<PinterestContent> {
  const prompt = `You are a Pinterest marketing expert. Based on the video filename "${fileName}", generate a catchy title, an engaging description, and a list of relevant hashtags for a Pinterest Idea Pin. The tone should be inspiring, creative, and optimized for engagement on the platform. Provide the output in the specified JSON format.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: pinterestContentSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    // Basic validation
    if (
        typeof parsedJson.title === 'string' &&
        typeof parsedJson.description === 'string' &&
        Array.isArray(parsedJson.hashtags)
    ) {
        return parsedJson as PinterestContent;
    } else {
        throw new Error("Received malformed JSON data from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from the AI model.");
  }
}
