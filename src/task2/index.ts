import express from 'express';
import { NotFound, BadRequest } from '../http-exception';
import { idValidation, userValidation } from './index.validation';
import users from './mock';

const router = express.Router();

// todo
// 1、limit users
// 2 login validationis required
// 3 In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message
router.post('/user', userValidation, (req, res) => {
  res.send('success');
});

router.get('/user/:id', idValidation, (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => {
    return item.id === id;
  });
  res.send(user);
});

router.put('/user', userValidation, (req, res) => {
  res.send('success');
});

router.delete('/user/:id', idValidation, (req, res, next) => {
  const { id } = req.params;
  users.forEach((item) => {
    if (item.id === id) {
      item.isDeleted = true;
      return res.status(200).send(item).end();
    }
  });
  next(new BadRequest());
});

router.get('*', (req, res, next) => {
  next(new NotFound());
});


export default router;
