"use strict";
var utils_request = require("../utils/request.js");
const loginWechat = (params) => {
  return utils_request.request(`http://127.0.0.1:3000/users/loginWechat`, "GET", params);
};
exports.loginWechat = loginWechat;
