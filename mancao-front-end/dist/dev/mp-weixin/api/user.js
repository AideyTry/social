"use strict";
var utils_request = require("../utils/request.js");
const sendCode = (params) => {
  console.log("send params=", params);
  return utils_request.request(`/users/sendCode`, "POST", params);
};
const codePhoneLogin = (params) => {
  return utils_request.request(`/users/codePhoneLogin`, "POST", params);
};
const getUserInfo = () => {
  return utils_request.request(`/users/userInfo`, "GET");
};
exports.codePhoneLogin = codePhoneLogin;
exports.getUserInfo = getUserInfo;
exports.sendCode = sendCode;
