import express from 'express';
import { GetPlansUseCase } from '../../../ddd/application/usecase';
import { mySqlCatalogRepository } from '../../../container';

export const v1GetPlans: express.Handler = async (req, res) => {
  const getPlansUseCase = new GetPlansUseCase(mySqlCatalogRepository);
  const planEntities = await getPlansUseCase.exec();
  res.status(200).json({ data: planEntities });
};
