"use strict";var e=require("../common/vendor.js");exports.getStoreUserInfo=function(){return e.index.getStorageSync("userinfo")},exports.getTotalIM=function(){return e.index.getStorageSync("totalIM")},exports.setStoreUserInfo=function(t){return e.index.setStorageSync("userinfo",t)},exports.setTotalIM=function(t){return e.index.setStorageSync("totalIM",t)};
//# sourceMappingURL=storage.js.map
