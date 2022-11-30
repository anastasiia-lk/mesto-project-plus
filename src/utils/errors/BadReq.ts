import { INVALID_DATA_ERROR } from '../constants';

export default class BadReq extends Error {
  public statusCode: typeof INVALID_DATA_ERROR;

  constructor(message: string) {
    super(message);
    this.statusCode = INVALID_DATA_ERROR;
  }
}
