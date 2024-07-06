import {
  FileUploadUrlRouteParams,
  FileUploadUrlRouteResponse,
} from '@/common/routes';
import { generateFileUploadUrl } from '@/server/userFiles';
import { NextResponse } from 'next/server';

import { GetHandlerJson } from '../types';
import { withAuth } from '../utils';

type GetHandler = GetHandlerJson<
  FileUploadUrlRouteParams,
  FileUploadUrlRouteResponse
>;

export const GET: GetHandler = async (request, { params }) => {
  const { fileName, userId } = params;

  return withAuth(async (currentUser) => {
    const fileUploadUrl = await generateFileUploadUrl({
      auth: { currentUserId: currentUser.id },
      data: { fileName, userId },
    });

    return NextResponse.json({ fileUploadUrl });
  });
};
