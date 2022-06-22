"use strict";
var common_vendor = require("../../common/vendor.js");
const MsgItem = () => "./MsgItem.js";
const _sfc_main = {
  props: ["msgList"],
  components: {
    MsgItem
  },
  onShow: function() {
    this.currentDate = new Date() + Math.random();
    console.log("this.currentDate===============================", this.currentDate);
    console.log("msgList============", this.msgList);
  },
  setup() {
    const store = common_vendor.useStore();
    const userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    let currentDate = common_vendor.ref("");
    common_vendor.onMounted(() => {
    });
    return {
      userInfo,
      currentDate
    };
  }
};
if (!Array) {
  const _component_MsgItem = common_vendor.resolveComponent("MsgItem");
  _component_MsgItem();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.msgList, (item, k0, i0) => {
      return {
        a: item.clientMsgID + $setup.currentDate,
        b: "02e4d885-0-" + i0,
        c: common_vendor.p({
          msg: item,
          selfID: $setup.userInfo.phone
        })
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-02e4d885"], ["__file", "C:/myself/social/social/src/pages/message/ChatContent.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=ChatContent.js.map
