"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var utils_auth = require("../../utils/auth.js");
var api_wechat = require("../../api/wechat.js");
require("../../utils/request.js");
const ShowModal = () => "../components/ShowModal.js";
const _sfc_main = {
  components: {
    ShowModal
  },
  data() {
    return {
      codeVisible: true,
      loginVisible: true,
      demoVisible: false,
      sendCaptchaEnabled: true,
      codeMessage: "\u83B7\u53D6\u9A8C\u8BC1\u7801",
      counterTimer: 60,
      phoneNumber: null
    };
  },
  methods: {
    onInput: function(e) {
      console.log("input e=", e);
      if (/^1[3456789]\d{9}$/.test(e.detail.value)) {
        this.codeVisible = false;
        this.phoneNumber = e.detail.value;
      } else {
        this.codeVisible = true;
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
      api_user.sendCode(params).then((res2) => {
        console.log("res=", res2);
      });
      this.codeMessage = "\u91CD\u65B0\u53D1\u9001";
      const timer = setInterval(() => {
        if (this.counterTimer <= 0) {
          this.counterTimer = 60;
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
      api_user.codePhoneLogin(params).then((res2) => {
        console.log("res========", res2);
        const { code, token } = res2.data;
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
    wechatLogin: function() {
      common_vendor.index.showToast({
        title: "\u5F85\u4E0A\u7EBF",
        duration: 2e3
      });
    },
    qqLogin: function() {
      common_vendor.index.showToast({
        title: "\u5F85\u4E0A\u7EBF",
        duration: 2e3
      });
    },
    weiboLogin: function() {
      common_vendor.index.showToast({
        title: "\u5F85\u4E0A\u7EBF",
        duration: 2e3
      });
    },
    getInfo: function(e) {
      console.log("\u767B\u5F55e=", e);
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          console.log("loginRes====", loginRes);
          const { code } = loginRes;
          api_wechat.loginWechat({
            code
          }).then("res===", res);
        }
      });
    },
    openDemo: function() {
      this.demoVisible = true;
    },
    onClose: function() {
      this.demoVisible = false;
    }
  }
};
if (!Array) {
  const _component_show_modal = common_vendor.resolveComponent("show-modal");
  const _component_vuew = common_vendor.resolveComponent("vuew");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  (_component_show_modal + _component_vuew + _easycom_uni_link2)();
}
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
if (!Math) {
  _easycom_uni_link();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o$1((...args) => $options.onInput && $options.onInput(...args)),
    b: common_vendor.o$1((...args) => $options.onInputCode && $options.onInputCode(...args)),
    c: common_vendor.t($data.codeMessage),
    d: !$data.sendCaptchaEnabled
  }, !$data.sendCaptchaEnabled ? {
    e: common_vendor.t($data.counterTimer)
  } : {}, {
    f: !$data.sendCaptchaEnabled || $data.codeVisible,
    g: common_vendor.o$1((...args) => $options.sendCaptcha && $options.sendCaptcha(...args)),
    h: $data.loginVisible,
    i: common_vendor.o$1((...args) => $options.formSubmit && $options.formSubmit(...args)),
    j: common_vendor.o$1((...args) => _ctx.formReset && _ctx.formReset(...args)),
    k: $data.demoVisible
  }, $data.demoVisible ? {
    l: common_vendor.o$1($options.onClose),
    m: common_vendor.p({
      title: "\u8BF7\u9009\u62E9\u8D26\u53F7",
      content: "\u8BF7\u4EFB\u610F\u9009\u62E9\u4E00\u4E2A\u8D26\u53F7\u767B\u5F55"
    })
  } : {}, {
    n: common_vendor.o$1((...args) => $options.openDemo && $options.openDemo(...args)),
    o: common_vendor.o$1((...args) => $options.miniProLogin && $options.miniProLogin(...args)),
    p: common_vendor.o$1((...args) => $options.getInfo && $options.getInfo(...args)),
    q: common_vendor.p({
      showUnderLine: false,
      href: "https://beian.miit.gov.cn/",
      text: "\u7CA4ICP\u59072021179573\u53F7"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-247e7dd8"], ["__file", "C:/myself/social/social/src/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
