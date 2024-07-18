import { LogInRoute } from '@/common/routes';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  console.log(`-----------------------------------------`);
  console.log(request.nextUrl.searchParams.entries());
  console.log(`-----------------------------------------`);

  return NextResponse.redirect(new URL(LogInRoute.getPath({}), request.url));
};
