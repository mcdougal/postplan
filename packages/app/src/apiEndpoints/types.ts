import { NextRequest, NextResponse } from 'next/server';

export type UnauthorizedResponseBody = {
  message: 'Unauthorized';
};

export type ForbiddenResponseBody = {
  message: 'Forbidden';
};

export type GetHandlerJson<Params, ResponseBody> = (
  request: NextRequest,
  params: { params: Params }
) => Promise<
  NextResponse<ResponseBody | UnauthorizedResponseBody | ForbiddenResponseBody>
>;
