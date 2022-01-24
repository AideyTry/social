"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_auth = require("../../utils/auth.js");
const _sfc_main = {
  setup(__props) {
    const defaultAvatar = "/static/images/default_avatar.png";
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
    const onUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/info/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : defaultAvatar,
        b: common_vendor.o(onUserInfo),
        c: common_vendor.t(common_vendor.unref(userInfo).username),
        d: common_vendor.t(common_vendor.unref(userInfo).motto),
        e: common_vendor.o(onLogout)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4070cfdc"]]);
wx.createPage(MiniProgramPage);
