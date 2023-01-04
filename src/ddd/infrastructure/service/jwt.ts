import * as jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { privateKey, publicKey } from '../../../loader';
import { ResponseError } from '../../domain/entity';
import {
  A_DAY_IN_SECONDS,
  errorCodes,
  SEVEN_DAYS_IN_SECONDS,
} from '../../../const';

export class JwtService {
  static generateAccessToken(data: object): string {
    return jwt.sign(data, privateKey, {
      algorithm: 'RS256',
      expiresIn: A_DAY_IN_SECONDS,
    });
  }

  static generateRefreshToken(data: object) {
    return jwt.sign(data, privateKey, {
      algorithm: 'RS256',
      expiresIn: SEVEN_DAYS_IN_SECONDS,
    });
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      });
      return decoded;
    } catch (err) {
      throw new ResponseError(
        errorCodes.JWT_TOKEN_ERROR,
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
      );
    }
  }
}
