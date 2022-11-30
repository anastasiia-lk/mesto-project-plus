import { DUPLICATE_ERROR } from '../constants';

export default class Duplicate extends Error {
  public statusCode: typeof DUPLICATE_ERROR;

  constructor(message: string) {
    super(message);
    this.statusCode = DUPLICATE_ERROR;
  }
}
