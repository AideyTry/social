"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed(() => store.state.user.userInfo).value;
    let images = common_vendor.reactive(userInfo.photos);
    console.log("images===", images);
    const avatar = common_vendor.ref(userInfo.avatar);
    const onUpload = (item, index) => {
      console.log("item, index===", item, index);
      if (item) {
        common_vendor.index.previewImage({
          urls: images,
          longPressActions: {
            itemList: ["\u53D1\u9001\u7ED9\u670B\u53CB", "\u4FDD\u5B58\u56FE\u7247", "\u6536\u85CF"],
            success: function(data) {
              console.log("\u9009\u4E2D\u4E86\u7B2C" + (data.tapIndex + 1) + "\u4E2A\u6309\u94AE,\u7B2C" + (data.index + 1) + "\u5F20\u56FE\u7247");
            },
            fail: function(err) {
              console.log(err.errMsg);
            }
          }
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/user/info/Editor"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: avatar.value ? avatar.value : defaultAvatar,
        b: common_vendor.t(common_vendor.unref(userInfo).location),
        c: common_vendor.t(common_vendor.unref(userInfo).gender),
        d: common_vendor.t(_ctx.age),
        e: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return common_vendor.e({
            a: item ? item : defaultAvatar,
            b: !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0]
          }, !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0] ? {} : {}, {
            c: common_vendor.o(($event) => onUpload(item, index)),
            d: index
          });
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b739da1"]]);
wx.createPage(MiniProgramPage);
