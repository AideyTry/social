"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (PickerRegion + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const PickerRegion = () => "./PickerRegion.js";
const __default__ = {
  onBackPress(options) {
    if (options.from === "navigateBack") {
      return false;
    }
    common_vendor.index.switchTab({
      url: "/pages/user/index"
    });
    return true;
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    let images = common_vendor.reactive(userInfo.photos);
    console.log("images===", images);
    const avatar = common_vendor.ref(userInfo.avatar);
    const age = common_vendor.ref(common_vendor.hooks().diff(userInfo.birthday, "years"));
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
      const getDate = (type) => {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (type === "start") {
          year = year - 60;
        } else if (type === "end") {
          year = year + 2;
        }
        month = month > 9 ? month : "0" + month;
        day = day > 9 ? day : "0" + day;
        return `${year}-${month}-${day}`;
      };
      getDate({
        format: true
      });
    };
    const inEditor = () => {
      console.log("why");
      common_vendor.index.navigateTo({
        url: "/pages/user/info/Editor"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: avatar.value ? avatar.value : defaultAvatar,
        b: common_vendor.p({
          isDisabled: true,
          propsProvinceCode: common_vendor.unref(userInfo).location && common_vendor.unref(userInfo).location.provinceCode,
          propsCityCode: common_vendor.unref(userInfo).location && common_vendor.unref(userInfo).location.cityCode
        }),
        c: common_vendor.t(_ctx.$filters.filterGender(common_vendor.unref(userInfo).gender) || "\u6682\u65E0"),
        d: age.value || age.value === 0
      }, age.value || age.value === 0 ? {
        e: common_vendor.t(age.value)
      } : {}, {
        f: !age.value && age.value !== 0
      }, !age.value && age.value !== 0 ? {} : {}, {
        g: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return common_vendor.e({
            a: item ? item : defaultAvatar,
            b: !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0]
          }, !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0] ? {} : {}, {
            c: common_vendor.o$1(($event) => onUpload(item, index)),
            d: index
          });
        }),
        h: common_vendor.p({
          isDisabled: true,
          propsProvinceCode: common_vendor.unref(userInfo).hometown && common_vendor.unref(userInfo).hometown.provinceCode,
          propsCityCode: common_vendor.unref(userInfo).hometown && common_vendor.unref(userInfo).hometown.cityCode
        }),
        i: common_vendor.p({
          label: "\u5BB6\u4E61"
        }),
        j: common_vendor.t(common_vendor.unref(userInfo).schoolName || "\u6682\u672A\u586B\u5199"),
        k: common_vendor.p({
          label: "\u5B66\u6821"
        }),
        l: common_vendor.t(common_vendor.unref(userInfo).job || "\u6682\u672A\u586B\u5199"),
        m: common_vendor.p({
          label: "\u804C\u4E1A"
        }),
        n: common_vendor.o$1(inEditor)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b739da1"], ["__file", "C:/myself/social/social/src/pages/user/info/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
