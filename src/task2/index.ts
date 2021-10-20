import express from 'express';
import { NotFound } from '../http-exception';
import { idValidation, userValidation } from './index.validation';
import users from './mock';

const router = express.Router();

router.get('/user/:id', idValidation, (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => {
    return item.id === id;
  });
  res.send(user);
});

router.post('/user', userValidation, (req, res) => {
  res.send('success');
});

router.get('*', (req, res, next) => {
  next(new NotFound());
});


export default router;
