import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { mySqlUserRepository } from '../../../container';
import { UserProfileUseCase } from '../../../usecase';

export const v1GetProfile: express.Handler = async (req, res) => {
  const userId = (req as any).user?.id;
  console.log('userId =', userId);

  const userProfileUseCase = new UserProfileUseCase(mySqlUserRepository);
  const userDto = await userProfileUseCase.exec(userId);

  return res.status(StatusCodes.OK).json({
    data: userDto,
  });
};
