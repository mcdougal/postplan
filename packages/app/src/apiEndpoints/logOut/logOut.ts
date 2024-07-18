import { LogInRoute } from '@/common/routes';
import { logOut } from '@/server/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
  await logOut(cookies());

  revalidatePath(`/`, `layout`);

  return NextResponse.redirect(LogInRoute.getAbsoluteUrl({}));
};
