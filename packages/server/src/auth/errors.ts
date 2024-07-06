export class ForbiddenError extends Error {
  constructor() {
    super(`ForbiddenError`);
    this.name = `ForbiddenError`;
  }
}
