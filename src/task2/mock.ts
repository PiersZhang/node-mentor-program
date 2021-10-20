import { IUser } from './index.interface';

const users: IUser[] = [
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

export default users;
