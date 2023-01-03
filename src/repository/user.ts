import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { errorCodes } from '../const';
import { ResponseError, UserDto, UserEntity } from '../entity';
import SaasSubscriptionModels from '../models';

export interface UserRepositoryInterface {
  genUserId: () => Promise<string>;
  isUserIdExist: (id: string) => Promise<boolean>;
  isEmailExist: (email: string) => Promise<boolean>;
  registerUser: (userEntity: UserEntity) => Promise<void>;
  getUserDto: (id: string) => Promise<UserDto>;
}

export class InMemoryUserRepository implements UserRepositoryInterface {
  static store: { [key: string]: UserEntity } = {};

  // eslint-disable-next-line class-methods-use-this
  async genUserId(): Promise<string> {
    // const id = InMemoryUserRepository.autoIncrement;
    // InMemoryUserRepository.autoIncrement += 1;
    // return id;
    return uuidv4();
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

  // eslint-disable-next-line class-methods-use-this
  async getUserDto(id: string): Promise<UserDto> {
    return new UserEntity(InMemoryUserRepository.store[id]).toDto();
  }
}

export class MySqlUserRepository implements UserRepositoryInterface {
  store: SaasSubscriptionModels;

  constructor(models: SaasSubscriptionModels) {
    this.store = models;
  }

  // eslint-disable-next-line class-methods-use-this
  async genUserId(): Promise<string> {
    return uuidv4();
  }

  // eslint-disable-next-line class-methods-use-this
  async isUserIdExist(id: string) {
    const user = await this.store.User.findOne({
      where: { id },
    });
    return !!user;
  }

  // eslint-disable-next-line class-methods-use-this
  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.store.User.findOne({
      where: { email },
    });
    return !!user;
  }

  // eslint-disable-next-line class-methods-use-this
  async registerUser(userEntity: UserEntity): Promise<void> {
    await this.store.User.create({
      ...userEntity,
    });
  }

  async getUserDto(id: string): Promise<UserDto> {
    const user = await this.store.User.findOne({
      where: { id },
    });
    if (!user) {
      throw new ResponseError(
        errorCodes.USER_NOT_EXIST,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
      );
    }

    return new UserEntity(user).toDto();
  }
}
