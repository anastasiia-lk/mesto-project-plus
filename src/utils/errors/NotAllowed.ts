import { NOT_ALLOWED_ERROR } from '../constants';

export default class Forbidden extends Error {
  public statusCode: typeof NOT_ALLOWED_ERROR;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_ALLOWED_ERROR;
  }
}
