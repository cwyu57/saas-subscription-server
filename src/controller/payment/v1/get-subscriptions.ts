import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetSubscriptionsUseCase } from '../../../ddd/application/usecase';
import { mySqlPaymentRepository } from '../../../container';

export const v1GetSubscriptions: express.Handler = async (req, res) => {
  const userId = (req as any).user?.id;

  const getSubscriptionsUseCase = new GetSubscriptionsUseCase(
    mySqlPaymentRepository,
  );

  const subscriptions = await getSubscriptionsUseCase.exec({ userId });
  return res.status(StatusCodes.OK).json({
    data: subscriptions,
  });
};
