import { Column, Model, Table } from 'sequelize-typescript';
import { IPermission } from '../interface/group.interface';

@Table
export class Permission extends Model {
  @Column
  permission!: IPermission
}

