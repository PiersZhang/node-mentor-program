import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('piersdb', 'postgres', '123123', {
  host: 'localhost',
  dialect: 'postgres',
  models:  [`${__dirname}/src/entity`]
});

export default sequelize;
