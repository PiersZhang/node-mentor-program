import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Group } from './group.model';

@Table
export class UserGroup extends Model {
    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @ForeignKey(() => Group)
    @Column
    group_id!: number;
}

