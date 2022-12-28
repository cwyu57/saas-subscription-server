import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { errorCodes } from '../const';
import { ResponseError, UserEntity, UserRegisterInput } from '../entity';
import { UserRepositoryInterface } from '../repository/user';

export class UserRegisterUseCase {
  userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async exec(input: UserRegisterInput): Promise<UserEntity> {
    if (await this.userRepository.isUserExist(input.email)) {
      throw new ResponseError(
        errorCodes.EXISTING_EMAIL,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
      );
    }

    // convert password to bcrypt

    const user = await this.userRepository.registerUser(input);
    return user;
  }
}
