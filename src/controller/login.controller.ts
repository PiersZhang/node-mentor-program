import { loginValidation } from '../validation/login.validation';
import { router } from './index.controller';
import { login } from '../service/login.service';


router.post('/login', loginValidation, (req, res, next) => {
  login(req, res, next);
});


export default router;
