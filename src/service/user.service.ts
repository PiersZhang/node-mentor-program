import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orderBy, slice } from 'lodash';
import { IUserInfo, IUser } from '../interface/user.interface';
import { BadRequest } from '../http-exception';
// import { getAll, saveItem, findItem, deleteItem, putItem, findItemByName } from './mock';
import User from '../entity/user.entity';

const saveUser = (user: IUserInfo, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const uuid = uuidv4();
  const existUser = User.findOne({ where: { login: user.login } });
  if (existUser) {
    return next(new BadRequest({ message: 'already existed same user' }));
  }
  const _user = Object.assign(user, {
    id: uuid,
    isDeleted: false
  });
  User.update({
    _user
  });
  res.status(201).send(_user).end();
};

const putUser = (user: IUser, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const _user = User.findOne({ where: { id: user.id } });
  if (!_user) {
    return next(new BadRequest({ message: 'user don not exist' }));
  }
  User.update({
    user
  }, {
    where: { id: user.id }
  });
  res.status(200).send(_user).end();
};

const deleteUser = (id: string, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const user = User.findOne({ where: { id } });
  if (!user) {
    return next(new BadRequest({ message: 'user don not exist' }));
  }
  User.update(Object.assign(user, { isDelete: true }), {
    where: { id: user.id }
  });
  res.status(200).send(user).end();
};

const getAutoSuggestUsers = async (loginSubstring: string, limit: string, res: express.Response): Promise<void> => {
  const users: IUser[] = User.findAll();
  let suggestUsers = [];
  users.forEach((item) => {
    if (item.login.includes(loginSubstring)) {
      suggestUsers.push(item);
    }
  });
  suggestUsers = orderBy(slice(users, 0, Number(limit)), ['login'], 'asc');
  res.status(200).send(suggestUsers).end();
};

export {
  saveUser,
  putUser,
  deleteUser,
  getAutoSuggestUsers
};
