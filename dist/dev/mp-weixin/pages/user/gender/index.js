"use strict";
var common_vendor = require("../../../common/vendor.js");
var api_user = require("../../../api/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  setup(__props) {
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    const form = common_vendor.ref(null);
    let show = common_vendor.ref(true);
    let title = common_vendor.ref("\u9009\u62E9\u6027\u522B");
    common_vendor.ref(null);
    let formData = common_vendor.reactive({
      gender: null
    });
    const rules = {
      gender: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u6635\u79F0"
          }
        ]
      }
    };
    common_vendor.watchEffect(() => {
      if (userInfo.gender) {
        show.value = false;
      } else {
        show.value = true;
      }
    });
    const radioChange = (e) => {
      const {
        detail: { value }
      } = e;
      form.value.setValue("gender", value);
    };
    const submitForm = () => {
      form.value.validate().then((res) => {
        const params = {
          gender: res.gender
        };
        api_user.setGender(params).then((data) => {
          console.log("data===", data);
          show.value = false;
          store.dispatch("user/GetUserInfo");
        });
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.unref(title),
        c: common_vendor.o$1(radioChange),
        d: common_vendor.p({
          name: "gender"
        }),
        e: common_vendor.sr(form, "660079f4-0", {
          "k": "form"
        }),
        f: common_vendor.p({
          modelValue: common_vendor.unref(formData),
          rules
        }),
        g: common_vendor.o$1(submitForm),
        h: common_vendor.unref(show)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-660079f4"], ["__file", "C:/myself/social/social/src/pages/user/gender/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
