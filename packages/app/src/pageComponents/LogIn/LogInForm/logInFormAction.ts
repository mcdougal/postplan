'use server';

import { logIn } from '@/domain/auth/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const FormDataSchema = z.object({
  email: z
    .string({ message: `Email address is required` })
    .email({ message: `Provide a valid email address` }),
  password: z.string({ message: `Password is required` }),
});

type Response = { status: `error`; message: string } | { status: `success` };

export default async (formData: FormData): Promise<Response> => {
  const parsed = FormDataSchema.safeParse({
    email: formData.get(`email`),
    password: formData.get(`password`),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: `error`,
      message: (errors.email && errors.email[0]) || `An error occurred`,
    };
  }

  const { email, password } = parsed.data;

  const logInResult = await logIn(email, password, cookies());

  if (logInResult.status === `error`) {
    return { status: `error`, message: `Invalid email or password` };
  }

  revalidatePath(`/`, `layout`);

  return { status: `success` };
};
