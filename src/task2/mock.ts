import { IUser } from './index.interface';
import { concat } from 'lodash';

let users: IUser[] = [
  {
    id: '1',
    login: 'piers1',
    password: 'piers1',
    age: 1,
    isDeleted: false
  }, {
    id: '2',
    login: 'piers2',
    password: 'piers2',
    age: 2,
    isDeleted: true
  }, {
    id: '3',
    login: 'piers3',
    password: 'piers3',
    age: 3,
    isDeleted: false
  }, {
    id: '4',
    login: 'piers4',
    password: 'piers4',
    age: 4,
    isDeleted: false
  }, {
    id: '5',
    login: 'piers5',
    password: 'piers5',
    age: 5,
    isDeleted: false
  }
];

const getAll = (): IUser[] => {
  return users;
};

const findItem = (id: string): IUser | undefined => {
  const user = users.find((item) => {
    return item.id === id;
  });
  return user;
};

const findItemByName = (login: string):  IUser | undefined => {
  const user = users.find((item) => {
    return item.login === login;
  });
  return user;
};

const deleteItem = (id: string): void => {
  users.forEach((item) => {
    if (item.id === id) {
      item.isDeleted = true;
    }
  });
};

const putItem = (user: IUser): void => {
  users.forEach((item) => {
    if (item.id === user.id) {
      item.login = user.login;
      item.password = user.password;
      item.age = user.age;
    }
  });
};

const saveItem = (user: IUser): void => {
  users = concat(users, user);
};

export {
  getAll,
  saveItem,
  findItem,
  deleteItem,
  putItem,
  findItemByName
};
