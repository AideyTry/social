"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var utils_auth = require("../../utils/auth.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
const __default__ = {
  name: "showModal"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const store = common_vendor.useStore();
    const form = common_vendor.ref(null);
    let formData = common_vendor.reactive({
      username: "Aiden"
    });
    const radioChange = (e) => {
      const {
        detail: { value }
      } = e;
      form.value.setValue("username", value);
    };
    const onClose = () => {
      emit("close");
    };
    const submitForm = () => {
      form.value.validate().then((res) => {
        const params = {
          username: res.username,
          password: "111111"
        };
        console.log("params=======", params);
        api_user.exampleLogin(params).then((res2) => {
          console.log("res========", res2);
          const { code, token } = res2.data;
          if (code === 200) {
            emit("close");
            console.log("\u6210\u529F");
            utils_auth.setToken(token);
            store.dispatch("user/GetUserInfo");
            common_vendor.index.reLaunch({
              url: "/pages/index/index"
            });
          }
        });
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.o$1(onClose),
        c: common_vendor.t(props.content),
        d: common_vendor.unref(formData).username === "Aiden",
        e: common_vendor.o$1(radioChange),
        f: common_vendor.p({
          name: "username"
        }),
        g: common_vendor.sr(form, "699c88db-0", {
          "k": "form"
        }),
        h: common_vendor.p({
          modelValue: common_vendor.unref(formData)
        }),
        i: common_vendor.o$1(submitForm)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-699c88db"], ["__file", "C:/myself/social/social/src/pages/components/ShowModal.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=ShowModal.js.map
