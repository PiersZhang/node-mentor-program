import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orderBy, slice } from 'lodash';
import { IUserInfo, IUser } from '../interface/user.interface';
import { BadRequest, HttpException, NotFound } from '../http-exception';
// import { getAll, saveItem, findItem, deleteItem, putItem, findItemByName } from './mock';
import { User } from '../model/user.model';

const findUser = (id: string, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  User.findOne({ where: { id } }).then((user) => {
    res.send(user);
  }).catch(() => {
    return next(new NotFound({ message: 'user not found' }));
  });
};

const saveUser = (user: IUserInfo, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const uuid = uuidv4();
  User.findOne({ where: { login: user.login } }).then((existUser) => {
    if (existUser) {
      return next(new BadRequest({ message: 'already existed same user' }));
    }
  }).catch(() => {
    const _user = Object.assign(user, {
      id: uuid,
      isDeleted: false
    });
    User.create(_user).then(() => {
      res.status(201).send(_user).end();
    }).catch(() => {
      return next(new HttpException({ message: 'create user failed' }));
    });
  });
};

const putUser = (user: IUser, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  User.findOne({ where: { id: user.id } }).then((_user) => {
    User.update({
      user
    }, {
      where: { id: user.id }
    });
    res.status(200).send(_user).end();
  }).catch(() => {
    return next(new BadRequest({ message: 'user don not exist' }));
  });
};

const deleteUser = (id: string, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  User.findOne({ where: { id } }).then((user) => {
    User.update(Object.assign(user, { isDelete: true }), {
      where: { id: user?.id }
    });
    res.status(200).send(user).end();
  }).catch(() => {
    return next(new BadRequest({ message: 'user don not exist' }));
  });
};

const getAutoSuggestUsers = (loginSubstring: string, limit: string, res: express.Response, next: express.NextFunction): void => {
  User.findAll().then((users) => {
    let suggestUsers = [];
    users.forEach((item) => {
      if (item?.login?.includes(loginSubstring)) {
        suggestUsers.push(item);
      }
    });
    suggestUsers = orderBy(slice(users, 0, Number(limit)), ['login'], 'asc');
    res.status(200).send(suggestUsers).end();
  }).catch(() => {
    return next(new BadRequest({ message: 'user don not exist' }));
  });
};

export {
  findUser,
  saveUser,
  putUser,
  deleteUser,
  getAutoSuggestUsers
};
