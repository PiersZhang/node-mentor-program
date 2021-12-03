import { Column, PrimaryKey, Model, Table, AutoIncrement, BelongsToMany, HasMany } from 'sequelize-typescript';
import { IPermission } from '../interface/group.interface';
import { User } from './user.entity';
import { UserGroup } from './user-group.entity';
import { Permission } from './permission.entity';

@Table
export class Group extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: string;

  @Column
  name!: string

  @HasMany(() => Permission)
  permissions!: IPermission[]

  @BelongsToMany(() => User, () => UserGroup)
  users?: string[];
}

