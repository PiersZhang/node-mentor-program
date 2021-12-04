
import { Column, PrimaryKey, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Group } from './group.model';
import { UserGroup } from './user-group.model';

@Table({ freezeTableName: true })
export class User extends Model {
  @PrimaryKey
  @Column
  id!: string

  @Column
  login!: string

  @Column
  password!: string

  @Column
  age!: number

  @Column
  isDeleted!: boolean

  @BelongsToMany(() => Group, () => UserGroup)
  group?: string[];
}

