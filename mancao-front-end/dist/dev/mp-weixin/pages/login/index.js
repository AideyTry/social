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
        const {
          code,
          token
        } = res.data;
        if (code === 200) {
          console.log("\u6210\u529F");
          utils_auth.setToken(token);
          that.$store.dispatch("user/GetUserInfo");
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    b: common_vendor.o((...args) => $options.onInputCode && $options.onInputCode(...args)),
    c: $data.codeVisible
  }, $data.codeVisible ? common_vendor.e({
    d: common_vendor.t($data.codeMessage),
    e: !$data.sendCaptchaEnabled
  }, !$data.sendCaptchaEnabled ? {
    f: common_vendor.t($data.counterTimer)
  } : {}, {
    g: !$data.sendCaptchaEnabled,
    h: common_vendor.o((...args) => $options.sendCaptcha && $options.sendCaptcha(...args))
  }) : {}, {
    i: $data.loginVisible,
    j: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    k: common_vendor.o((...args) => _ctx.formReset && _ctx.formReset(...args)),
    l: common_vendor.o((...args) => _ctx.getuserinfo && _ctx.getuserinfo(...args)),
    m: common_vendor.o((...args) => _ctx.getuserinfo && _ctx.getuserinfo(...args)),
    n: common_vendor.o((...args) => _ctx.getuserinfo && _ctx.getuserinfo(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-247e7dd8"]]);
wx.createPage(MiniProgramPage);
