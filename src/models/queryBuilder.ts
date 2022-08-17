export const camelToUnderscore = (key: string) => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const convertObjKeysToSnakeCase = (obj: {
  [key in string]: number | string | Date;
}) => {
  const newObj: { [key in string]: number | string | Date } = {};
  for (const camel in obj) {
    if (obj[camel] !== null) {
      newObj[camelToUnderscore(camel)] = obj[camel];
    }
  }
  return newObj;
};

export const buildSqlParamsForInsert = (obj: {
  [key in string]: number | string | Date;
}) => {
  const convertedObj = convertObjKeysToSnakeCase(obj);
  const setParams: Array<string> = [];
  const setValues: Array<string> = [];
  const entries = Object.entries(convertedObj);
  entries.forEach(entry => {
    setParams.push(`${entry[0]}`);
  });
  entries.forEach(entry => {
    setValues.push(`"${entry[1]}"`);
  });
  setParams.join(`,`);
  setValues.join(`,`);
  return setParams + ') VALUES (' + setValues;
};

export const buildSqlParamsForUpdate = (obj: {
  [key in string]: number | string | Date;
}) => {
  const convertedObj = convertObjKeysToSnakeCase(obj);
  const resultArr: Array<any> = [];
  const entries = Object.entries(convertedObj);
  entries.forEach(entry => {
    resultArr.push(`${entry[0]} = "${entry[1]}"`);
  });
  return resultArr.join(', ');
};

export const buildSqlParamsForDelete = (
  obj: { [key in string]: number | string | Date },
  condition: string | null
) => {
  const convertedObj = convertObjKeysToSnakeCase(obj);
  const resultArr: Array<string> = [];
  const entries = Object.entries(convertedObj);
  entries.forEach(entry => {
    resultArr.push(`${entry[0]} = "${entry[1]}"`);
  });
  if (condition === 'AND' || condition === 'OR') {
    resultArr.join(`${condition}`);
  }
  return resultArr;
};

export const insertBuilder = (
  data: { [key in string]: number | string | Date },
  table: string
) => {
  const query = `
    INSERT INTO ${table} (
      ${buildSqlParamsForInsert(data)}
    );
  `;
  return query;
};

export const updateBuilder = (
  inquiryId: number,
  data: { [key in string]: number | string | Date },
  table: string
) => {
  const query = `
    UPDATE ${table} SET ${buildSqlParamsForUpdate(
    data
  )} WHERE id = ${inquiryId};`;
  return query;
};

export const updateBetweenBuilder = (
  inquiryId: number,
  data: { [key in string]: number | string | Date },
  table: string
) => {
  const query = `
    UPDATE ${table} SET ${buildSqlParamsForUpdate(data)} 
    WHERE id = ${inquiryId}
    AND
    WHERE id BETWEEN 
  ;`;
  return query;
};

export const deleteBuilder = (
  data: { [key in string]: number | string | Date },
  table: string,
  condition: string | null
) => {
  const query = `
    DELETE FROM ${table} WHERE ${buildSqlParamsForDelete(data, condition)};
  `;
  return query;
};
