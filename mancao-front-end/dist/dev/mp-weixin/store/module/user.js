"use strict";
var common_vendor = require("../../common/vendor.js");
var api_user = require("../../api/user.js");
var utils_validate = require("../../utils/validate.js");
const user = {
  namespaced: true,
  state: {
    userInfo: common_vendor.index.getStorageSync("userInfo")
  },
  mutations: {
    setUserInfo(state, userInfo) {
      if (!utils_validate.validateObjAttr(userInfo)) {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          content: "\u8BF7\u5B8C\u5584\u4E2A\u4EBA\u4FE1\u606F\u8D44\u6599",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.reLaunch({
                url: "/pages/user/index"
              });
            } else if (res.cancel)
              ;
          }
        });
      }
      state.userInfo = userInfo;
      common_vendor.index.setStorageSync("userInfo", userInfo);
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
        commit("setUserInfo", data);
      }
    }
  }
};
exports.user = user;
