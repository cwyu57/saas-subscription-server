import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { errorCodes } from '../../../const';
import { ResponseError, UserDto, UserEntity } from '../../domain/entity';
import { UserRepositoryInterface } from '../../domain/repository';
import SaasSubscriptionModels from '../../../models';

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

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.store.User.findOne({
      include: [
        {
          model: this.store.Plan,
          as: 'plans',
          include: [
            {
              model: this.store.Service,
              as: 'services',
            },
          ],
        },
      ],
      where: { email },
    });
    if (!user) {
      throw new ResponseError(
        errorCodes.USER_NOT_EXIST,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
      );
    }

    return new UserEntity(user);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.store.User.findOne({
      include: [
        {
          model: this.store.Plan,
          as: 'plans',
          include: [
            {
              model: this.store.Service,
              as: 'services',
            },
          ],
        },
      ],
      where: { id },
    });
    if (!user) {
      throw new ResponseError(
        errorCodes.USER_NOT_EXIST,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
      );
    }

    return new UserEntity(user);
  }

  async getUserDto(id: string): Promise<UserDto> {
    const user = await this.store.User.findOne({
      where: { id },
      include: [
        {
          model: this.store.Plan,
          as: 'plans',
          include: [
            {
              model: this.store.Service,
              as: 'services',
            },
          ],
        },
      ],
    });

    console.log(JSON.stringify(user?.toJSON(), null, 2));

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
