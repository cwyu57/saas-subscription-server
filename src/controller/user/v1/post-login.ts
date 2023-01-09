import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserLoginInput } from '../../../ddd/domain/entity';
import { bcryptHashService, mySqlUserRepository } from '../../../container';
import { UserLoginUseCase } from '../../../ddd/application/usecase';

export const v1PostLogin: express.Handler = async (req, res) => {
  const input: UserLoginInput = {
    email: req.body.email,
    password: req.body.password,
  };

  const userLoginUseCase = new UserLoginUseCase(
    bcryptHashService,
    mySqlUserRepository,
  );
  const userLoginOutput = await userLoginUseCase.exec(input);

  res.status(StatusCodes.OK).json({
    data: userLoginOutput,
  });
};
