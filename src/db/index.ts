import { Sequelize } from 'sequelize-typescript';
import { Group } from '../model/group.model';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
import { User } from '../model/user.model';
import { dbConfig } from '../config/config';
const sequelize = new Sequelize(dbConfig.dbName, 'postgres', dbConfig.pwd, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});
sequelize.addModels([User, UserGroup, Group, Permission]);

export default sequelize;
