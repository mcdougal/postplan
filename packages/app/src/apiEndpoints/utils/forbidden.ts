import { NextResponse } from 'next/server';

import { ForbiddenResponseBody } from '../types';

export default (): NextResponse<ForbiddenResponseBody> => {
  return NextResponse.json(
    {
      message: `Forbidden`,
    },
    {
      status: 403,
    }
  );
};
