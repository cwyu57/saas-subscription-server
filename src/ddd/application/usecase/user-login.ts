import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { errorCodes } from '../../../const';
import {
  ResponseError,
  UserLoginInput,
  UserRegisterOutput,
} from '../../domain/entity';
import { UserRepositoryInterface } from '../../domain/repository/user';
import { HashServiceInterface } from '../../domain/service/hash';
import { JwtService } from '../../infrastructure/service/jwt';

export class UserLoginUseCase {
  hashService: HashServiceInterface;

  userRepository: UserRepositoryInterface;

  constructor(
    hashService: HashServiceInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.hashService = hashService;
    this.userRepository = userRepository;
  }

  async exec(input: UserLoginInput): Promise<UserRegisterOutput> {
    if (!(await this.userRepository.isEmailExist(input.email))) {
      throw new ResponseError(
        errorCodes.USER_NOT_EXIST,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
      );
    }

    const userEntity = await this.userRepository.getUserByEmail(input.email);

    const passwordPassed = await this.hashService.compare(
      input.password,
      userEntity.password,
    );

    if (!passwordPassed) {
      throw new ResponseError(
        errorCodes.WRONG_PASSWORD,
        StatusCodes.FORBIDDEN,
        ReasonPhrases.FORBIDDEN,
      );
    }

    return {
      user: userEntity.toDto(),
      accessToken: JwtService.generateAccessToken({ id: userEntity.id }),
      refreshToken: JwtService.generateRefreshToken({ id: userEntity.id }),
    };
  }
}
