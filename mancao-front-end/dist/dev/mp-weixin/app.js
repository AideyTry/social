"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_auth = require("./utils/auth.js");
var api_user = require("./api/user.js");
require("./utils/request.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/index.js";
  "./pages/find/index.js";
  "./pages/message/index.js";
  "./pages/hobby/index.js";
  "./pages/login/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    if (!utils_auth.getToken()) {
      common_vendor.index.navigateTo({
        url: "pages/login/index"
      });
    }
    api_user.getUserInfo().then((res) => {
      console.log("userInfo========", res);
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
