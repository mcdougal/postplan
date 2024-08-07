import { NextRequest, NextResponse } from 'next/server';

export type BadRequestResponseBody = {
  message: 'Bad Request';
};

export type NotFoundResponseBody = {
  message: 'Not Found';
};

export type ForbiddenResponseBody = {
  message: 'Forbidden';
};

export type UnauthorizedResponseBody = {
  message: 'Unauthorized';
};

export type GetHandlerJson<Params, ResponseBody> = (
  request: NextRequest,
  params: { params: Params }
) => Promise<
  NextResponse<
    | ResponseBody
    | BadRequestResponseBody
    | ForbiddenResponseBody
    | NotFoundResponseBody
    | UnauthorizedResponseBody
  >
>;
