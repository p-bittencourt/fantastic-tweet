import {
  GenerationConfig,
  HarmBlockThreshold,
  HarmCategory,
  SafetyRating,
  SafetySetting,
} from '@google/generative-ai';

// Commented out because aren't these already the standard configs?
export const GENERATION_CONFIG: GenerationConfig = {
  // maxOutputTokens: 1024,
  // temperature: 1,
  // topK: 32,
  // topP: 1,
};

export const SAFETY_SETTINGS: SafetySetting[] = [
  // {
  //   category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  // },
  // {
  //   category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  // },
  // {
  //   category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //   threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  // },
];
