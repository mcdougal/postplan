'use server';

import { signUpUser, UserExistsError } from '@/domain/users/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const FormDataSchema = z.object({
  email: z
    .string({ message: `Email address is required` })
    .email({ message: `Provide a valid email address` }),
  password: z
    .string({ message: `Password is required` })
    .min(8, { message: `Password must be at least 8 characters` }),
});

type Response =
  | { status: `error`; message: string }
  | { status: `success`; data: { email: string } };

export default async (formData: FormData): Promise<Response> => {
  const parsed = FormDataSchema.safeParse({
    email: formData.get(`email`),
    password: formData.get(`password`),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: `error`,
      message:
        (errors.email && errors.email[0]) ||
        (errors.password && errors.password[0]) ||
        `An error occurred`,
    };
  }

  const { email, password } = parsed.data;

  try {
    await signUpUser(email, password, cookies());
  } catch (err) {
    if (err instanceof UserExistsError) {
      return {
        status: `error`,
        message: `An account with that email address already exists`,
      };
    }
    throw err;
  }

  revalidatePath(`/`, `layout`);

  return { status: `success`, data: { email } };
};
