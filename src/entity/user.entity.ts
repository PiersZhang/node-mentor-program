
import { Column, PrimaryKey, Model, Table, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import { Group } from './group.entity';
import { UserGroup } from './user-group.entity';

@Table({ freezeTableName: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
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

