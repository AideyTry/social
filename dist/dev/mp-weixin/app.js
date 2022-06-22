"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
var utils_auth = require("./utils/auth.js");
var utils_util = require("./utils/util.js");
require("./store/module/user.js");
require("./api/user.js");
require("./utils/request.js");
require("./utils/validate.js");
require("./utils/im.js");
require("./api/im.js");
require("./utils/storage.js");
require("./utils/openIM.js");
require("./store/module/modal.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/HobbyDetailMountain.js";
  "./pages/index/VideoDetail.js";
  "./pages/user/index.js";
  "./pages/find/index.js";
  "./pages/message/index.js";
  "./pages/message/Chat.js";
  "./pages/hobby/index.js";
  "./pages/login/index.js";
  "./pages/user/info/index.js";
  "./pages/user/info/Follow.js";
  "./pages/user/info/User.js";
  "./pages/user/info/Editor.js";
  "./pages/user/info/School.js";
  "./pages/user/gender/index.js";
  "./pages/user/info/PublicDetail.js";
  "./pages/user/info/EditDetail.js";
  "./pages/user/info/LikeDetail.js";
  "./pagesUser/pages/user/info/index.js";
  "./pagesUser/pages/user/info/Editor.js";
  "./pagesUser/pages/user/info/School.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    if (!utils_auth.getToken()) {
      common_vendor.index.reLaunch({
        url: "pages/login/index"
      });
    } else {
      this.$store.dispatch("user/IMLogin");
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/myself/social/social/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
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
    },
    filterGender(value) {
      const genderStatusMap = {
        "1": "\u7537",
        "2": "\u5973"
      };
      return genderStatusMap[value] || "";
    },
    commentTime(value) {
      return utils_util.formatDate(value || "");
    },
    formatMsgDate(value) {
      return utils_util.formatMsgDate(value || "");
    }
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
