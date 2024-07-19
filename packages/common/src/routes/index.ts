import FeedRoute from './FeedRoute';
import FileUploadUrlRoute, {
  FileUploadUrlRouteParams,
  FileUploadUrlRouteResponse,
  FileUploadUrlRouteResponseSchema,
} from './FileUploadUrlRoute';
import HomePageRoute from './HomePageRoute';
import InstagramDeauthorizeRoute from './InstagramDeauthorizeRoute';
import InstagramDeleteRoute from './InstagramDeleteRoute';
import InstagramOAuthRoute from './InstagramOAuthRoute';
import JobRoute, { JobRouteParams, JobRouteResponse } from './JobRoute';
import LogInRoute from './LogInRoute';
import LogOutRoute from './LogOutRoute';
import SignUpRoute from './SignUpRoute';

export type {
  FileUploadUrlRouteParams,
  FileUploadUrlRouteResponse,
  JobRouteParams,
  JobRouteResponse,
};

export {
  FeedRoute,
  FileUploadUrlRoute,
  FileUploadUrlRouteResponseSchema,
  HomePageRoute,
  InstagramDeauthorizeRoute,
  InstagramDeleteRoute,
  InstagramOAuthRoute,
  JobRoute,
  LogInRoute,
  LogOutRoute,
  SignUpRoute,
};
