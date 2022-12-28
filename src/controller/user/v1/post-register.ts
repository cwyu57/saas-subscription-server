import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserRegisterInput } from '../../../entity';
import { UserRepository } from '../../../repository';
import { UserRegisterUseCase } from '../../../usecase';

export const v1PostRegister: express.Handler = async (req, res) => {
  const input: UserRegisterInput = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  };
  const userRepository = new UserRepository();
  const userRegisterUseCase = new UserRegisterUseCase(userRepository);
  const userEntity = await userRegisterUseCase.exec(input);
  const userDto = userEntity.toDto();

  res.status(StatusCodes.OK).json({
    data: userDto,
  });
};
