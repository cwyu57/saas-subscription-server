import express from 'express';
import { StatusCodes } from 'http-status-codes';

export const v1PostSuspend: express.Handler = async (req, res) => {
  const userId = (req as any).user?.id;
  const { subscriptionId } = req.body;

  return res.status(StatusCodes.OK).json({
    data: 'not implement yet',
  });
};
