"use strict";
var common_vendor = require("../common/vendor.js");
var store_module_user = require("./module/user.js");
var store_module_modal = require("./module/modal.js");
const store = common_vendor.createStore({
  modules: {
    user: store_module_user.user,
    modal: store_module_modal.modal
  }
});
exports.store = store;
//# sourceMappingURL=index.js.map
