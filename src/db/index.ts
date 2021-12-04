import { Sequelize } from 'sequelize-typescript';
import { Group } from '../model/group.model';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
import { User } from '../model/user.model';

const sequelize = new Sequelize('piersdb', 'postgres', '123123', {
  host: 'localhost',
  dialect: 'postgres'
  // models:  [`${__dirname}/src/entity`]
});
sequelize.addModels([User, UserGroup, Group, Permission]);
// const sequelize = new Sequelize({
//   host: 'localhost',
//   database: 'piersdb',
//   dialect: 'postgres',
//   username: '',
//   password: '',
//   models:  [`${__dirname}/src/entity`]
// });

export default sequelize;
