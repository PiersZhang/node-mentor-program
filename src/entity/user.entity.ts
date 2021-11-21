
import { Column, PrimaryKey, Model, Table, AutoIncrement, HasMany } from 'sequelize-typescript';
import { IGroup } from '../interface/group.interface';
import { Group } from './group.entity';
// @Scopes({
//   withGroup: {
//     include: [{ model: () => Group }]
//   }
// })
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

  @HasMany(() => Group)
  // @Column
  group?: string[];
}

