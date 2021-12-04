import express from 'express';
import errorMiddleware from './middleware/error-middleware';
import sequelize from './db/index';
import router from './controller/user.controller';
// import router from './task2/index';
// import { User } from './entity/user.entity';
// import { Group } from './entity/group.entity';

const app = express();
sequelize.sync({ force: true }).then(() => {
  console.log('connected success!!!');
}).catch((err) => {
  console.log(err);
});
app.use(express.json());
app.use(router);

app.use(errorMiddleware);


app.listen(3000);

