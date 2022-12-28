import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorHandler: express.ErrorRequestHandler = (err, req, res) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
