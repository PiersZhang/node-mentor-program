import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../http-exception/index';
import { jwtConfig } from '../config/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function jwtMiddleware(request: Request, response: Response, next: NextFunction): void {
  const token = request.header('authorization');
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
