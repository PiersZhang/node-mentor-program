import { Sequelize } from 'sequelize-typescript';
import User from '../entity/user.entity';

const sequelize = new Sequelize('piersdb', 'postgres', '123123', {
  host: 'localhost',
  dialect: 'postgres',
  models: [`${__dirname  }../src/entity/*.entity.ts`]
});
sequelize.addModels([
  User
]);

export default sequelize;
