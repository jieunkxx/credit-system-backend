import { CustomError } from '../class/common';
import * as type from 'types';

const errorGenerator = (obj: type.CustomErrorSetup) => {
  const error: type.CustomError = new CustomError(obj.message, obj.statusCode);
  throw error;
};

export default errorGenerator;
