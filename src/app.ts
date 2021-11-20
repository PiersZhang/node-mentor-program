import express from 'express';
import errorMiddleware from './middleware/error-middleware';
// import router from './task2/index';
import router from './controller/user.controller';
import sequelize from './db/index';

const app = express();
sequelize.authenticate().then(() => {
  console.log('connected success!!!');
}).catch((err) => {
  console.log(err);
});
app.use(express.json());
app.use(router);

app.use(errorMiddleware);


app.listen(3000);

