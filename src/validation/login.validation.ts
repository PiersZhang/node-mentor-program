import { validate, IsString, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { BadRequest } from '../http-exception';
import { getMsgFromErrors } from '../utils/utils';

class Login {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  @IsString()
  username: string;
  @IsString()
  password: string;
}
const loginValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new Login(req.body.username, req.body.password)).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return next(new BadRequest({ message: getMsgFromErrors(errors)[0] }));
    }
    next();
  });
};


export { loginValidation };
