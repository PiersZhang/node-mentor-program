
import { Column, PrimaryKey, Model, Table, AutoIncrement } from 'sequelize-typescript';
import { IUser } from '../interface/user.interface';

@Table
class User extends Model {
  constructor() {
    super();
    this.id = -1;
    this.login = '';
    this.password = '';
    this.age = -1;
    this.isDeleted = false;
  }
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  login: string

  @Column
  password: string

  @Column
  age: number

  @Column
  isDeleted: boolean
}
export default User;

