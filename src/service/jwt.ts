import * as jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { privateKey, publicKey } from '../loader';
import { ResponseError } from '../entity';
import { errorCodes } from '../const';

export class JwtService {
  static generateAccessToken(data: any): string {
    return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: 86400 });
  }

  static generateRefreshToken() {
    return '';
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
