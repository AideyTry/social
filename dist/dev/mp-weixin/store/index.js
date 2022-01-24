"use strict";
var common_vendor = require("../common/vendor.js");
var store_module_user = require("./module/user.js");
const store = common_vendor.createStore({
  modules: {
    user: store_module_user.user
  }
});
exports.store = store;
