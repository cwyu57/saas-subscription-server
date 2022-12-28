import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const handler: express.ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default handler;
