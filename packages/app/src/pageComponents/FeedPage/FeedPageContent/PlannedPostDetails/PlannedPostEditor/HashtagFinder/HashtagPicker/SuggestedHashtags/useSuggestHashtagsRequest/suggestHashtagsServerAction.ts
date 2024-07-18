'use server';

import { suggestHashtags } from '@/server/openai';

type Args = {
  data: {
    caption: string;
  };
};

type Response =
  | { status: `error`; message: string }
  | { status: `success`; suggestedHashtags: Array<string> };

export default async (args: Args): Promise<Response> => {
  const { caption } = args.data;

  try {
    const suggestedHashtags = await suggestHashtags(caption);

    return {
      status: `success`,
      suggestedHashtags,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      status: `error`,
      message: `Error suggesting hashtags`,
    };
  }
};
