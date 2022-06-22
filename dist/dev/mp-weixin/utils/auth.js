"use strict";
var common_vendor = require("../common/vendor.js");
const tokenKey = "TOKEN";
const tokenKeyIM = "TOKENIM";
function getToken() {
  return common_vendor.index.getStorageSync(tokenKey);
}
function setToken(token) {
  return common_vendor.index.setStorageSync(tokenKey, token);
}
function removeToken() {
  return common_vendor.index.removeStorageSync(tokenKey);
}
function getIMToken() {
  return common_vendor.index.getStorageSync(tokenKeyIM);
}
function setIMToken(token) {
  return common_vendor.index.setStorageSync(tokenKeyIM, token);
}
exports.getIMToken = getIMToken;
exports.getToken = getToken;
exports.removeToken = removeToken;
exports.setIMToken = setIMToken;
exports.setToken = setToken;
//# sourceMappingURL=auth.js.map
