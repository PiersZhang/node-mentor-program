import express from 'express';
import { NotFound } from '../http-exception';
import { idValidation, userValidation } from '../validation/user.validation';
import { saveUser, deleteUser, putUser, getAutoSuggestUsers } from '../service/user.service';
import User from '../entity/user.entity';

const router = express.Router();

router.get('/user/:id', idValidation, (req, res) => {
  const { id } = req.params;
  res.send(User.fineOne({ where: { id } }));
});

//  http://localhost:3000/user?subString=a&limit=2
router.get('/user', (req, res) => {
  const { subString, limit } = req.query;
  getAutoSuggestUsers(JSON.stringify(subString), JSON.stringify(limit), res);
});

router.post('/user', userValidation, (req, res, next) => {
  saveUser(req.body, req, res, next);
});

router.put('/user', userValidation, (req, res, next) => {
  putUser(req.body, req, res, next);
});

router.delete('/user/:id', idValidation, (req, res, next) => {
  const { id } = req.params;
  deleteUser(id, req, res, next);
});

router.get('/getAll', async (req, res) => {
  const user = await User.findAll();
  res.send(user);
});

router.get('*', (req, res, next) => {
  next(new NotFound());
});


export default router;
