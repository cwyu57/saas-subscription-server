import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { errorCodes } from '../const';
import { ResponseError, UserEntity, UserRegisterInput } from '../entity';
import { UserRepositoryInterface } from '../repository/user';
import { HashServiceInterface } from '../service/hash';

export class UserRegisterUseCase {
  hashService: HashServiceInterface;

  userRepository: UserRepositoryInterface;

  constructor(
    hashService: HashServiceInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.hashService = hashService;
    this.userRepository = userRepository;
  }

  async exec(input: UserRegisterInput): Promise<UserEntity> {
    if (await this.userRepository.isEmailExist(input.email)) {
      throw new ResponseError(
        errorCodes.EXISTING_EMAIL,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
      );
    }

    const userEntity = new UserEntity({
      ...input,
      id: await this.userRepository.genUserId(),
      password: await this.hashService.hash(input.password),
    });

    await this.userRepository.registerUser(userEntity);
    return userEntity;
  }
}
