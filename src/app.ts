import express from 'express';
import errorMiddleware from './middleware/error-middleware';
import sequelize from './db/index';
// import router from './task2/index';
import router from './controller/user.controller';

const app = express();
// sequelize.sy().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });
app.use(express.json());
app.use(router);
app.use(errorMiddleware);


app.listen(3000);

