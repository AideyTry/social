"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_auth = require("../../utils/auth.js");
const _sfc_main = {
  setup(__props) {
    const store = common_vendor.useStore();
    const userInfo = common_vendor.computed(() => store.state.user.userInfo).value;
    const onLogout = () => {
      new Promise((resolve, reject) => {
        utils_auth.removeToken();
        resolve();
      }).then(() => {
        location.reload();
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userInfo).avatar,
        b: common_vendor.t(common_vendor.unref(userInfo).username),
        c: common_vendor.o(onLogout)
      };
    };
  }
};
wx.createPage(_sfc_main);
