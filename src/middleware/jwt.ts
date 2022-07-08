import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { HttpException } from '../http-exception/index';
import { IJwtConfig } from '../interface/config.interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function jwtMiddleware(request: Request, response: Response, next: NextFunction): void {
  const token = request.header('authorization');
  const jwtConfig: IJwtConfig = config.get('jwtConfig');
  if (!token) {
    throw new HttpException({
      status: 401,
      message: 'Token should be required!'
    });
  }
  jwt.verify(token, jwtConfig.secret, (err) => {
    if (err) {
      throw new HttpException({
        status: 403,
        message: 'invalid token!'
      });
    }
  });
  next();
}

export default jwtMiddleware;
