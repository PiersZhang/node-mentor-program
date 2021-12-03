import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity';
import { Group } from './group.entity';

@Table
export class UserGroup extends Model {
    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @ForeignKey(() => Group)
    @Column
    group_id!: number;
}

