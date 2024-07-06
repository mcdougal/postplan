import { generateFileDownloadUrl } from '@/domain/files';
import {
  FileDownloadUrlRouteParams,
  FileDownloadUrlRouteResponse,
} from '@/domain/routes/common';
import { NextResponse } from 'next/server';

import { GetHandlerJson } from '../types';
import { withAuth } from '../utils';

type GetHandler = GetHandlerJson<
  FileDownloadUrlRouteParams,
  FileDownloadUrlRouteResponse
>;

export const GET: GetHandler = async (request, { params }) => {
  const { fileName, userId } = params;

  return withAuth(async (currentUser) => {
    const fileDownloadUrl = await generateFileDownloadUrl({
      auth: { currentUserId: currentUser.id },
      where: { fileName, userId },
    });

    return NextResponse.json({ fileDownloadUrl });
  });
};
