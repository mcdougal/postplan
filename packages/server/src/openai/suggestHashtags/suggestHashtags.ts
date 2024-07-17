import { sendOpenAiRequest } from '../utils';

export default async (caption: string): Promise<Array<string>> => {
  const result = await sendOpenAiRequest(
    `Suggest 15 hashtags for the following Instagram caption. Separate hashtags with commas. Do not repeat existing hashtags.\n\n${caption}`
  );

  return result
    ? result.split(`,`).map((hashtag) => {
        return hashtag.trim();
      })
    : [];
};
