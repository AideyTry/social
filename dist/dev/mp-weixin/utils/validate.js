"use strict";
const validateObjAttr = (obj) => {
  console.log("obj=====", obj);
  const arr = Object.keys(obj).map((key) => obj[key]);
  console.log("arr===", arr);
  return arr.every((element) => element || element === 0);
};
const validataGender = (obj) => {
  console.log("obj===", obj);
  console.log("obj['gender']=", obj["gender"]);
  if (obj["gender"]) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};
exports.validataGender = validataGender;
exports.validateObjAttr = validateObjAttr;
//# sourceMappingURL=validate.js.map
