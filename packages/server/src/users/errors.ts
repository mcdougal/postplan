export class UserExistsError extends Error {
  constructor() {
    super(`UserExistsError`);
    this.name = `UserExistsError`;
  }
}
