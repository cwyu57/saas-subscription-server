import { UserDto, UserEntity } from '../entity';

export interface UserRepositoryInterface {
  genUserId: () => Promise<string>;
  isUserIdExist: (id: string) => Promise<boolean>;
  isEmailExist: (email: string) => Promise<boolean>;
  registerUser: (userEntity: UserEntity) => Promise<void>;
  getUserByEmail: (email: string) => Promise<UserEntity>;
  getUserById: (id: string) => Promise<UserEntity>;
  getUserDto: (id: string) => Promise<UserDto>;
}
