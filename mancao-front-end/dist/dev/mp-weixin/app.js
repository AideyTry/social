"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
var utils_auth = require("./utils/auth.js");
require("./store/module/user.js");
require("./api/user.js");
require("./utils/request.js");
require("./utils/validate.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/index.js";
  "./pages/find/index.js";
  "./pages/message/index.js";
  "./pages/hobby/index.js";
  "./pages/login/index.js";
  "./pages/user/info/index.js";
  "./pages/user/info/Editor.js";
  "./pages/user/info/School.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    if (!utils_auth.getToken()) {
      common_vendor.index.navigateTo({
        url: "pages/login/index"
      });
    } else {
      this.$store.dispatch("user/GetUserInfo");
    }
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
  app.use(store_index.store);
  app.config.globalProperties.$filters = {
    filterRegion(value, array) {
      const proviceObj = array.find((element) => element.code === value);
      if (!proviceObj) {
        return "\u5E02\u8F96\u533A";
      }
      if (!proviceObj.name) {
        return proviceObj;
      }
      return proviceObj.name;
    }
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
