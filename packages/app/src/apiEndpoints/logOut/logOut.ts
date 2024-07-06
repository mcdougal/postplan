import { logOut } from '@/domain/auth/server';
import { LogInRoute } from '@/domain/routes/common';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  await logOut(cookies());

  revalidatePath(`/`, `layout`);

  return NextResponse.redirect(new URL(LogInRoute.getPath({}), request.url));
};
