import bcrypt from 'bcrypt';

export interface HashServiceInterface {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export class BcryptHashService implements HashServiceInterface {
  static SAULT_ROUNDS = 10;

  // eslint-disable-next-line class-methods-use-this
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, BcryptHashService.SAULT_ROUNDS);
  }

  // eslint-disable-next-line class-methods-use-this
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
