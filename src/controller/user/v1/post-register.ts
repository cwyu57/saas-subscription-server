import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserRegisterInput } from '../../../entity';
import { InMemoryUserRepository } from '../../../repository';
import { BcryptHashService } from '../../../service/hash';
import { UserRegisterUseCase } from '../../../usecase';

export const v1PostRegister: express.Handler = async (req, res) => {
  const input: UserRegisterInput = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  };
  const userRepository = new InMemoryUserRepository();
  const bcryptHashService = new BcryptHashService();

  const userRegisterUseCase = new UserRegisterUseCase(
    bcryptHashService,
    userRepository,
  );
  const userRegisterOutput = await userRegisterUseCase.exec(input);

  res.status(StatusCodes.OK).json({
    data: userRegisterOutput,
  });
};
