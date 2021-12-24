"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed(() => store.state.user.userInfo).value;
    if (!userInfo.photos) {
      userInfo.photos = new Array(5);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : defaultAvatar,
        b: common_vendor.t(common_vendor.unref(userInfo).location),
        c: common_vendor.t(common_vendor.unref(userInfo).gender),
        d: common_vendor.t(common_vendor.unref(userInfo).age),
        e: common_vendor.f(common_vendor.unref(userInfo).photos, (item, index, i0) => {
          return common_vendor.e({
            a: item ? item : defaultAvatar,
            b: common_vendor.unref(userInfo).photos[index - 1] || index === 0 && !common_vendor.unref(userInfo).photos[0]
          }, common_vendor.unref(userInfo).photos[index - 1] || index === 0 && !common_vendor.unref(userInfo).photos[0] ? {} : {}, {
            c: index
          });
        }),
        f: common_vendor.o((...args) => _ctx.onUpload && _ctx.onUpload(...args))
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b739da1"]]);
wx.createPage(MiniProgramPage);
