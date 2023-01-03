import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserEntity } from '../../../entity';
import { InMemoryUserRepository } from '../../../repository';

export const v1GetProfile: express.Handler = async (req, res) => {
  const userId = (req as any).user?.id;
  console.log('userId =', userId);
  return res.status(StatusCodes.OK).json({
    data: new UserEntity(InMemoryUserRepository.store[userId]).toDto(),
  });
};
