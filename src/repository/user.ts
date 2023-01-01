import { uuid } from 'uuidv4';
import { UserEntity } from '../entity';

export interface UserRepositoryInterface {
  genUserId: () => Promise<string>;
  isUserIdExist: (id: string) => Promise<boolean>;
  isEmailExist: (email: string) => Promise<boolean>;
  registerUser: (userEntity: UserEntity) => Promise<void>;
}

export class InMemoryUserRepository implements UserRepositoryInterface {
  static store: { [key: string]: UserEntity } = {};

  // eslint-disable-next-line class-methods-use-this
  async genUserId(): Promise<string> {
    // const id = InMemoryUserRepository.autoIncrement;
    // InMemoryUserRepository.autoIncrement += 1;
    // return id;
    return uuid();
  }

  // eslint-disable-next-line class-methods-use-this
  async isUserIdExist(id: string) {
    return Object.keys(InMemoryUserRepository.store).some(key => key === id);
  }

  // eslint-disable-next-line class-methods-use-this
  async isEmailExist(email: string): Promise<boolean> {
    return Object.values(InMemoryUserRepository.store).some(
      e => e.email === email,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async registerUser(userEntity: UserEntity): Promise<void> {
    InMemoryUserRepository.store[userEntity.id] = userEntity;
  }
}
