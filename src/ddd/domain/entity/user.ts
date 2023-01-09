// import { PlanAttributes } from '../../../models/plan';
import { PlanAttributes, PlanEntity } from './plan';

export interface UserAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

export type UserDto = {
  id: string;
  name: string;
  email: string;
  plans: PlanEntity[];
};

export type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginInput = Omit<UserRegisterInput, 'name'>;

export type UserRegisterOutput = {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
};

export class UserEntity {
  id: string;

  name: string;

  email: string;

  password: string;

  plans: PlanEntity[];

  constructor(
    params: UserRegisterInput & { id: string } & { plans?: PlanAttributes[] },
  ) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.plans = params.plans?.map(e => new PlanEntity(e)) || [];
  }

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      plans: this.plans,
    };
  }
}
