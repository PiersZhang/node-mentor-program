import { Column, PrimaryKey, Model, Table, AutoIncrement, HasMany } from 'sequelize-typescript';
import { IPermission } from '../interface/group.interface';
import { IUser } from '../interface/user.interface';
import { User } from './user.entity';

@Table
export class Group extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string | undefined

  @Column
  name: string | undefined

  @Column
  permissions: IPermission[] | undefined

  @HasMany(() => User)
//  @Column
  users?: string[];
}

