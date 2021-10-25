import { ValidationError } from 'class-validator';
import { values } from 'lodash';

export const getMsgFromErrors = (errors: ValidationError[]): string[] => {
  const errList: string[] = [];
  if (errors?.length) {
    errors.forEach((err) => {
      errList.push(
        `${err.property} is wrong, ${values(err.constraints).join(' & ')}`
      );
    });
  }
  return errList;
};
