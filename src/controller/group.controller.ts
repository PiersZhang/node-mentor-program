import { router } from './index.controller';
import { groupIdValidation, groupValidation, userToGroupValidation } from '../validation/groupValidation.validation';
import { findGroup, saveGroup, putGroup, deleteGroup, saveUserToGroup } from '../service/group.service';

router.get('/group/:id', groupIdValidation, (req, res, next) => {
  const { id } = req.params;
  findGroup(id, req, res, next);
});

router.post('/group', groupValidation, (req, res, next) => {
  saveGroup(req, res, next);
});

router.put('/group', groupValidation, (req, res, next) => {
  putGroup(req, res, next);
});

router.delete('/group/:id', groupIdValidation, (req, res, next) => {
  const { id } = req.params;
  deleteGroup(id, req, res, next);
});

router.post('/addUsersToGroup', userToGroupValidation, (req, res, next) => {
  saveUserToGroup(req, res, next);
});
