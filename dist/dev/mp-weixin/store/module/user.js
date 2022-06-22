"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var utils_validate = require("../../utils/validate.js");
var utils_im = require("../../utils/im.js");
var utils_storage = require("../../utils/storage.js");
const user = {
  namespaced: true,
  state: {
    userInfo: utils_storage.getStoreUserInfo()
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo || utils_storage.getStoreUserInfo();
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      if (!utils_validate.validataGender(userInfo)) {
        console.log("\u4E0D\u5E94\u8BE5=", userInfo);
        common_vendor.index.redirectTo({
          url: "/pages/user/gender/index"
        });
      } else if (!utils_validate.validateObjAttr(userInfo)) {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          content: "\u8BF7\u5B8C\u5584\u5934\u50CF\u3001\u6635\u79F0\u7B49\u4E2A\u4EBA\u4FE1\u606F\u8D44\u6599",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.reLaunch({
                url: "/pages/user/index"
              });
            }
          }
        });
      }
      state.userInfo = userInfo;
      utils_storage.setStoreUserInfo(userInfo);
    }
  },
  actions: {
    async GetUserInfo({ commit }) {
      const { data: {
        code,
        data
      } } = await api_user.getUserInfo();
      console.log("data=", data);
      if (code === 200) {
        utils_im.login();
        commit("setUserInfo", data);
      }
    },
    async IMLogin({ commit }) {
      utils_im.login();
    }
  }
};
exports.user = user;
//# sourceMappingURL=user.js.map
