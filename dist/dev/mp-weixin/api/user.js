"use strict";
var utils_request = require("../utils/request.js");
const sendCode = (params) => {
  console.log("send params=", params);
  return utils_request.request(`/users/sendCodeTencent`, "POST", params);
};
const codePhoneLogin = (params) => {
  return utils_request.request(`/users/codePhoneLogin`, "POST", params);
};
const setGender = (params) => {
  return utils_request.request(`/users/setGender`, "POST", params);
};
const getUserInfo = () => {
  return utils_request.request(`/users/userInfo`, "GET");
};
const getFrendInfo = (params) => {
  return utils_request.request(`/users/frendInfo`, "GET", params);
};
const getSchool = (params) => {
  return utils_request.request("/users/getSchool", "GET", params);
};
const editUserInfo = (params) => {
  console.log("params=e==", params);
  return utils_request.request(`/users/editUserInfo`, "POST", JSON.stringify(params.form));
};
const exampleLogin = (params) => {
  return utils_request.request(`/users/exampleLogin`, "POST", params);
};
exports.codePhoneLogin = codePhoneLogin;
exports.editUserInfo = editUserInfo;
exports.exampleLogin = exampleLogin;
exports.getFrendInfo = getFrendInfo;
exports.getSchool = getSchool;
exports.getUserInfo = getUserInfo;
exports.sendCode = sendCode;
exports.setGender = setGender;
//# sourceMappingURL=user.js.map
