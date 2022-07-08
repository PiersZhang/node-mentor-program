import express from 'express';
import cors from 'cors';
import * as expressWinston from 'express-winston';
import winston from 'winston';
import errorMiddleware from './middleware/error-middleware';
import jwtMiddleware from './middleware/jwt';
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
app.use(cors());
app.use(express.json());
app.use(jwtMiddleware);
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  // method: '{{req.method}}',
  // args: '{{req}}',
  msg: 'HTTP {{req.method}} {{req.url}} {{res}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute:  () => false // optional: allows to skip some log messages based on request and/or response
}));
app.use(router);
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

app.use(errorMiddleware);


app.listen(3000);

