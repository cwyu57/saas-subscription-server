import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { config } from '../config';
import { errorCodes } from '../const';
import { ResponseError } from '../entity';
import { JwtService } from '../service/jwt';

export const isAuthenticated: express.Handler = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(
      new ResponseError(
        errorCodes.MISSING_AUTHORIZATION,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
      ),
    );
  }

  const authorization = req.headers.authorization as string;
  const token = authorization.split(' ')[1];

  const decodedToken = JwtService.verifyToken(token);
  console.log(decodedToken);
  (req as any).user = decodedToken;
  return next();
};

export const systemApiKeyMiddleware: express.Handler = async (
  req,
  res,
  next,
) => {
  if (!req.headers['system-api-key']) {
    return next(
      new ResponseError(
        errorCodes.MISSING_SYSTEM_API_KEY,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
      ),
    );
  }
  if (req.headers['system-api-key'] !== config.systemApiKey) {
    return next(
      new ResponseError(
        errorCodes.WRONG_SYSTEM_API_KEY,
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
      ),
    );
  }
  return next();
};
