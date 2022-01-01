"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var utils_auth = require("../../utils/auth.js");
require("../../utils/request.js");
const _sfc_main = {
  data() {
    return {
      codeVisible: false,
      loginVisible: true,
      sendCaptchaEnabled: true,
      codeMessage: "\u83B7\u53D6\u9A8C\u8BC1\u7801",
      counterTimer: 30,
      phoneNumber: null
    };
  },
  methods: {
    onInput: function(e) {
      console.log("input e=", e);
      if (/^1[3456789]\d{9}$/.test(e.detail.value)) {
        this.codeVisible = true;
        this.phoneNumber = e.detail.value;
      } else {
        this.codeVisible = false;
      }
    },
    onInputCode: function(e) {
      console.log("code=", e);
      if (/^\d{6}$/.test(e.detail.value)) {
        this.loginVisible = false;
      } else {
        this.loginVisible = true;
      }
    },
    sendCaptcha: function(e) {
      console.log("button e=", e);
      if (!this.sendCaptchaEnabled) {
        return;
      }
      this.sendCaptchaEnabled = false;
      const params = {
        phone: this.phoneNumber
      };
      console.log("params===", params);
      api_user.sendCode(params).then((res) => {
        console.log("res=", res);
      });
      this.codeMessage = "\u91CD\u65B0\u53D1\u9001";
      const timer = setInterval(() => {
        if (this.counterTimer <= 0) {
          this.counterTimer = 30;
          this.sendCaptchaEnabled = true;
          clearInterval(timer);
          this.codeMessage = "\u83B7\u53D6\u9A8C\u8BC1\u7801";
          return;
        }
        this.counterTimer--;
      }, 1e3);
    },
    formSubmit: function(e) {
      console.log("e=", e);
      console.log("form\u53D1\u751F\u4E86submit\u4E8B\u4EF6\uFF0C\u643A\u5E26\u6570\u636E\u4E3A\uFF1A" + JSON.stringify(e.detail.value));
      const params = e.detail.value;
      const that = this;
      console.log("window.navigator=", window.navigator.userAgent);
      window.navigator.__defineGetter__("userAgent", () => "myBroser");
      setTimeout(() => {
        console.log("window.navigator1=", window.navigator.userAgent);
      }, 200);
      api_user.codePhoneLogin(params).then((res) => {
        console.log("res========", res);
        const { code, token } = res.data;
        if (code === 200) {
          console.log("\u6210\u529F");
          utils_auth.setToken(token);
          that.$store.dispatch("user/GetUserInfo");
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    },
    miniProLogin: function(e) {
      console.log("e===", e);
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log("loginRes=", loginRes.authResult);
        }
      });
    },
    getInfo: function(e) {
      console.log("\u767B\u5F55e=", e);
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log("loginRes====", loginRes);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  Math.max.call(null, _easycom_uni_title2);
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
if (!Math) {
  Math.max.call(null, _easycom_uni_title);
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "h1",
      align: "center",
      title: "\u8513\u8349"
    }),
    b: common_vendor.o((...args) => $options.miniProLogin && $options.miniProLogin(...args)),
    c: common_vendor.o((...args) => $options.getInfo && $options.getInfo(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-247e7dd8"]]);
wx.createPage(MiniProgramPage);
