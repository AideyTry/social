"use strict";
var common_vendor = require("../common/vendor.js");
const tokenKey = "TOKEN";
function getToken() {
  return common_vendor.index.getStorageSync(tokenKey);
}
function setToken(token) {
  return common_vendor.index.setStorageSync(tokenKey, token);
}
function removeToken() {
  return common_vendor.index.removeStorageSync(tokenKey);
}
exports.getToken = getToken;
exports.removeToken = removeToken;
exports.setToken = setToken;
