
import { Column, PrimaryKey, Model, Table, AutoIncrement } from 'sequelize-typescript';
import { IUser } from '../interface/user.interface';

@Table
class User extends Model {
  constructor(user?: IUser) {
    super();
    this.id = user?.id || '';
    this.login = user?.login || '';
    this.password = user?.password || '';
    this.age = user?.age || -1;
    this.isDeleted = user?.isDeleted || false;
  }
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string

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

