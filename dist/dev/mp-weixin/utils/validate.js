"use strict";
const validateObjAttr = (obj) => {
  const arr = Object.keys(obj).map((key) => obj[key]);
  return arr.every((element) => element || element === 0);
};
exports.validateObjAttr = validateObjAttr;
