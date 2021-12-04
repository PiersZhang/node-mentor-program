import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../http-exception/index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction): void {
  const status = error.status || 500;
  const message = error.message;
  return response.status(status).send({
    status,
    message
  }).end();
}

export default errorMiddleware;
