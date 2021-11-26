import { validate, IsString, IsArray, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpException, BadRequest } from '../http-exception';
import { IGroup, IPermission } from '../interface/group.interface';
import { getMsgFromErrors } from '../utils/utils';

class Group {
  constructor(group: IGroup) {
    this.id = group?.id;
    this.name = group?.name;
    this.permissions = group?.permissions;
  }

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray({ groups: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'] })
  permissions: IPermission[]
}
const groupValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new Group(req.body)).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return next(new HttpException({ status: 400, message: getMsgFromErrors(errors)[0] }));
    }
    next();
  });
};


class Id {
  constructor(id: string) {
    this.id = id;
  }
  @IsString()
  id: string;
}
const groupIdValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new Id(req.params.id)).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return next(new BadRequest());
    }
    next();
  });
};

class UserToGroup {
  constructor(groupId: string, userIds: string[]) {
    this.groupId = groupId;
    this.userIds = userIds;
  }

  @IsString()
  groupId: string;

  @IsArray()
  userIds: string[]
}
const userToGroupValidation =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  validate(new UserToGroup(req.body.groupId, req.body.userIds)).then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      return next(new BadRequest());
    }
    next();
  });
};

export { groupValidation, groupIdValidation, userToGroupValidation };
