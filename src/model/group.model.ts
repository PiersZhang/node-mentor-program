import { Column, PrimaryKey, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { IPermission } from '../interface/group.interface';
import { User } from './user.model';
import { UserGroup } from './user-group.model';
import { Permission } from './permission.model';

@Table
export class Group extends Model {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string

  @HasMany(() => Permission)
  permissions!: IPermission[]

  @BelongsToMany(() => User, () => UserGroup)
  users?: string[];
}

