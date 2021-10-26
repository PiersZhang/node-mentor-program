import express from 'express';
import errorMiddleware from './middleware/error-middleware';
import router from './task2/index';

const app = express();
app.use(express.json());
app.use(router);
app.use(errorMiddleware);


app.listen(3000);

