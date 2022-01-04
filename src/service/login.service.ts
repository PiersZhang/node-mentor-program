import express from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { BadRequest } from '../http-exception';
import { User } from '../model/user.model';
import { IJwtConfig } from '../interface/config.interface';

const jwtConfig: IJwtConfig = config.get('jwtConfig');
const login = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  User.findOne({ where: { login:  req.body.username } }).then((user) => {
    if (req.body.password === user?.password) {
      const token = jwt.sign({ id: user?.id }, jwtConfig.secret, { expiresIn: '1h' });
      return res.send(token);
    }
    return next(new BadRequest({ message: 'user not found or password is incorrect' }));
  }).catch(() => {
    return next(new BadRequest({ message: 'user not found or password is incorrect' }));
  });
};

export {
  login
};
