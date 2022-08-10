import { CustomError, CustomErrorSetup } from '../common/types';

const errorGenerator = (obj: CustomErrorSetup) => {
  const error: CustomError = new Error(obj.message);
  error.statusCode = obj.statusCode;
  throw error;
};

export default errorGenerator;
