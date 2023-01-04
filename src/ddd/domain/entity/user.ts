export type UserDto = {
  id: string;
  name: string;
  email: string;
};

export type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
};

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

  constructor(params: UserRegisterInput & { id: string }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
  }

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
