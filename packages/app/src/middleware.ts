import { updateSession } from '@/server/auth';
import { NextResponse, type NextRequest } from 'next/server';

export const middleware = async (
  request: NextRequest
): Promise<NextResponse> => {
  let response = NextResponse.next({ request });

  await updateSession({
    getAll: () => {
      return request.cookies.getAll();
    },
    setAll: (cookiesToSet) => {
      cookiesToSet.forEach(({ name, value }) => {
        request.cookies.set(name, value);
      });
      response = NextResponse.next({
        request,
      });
      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options);
      });
    },
  });

  return response;
};

export const config = {
  matcher: [
    `/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)`,
  ],
};
