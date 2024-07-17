import { getRequiredEnvVar } from '@/common/env';
import { OpenAI } from 'openai';

let globalOpenAi: OpenAI | null = null;

const getOpenAi = (): OpenAI => {
  if (!globalOpenAi) {
    globalOpenAi = new OpenAI({
      apiKey: getRequiredEnvVar(`OPENAI_API_KEY`),
      project: getRequiredEnvVar(`OPENAI_PROJECT_ID`),
    });
  }

  return globalOpenAi;
};

export default async (prompt: string): Promise<string | null> => {
  const openai = getOpenAi();

  const completion = await openai.chat.completions.create({
    messages: [{ role: `user`, content: prompt }],
    model: `gpt-4o`,
  });

  return completion.choices[0].message.content;
};
