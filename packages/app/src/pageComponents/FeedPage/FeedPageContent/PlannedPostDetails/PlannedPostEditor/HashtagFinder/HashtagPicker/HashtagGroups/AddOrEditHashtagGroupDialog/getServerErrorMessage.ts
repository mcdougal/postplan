import { AddOrEditDialogAction } from './types';

export default (
  createRequestError: string | null,
  updateRequestError: string | null,
  action: AddOrEditDialogAction
): string | null => {
  if (action.status === `add`) {
    return createRequestError;
  }

  if (action.status === `edit`) {
    return updateRequestError;
  }

  const exhaustiveCheck: never = action;
  return exhaustiveCheck;
};
