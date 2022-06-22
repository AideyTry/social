"use strict";
const modal = {
  namespaced: true,
  state: {
    show: false,
    title: "\u6807\u9898",
    content: "\u5185\u5BB9",
    showCancel: true,
    cancelText: "\u53D6\u6D88",
    cancelColor: "#000000",
    confirmText: "\u786E\u5B9A",
    confirmColor: "#576b95",
    success: null
  },
  mutations: {
    hideModal(state) {
      if (state.hideTabBar) {
        wx.showTabBar();
      }
      state.show = false;
    },
    showModal(state, data) {
      state = Object.assign(state, data);
      console.log("modal state=", state);
      state.show = true;
    },
    success(state, res) {
      let cb = state.success;
      let resObj = {
        cancel: false,
        confirm: false
      };
      res == "confirm" ? resObj.confirm = true : resObj.cancel = true;
      cb && cb(resObj);
    }
  },
  actions: {}
};
exports.modal = modal;
//# sourceMappingURL=modal.js.map
