import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { env } from 'config/env.config';

export const GEMINI_MODEL = 'GEMINI_MODEL';

export const GeminiModel: Provider<GenerativeModel> = {
  provide: GEMINI_MODEL,
  useFactory: () => {
    const genAi = new GoogleGenerativeAI(env.GEMINI.KEY);
    const model = genAi.getGenerativeModel({ model: env.GEMINI.MODEL });
    return model;
  },
};
