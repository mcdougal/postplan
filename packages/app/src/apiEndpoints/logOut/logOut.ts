import { LogInRoute } from '@/common/routes';
import { logOut } from '@/server/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  await logOut(cookies());

  revalidatePath(`/`, `layout`);

  return NextResponse.redirect(new URL(LogInRoute.getPath({}), request.url));
};
