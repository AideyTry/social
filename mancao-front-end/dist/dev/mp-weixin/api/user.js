"use strict";
var utils_request = require("../utils/request.js");
const sendCode = (params) => {
  return utils_request.request(`/users/sendCode`, "GET", params);
};
const codePhoneLogin = (params) => {
  return utils_request.request(`/users/codePhoneLogin`, "GET", params);
};
const getUserInfo = () => {
  return utils_request.request(`/users/userInfo`, "GET");
};
exports.codePhoneLogin = codePhoneLogin;
exports.getUserInfo = getUserInfo;
exports.sendCode = sendCode;
