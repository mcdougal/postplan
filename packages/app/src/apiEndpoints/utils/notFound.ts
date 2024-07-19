import { NextResponse } from 'next/server';

import { NotFoundResponseBody } from '../types';

export default (): NextResponse<NotFoundResponseBody> => {
  return NextResponse.json(
    {
      message: `Not Found`,
    },
    {
      status: 404,
    }
  );
};
