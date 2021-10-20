import { validate, IsString, IsNumber, IsBoolean, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpException, BadRequest } from '../http-exception';
import { IUser } from './index.interface';

class User {
  constructor(user: IUser) {
    this.id = user?.id;
    this.login = user?.login;
    this.password = user?.password;
    this.age = user?.age;
    this.isDeleted = user?.isDeleted;
  }
  @IsString()
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsNumber()
  age: number;

  @IsBoolean()
  isDeleted: boolean;
}
const userValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new User(req.body)).then((errors: ValidationError[]) => {
    console.log('11111');
    if (errors.length > 0) {
      console.log('222');
      console.log(new HttpException());
      return next(new HttpException({ status: 400, message: 'params validate wrong' }));
    }
    console.log('333');
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
