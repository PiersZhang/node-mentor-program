import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import { Group } from '../model/group.model';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
import { User } from '../model/user.model';
import { IDb } from '../interface/config.interface';

const dbConfig: IDb = config.get('dbConfig');
const sequelize = new Sequelize(dbConfig.dbName, 'postgres', dbConfig.pwd, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});
sequelize.addModels([User, UserGroup, Group, Permission]);

export default sequelize;
