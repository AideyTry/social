"use strict";
var common_vendor = require("../../../common/vendor.js");
require("../../../utils/openIM.js");
var api_user = require("../../../api/user.js");
var utils_auth = require("../../../utils/auth.js");
require("../../../utils/request.js");
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
    console.log("options=", options);
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    let userInfo = common_vendor.ref({});
    let age = common_vendor.ref("");
    const store = common_vendor.useStore();
    common_vendor.computed$1(() => store.state.user.userInfo).value;
    const getFrend = () => {
      const params = {
        userId: props.id
      };
      api_user.getFrendInfo(params).then((res) => {
        console.log("\u597D\u53CB=", res);
        if (res.data.code === 200) {
          userInfo.value = res.data.data;
          age.value = common_vendor.ref(common_vendor.hooks().diff(userInfo.value.birthday, "years"));
        }
      });
    };
    const onPreviewImage = (item, index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: userInfo.value.photos
      });
    };
    const goChat = () => {
      const token = utils_auth.getIMToken();
      console.log("token===", token);
      console.log("userInfo.value.phone===", userInfo.value.phone);
      common_vendor.index.navigateTo({
        url: `/pages/message/Chat?userID=${userInfo.value.phone}&title=${userInfo.value.username}`
      });
      return;
    };
    common_vendor.onMounted(() => {
      console.log("props===", props);
      getFrend();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).avatar,
        b: common_vendor.unref(userInfo).location && common_vendor.unref(userInfo).location.cityCode,
        c: common_vendor.p({
          isDisabled: true,
          propsProvinceCode: common_vendor.unref(userInfo).location && common_vendor.unref(userInfo).location.provinceCode,
          propsCityCode: common_vendor.unref(userInfo).location && common_vendor.unref(userInfo).location.cityCode
        }),
        d: common_vendor.t(_ctx.$filters.filterGender(common_vendor.unref(userInfo).gender) || "\u6682\u65E0"),
        e: common_vendor.unref(age) || common_vendor.unref(age) === 0
      }, common_vendor.unref(age) || common_vendor.unref(age) === 0 ? {
        f: common_vendor.t(common_vendor.unref(age))
      } : {}, {
        g: !common_vendor.unref(age) && common_vendor.unref(age) !== 0
      }, !common_vendor.unref(age) && common_vendor.unref(age) !== 0 ? {} : {}, {
        h: common_vendor.f(common_vendor.unref(userInfo).photos, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o$1(($event) => onPreviewImage(item, index)),
            c: index
          };
        }),
        i: common_vendor.t(common_vendor.unref(userInfo).motto || "\u6682\u672A\u586B\u5199"),
        j: common_vendor.p({
          label: "\u7B7E\u540D"
        }),
        k: common_vendor.unref(userInfo).hometown && common_vendor.unref(userInfo).hometown.provinceCode,
        l: common_vendor.p({
          isDisabled: true,
          propsProvinceCode: common_vendor.unref(userInfo).hometown && common_vendor.unref(userInfo).hometown.provinceCode,
          propsCityCode: common_vendor.unref(userInfo).hometown && common_vendor.unref(userInfo).hometown.cityCode
        }),
        m: common_vendor.p({
          label: "\u5BB6\u4E61"
        }),
        n: common_vendor.t(common_vendor.unref(userInfo).schoolName || "\u6682\u672A\u586B\u5199"),
        o: common_vendor.p({
          label: "\u5B66\u6821"
        }),
        p: common_vendor.t(common_vendor.unref(userInfo).job || "\u6682\u672A\u586B\u5199"),
        q: common_vendor.p({
          label: "\u804C\u4E1A"
        }),
        r: common_vendor.o$1(goChat)
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb0e3228"], ["__file", "C:/myself/social/social/src/pages/user/info/User.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=User.js.map
