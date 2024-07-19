import { NextResponse } from 'next/server';

import { BadRequestResponseBody } from '../types';

export default (): NextResponse<BadRequestResponseBody> => {
  return NextResponse.json(
    {
      message: `Bad Request`,
    },
    {
      status: 400,
    }
  );
};
