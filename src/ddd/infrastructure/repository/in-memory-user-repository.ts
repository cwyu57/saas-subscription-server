import { v4 as uuidv4 } from 'uuid';
import {} from '../../../const';
import { UserDto, UserEntity } from '../../domain/entity';
import { UserRepositoryInterface } from '../../domain/repository';

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
