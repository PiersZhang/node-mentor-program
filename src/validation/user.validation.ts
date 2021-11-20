import { validate, IsString, IsNumber, ValidationError, Min, Max, IsAlphanumeric } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpException, BadRequest } from '../http-exception';
import { IUserInfo } from '../interface/user.interface';
import { getMsgFromErrors } from '../utils/utils';

class User {
  constructor(user: IUserInfo) {
    this.login = user?.login;
    this.password = user?.password;
    this.age = user?.age;
  }

  @IsString()
  login: string;

  @IsString()
  @IsAlphanumeric()
  password: string;

  @IsNumber()
  @Min(4, {
    message: 'user’s age must bigger than 4'
  })
  @Max(130, {
    message: 'user’s age must smaller that 130'
  })
  age: number;
}
const userValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new User(req.body)).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return next(new HttpException({ status: 400, message: getMsgFromErrors(errors)[0] }));
    }
    next();
  });
};

class Id {
  constructor(id: string) {
    this.id = id;
  }
  @IsString()
  id: string;
}
const idValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new Id(req.params.id)).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return next(new BadRequest());
    }
    next();
  });
};

export { idValidation, userValidation };
