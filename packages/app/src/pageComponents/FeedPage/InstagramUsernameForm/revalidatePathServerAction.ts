'use server';

import { revalidatePath } from 'next/cache';

export default async (): Promise<void> => {
  revalidatePath(`/`, `layout`);
};
