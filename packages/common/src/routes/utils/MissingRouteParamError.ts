import { Router } from './makeRoute';

export default class MissingRouteParamError extends Error {
  router: Router;

  constructor(router: Router, missingParam: string) {
    super(`Missing param in route: ${missingParam}`);
    this.name = `MissingRouteParamError`;
    this.router = router;
  }
}
