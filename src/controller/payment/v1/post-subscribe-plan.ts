import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { SubscribePlansUseCase } from '../../../ddd/application/usecase';
import {
  mySqlCatalogRepository,
  mySqlPaymentRepository,
} from '../../../container';
import { tapPayPaymentService } from '../../../loader';

export const v1PostSubscribe: express.Handler = async (req, res) => {
  const userId = (req as any).user?.id;

  const subscribePlanUseCase = new SubscribePlansUseCase(
    mySqlCatalogRepository,
    mySqlPaymentRepository,
    tapPayPaymentService,
  );

  await subscribePlanUseCase.exec({
    cardholder: req.body.cardholder,
    planId: req.body.planId,
    prime: req.body.prime,
    userId,
  });
  return res.status(StatusCodes.OK).json({
    data: '',
  });
};
