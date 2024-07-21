'use server';

import { logIn } from '@/server/auth';
import { signUpUser, userExists } from '@/server/users';
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
      message:
        (errors.email && errors.email[0]) ||
        (errors.password && errors.password[0]) ||
        `An error occurred`,
    };
  }

  const { email, password } = parsed.data;
  const isExistingUser = await userExists({ where: { email } });

  if (isExistingUser) {
    const logInResult = await logIn(email, password, cookies());

    if (logInResult.status === `error`) {
      return { status: `error`, message: `Invalid email or password` };
    }
  } else {
    await signUpUser(email, password, cookies());
  }

  revalidatePath(`/`, `layout`);

  return { status: `success` };
};
