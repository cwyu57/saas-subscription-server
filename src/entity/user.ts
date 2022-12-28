export type UserRegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type UserDto = {
  name: string;
  email: string;
};

export class UserEntity {
  name: string;

  email: string;

  password: string;

  constructor(params: UserRegisterInput) {
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
  }

  toDto(): UserDto {
    return {
      name: this.name,
      email: this.email,
    };
  }
}
