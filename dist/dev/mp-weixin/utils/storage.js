"use strict";
var common_vendor = require("../common/vendor.js");
const totalKey = "totalIM";
const userKey = "userinfo";
function getTotalIM() {
  return common_vendor.index.getStorageSync(totalKey);
}
function setTotalIM(data) {
  return common_vendor.index.setStorageSync(totalKey, data);
}
function getStoreUserInfo() {
  return common_vendor.index.getStorageSync(userKey);
}
function setStoreUserInfo(data) {
  return common_vendor.index.setStorageSync(userKey, data);
}
exports.getStoreUserInfo = getStoreUserInfo;
exports.getTotalIM = getTotalIM;
exports.setStoreUserInfo = setStoreUserInfo;
exports.setTotalIM = setTotalIM;
//# sourceMappingURL=storage.js.map
