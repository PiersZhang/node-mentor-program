import { NotFound } from '../http-exception';
import { idValidation, userValidation } from '../validation/user.validation';
import { findUser, saveUser, deleteUser, putUser, getAutoSuggestUsers } from '../service/user.service';
import { User } from '../model/user.model';
import { router } from './index.controller';


router.get('/user/:id', idValidation, (req, res, next) => {
  const { id } = req.params;
  findUser(id, req, res, next);
});

//  http://localhost:3000/user?subString=a&limit=2
router.get('/user', (req, res, next) => {
  const { subString, limit } = req.query;
  getAutoSuggestUsers(JSON.stringify(subString), JSON.stringify(limit), res, next);
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

router.get('/getAll', (req, res) => {
  User.findAll().then((user) => {
    res.send(user);
  }).catch((e) => {
    console.log(e);
  });
});


router.get('*', (req, res, next) => {
  next(new NotFound());
});


export default router;
