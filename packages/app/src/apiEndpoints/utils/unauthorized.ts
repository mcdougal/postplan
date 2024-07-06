import { NextResponse } from 'next/server';

import { UnauthorizedResponseBody } from '../types';

export default (): NextResponse<UnauthorizedResponseBody> => {
  return NextResponse.json(
    {
      message: `Unauthorized`,
    },
    {
      status: 401,
    }
  );
};
