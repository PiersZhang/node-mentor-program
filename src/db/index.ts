import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('piersdb', 'postgres', '123123', {
  models: [`${__dirname  }../src/entity/*.entity.ts`]
});

export default sequelize;
