import { UserDto } from '../entity';
import { UserRepositoryInterface } from '../repository/user';

export class UserProfileUseCase {
  userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async exec(id: string): Promise<UserDto> {
    return this.userRepository.getUserDto(id);
  }
}
