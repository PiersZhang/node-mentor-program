import { Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { IPermission } from '../interface/group.interface';
import { Group } from './group.model';

@Table
export class Permission extends Model {
  @Column
  permission!: IPermission

  @ForeignKey(() => Group)
  @Column
  groupId?: string

  @BelongsTo(() => Group)
  group?: Group
}

