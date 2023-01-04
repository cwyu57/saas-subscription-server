import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { errorCodes } from '../../../const';
import {
  ResponseError,
  UserEntity,
  UserRegisterInput,
  UserRegisterOutput,
} from '../../domain/entity';
import { UserRepositoryInterface } from '../../domain/repository/user';
import { HashServiceInterface } from '../../domain/service/hash';
import { JwtService } from '../../infrastructure/service/jwt';

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

  async exec(input: UserRegisterInput): Promise<UserRegisterOutput> {
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

    return {
      user: userEntity.toDto(),
      accessToken: JwtService.generateAccessToken({ id: userEntity.id }),
      refreshToken: JwtService.generateRefreshToken({ id: userEntity.id }),
    };
  }
}
