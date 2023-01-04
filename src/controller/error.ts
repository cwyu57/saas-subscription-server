import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ResponseError } from '../ddd/domain/entity';

export const errorHandler: express.ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  console.error('error =', err);
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
