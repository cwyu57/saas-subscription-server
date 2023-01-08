import express from 'express';
import { StatusCodes } from 'http-status-codes';

export const v1PostSubscribe: express.Handler = async (req, res) => {
  const userId = (req as any).user?.id;
  return res.status(StatusCodes.OK).json({
    data: '',
  });
};
