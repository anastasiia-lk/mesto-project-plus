import { ERROR_AUTH } from '../constants';

export default class Unathorized extends Error {
  public statusCode: typeof ERROR_AUTH;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_AUTH;
  }
}
