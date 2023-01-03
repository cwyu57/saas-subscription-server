import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserRegisterInput } from '../../../entity';
import { bcryptHashService, mySqlUserRepository } from '../../../container';
import { UserRegisterUseCase } from '../../../usecase';

export const v1PostRegister: express.Handler = async (req, res) => {
  const input: UserRegisterInput = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  };

  const userRegisterUseCase = new UserRegisterUseCase(
    bcryptHashService,
    mySqlUserRepository,
  );
  const userRegisterOutput = await userRegisterUseCase.exec(input);

  res.status(StatusCodes.OK).json({
    data: userRegisterOutput,
  });
};
