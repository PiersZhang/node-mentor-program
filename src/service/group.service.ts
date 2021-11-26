import express from 'express';
// import { v4 as uuidv4 } from 'uuid';
import { NotFound, BadRequest, HttpException } from '../http-exception';
import { Group } from '../entity/group.entity';
// import { IGroup } from '../interface/group.interface';


const findGroup = (id: string, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  Group.findOne({ where: { id } }).then((group) => {
    res.send(group);
  }).catch(() => {
    return next(new NotFound({ message: 'group not found' }));
  });
};
const saveGroup = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { group } = req.body;
  Group.findOne({ where: { id: group.id } }).then((existGroup) => {
    if (existGroup) {
      return next(new BadRequest({ message: 'already existed same group' }));
    }
  }).catch(() => {
    Group.create(group).then(() => {
      res.status(201).send(group).end();
    }).catch(() => {
      return next(new HttpException({ message: 'create group failed' }));
    });
  });
};

const putGroup = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { group } = req.body;
  Group.findOne({ where: { id: group.id } }).then(() => {
    Group.update(group, { where: { id: group.id } }).then(() => {
      res.status(201).send(group).end();
    }).catch(() => {
      return next(new HttpException({ message: 'create group failed' }));
    });
  }).catch(() => {
    return next(new BadRequest({ message: 'already existed same group' }));
  });
};

const deleteGroup =  (id: string, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  Group.findOne({ where: { id } }).then((group) => {
    group?.destroy().then(() => {
      res.send(group);
    }).catch(() => {
      return next(new BadRequest({ message: 'delete group failed' }));
    });
  }).catch(() => {
    return next(new NotFound({ message: 'group not found' }));
  });
};

const saveUserToGroup = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const { groupId, userIds } = req.body;
  Group.findOne({ where: { id: groupId } }).then((group) => {
    Group.update(Object.assign(group, { userIds }), { where: { id: groupId } }).then((_group) => {
      res.send(_group);
    }).catch(() => {
      return next(new BadRequest({ message: 'update group failed' }));
    });
  }).catch(() => {
    return next(new NotFound({ message: 'group not found' }));
  });
};

export {
  findGroup,
  saveGroup,
  putGroup,
  deleteGroup,
  saveUserToGroup
};
