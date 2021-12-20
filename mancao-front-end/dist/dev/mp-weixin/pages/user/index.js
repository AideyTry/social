"use strict";
var utils_auth = require("../../utils/auth.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    onLogout() {
      new Promise((resolve, reject) => {
        utils_auth.removeToken();
        resolve();
      }).then(() => {
        location.reload();
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onLogout && $options.onLogout(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
