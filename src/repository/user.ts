import { UserEntity, UserRegisterInput } from '../entity';

export interface UserRepositoryInterface {
  isUserExist: (email: string) => Promise<boolean>;
  registerUser: (input: UserRegisterInput) => Promise<UserEntity>;
}

export class UserRepository implements UserRepositoryInterface {
  // eslint-disable-next-line class-methods-use-this
  async isUserExist(email: string): Promise<boolean> {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  async registerUser(input: UserRegisterInput): Promise<UserEntity> {
    return new UserEntity(input);
  }
}
