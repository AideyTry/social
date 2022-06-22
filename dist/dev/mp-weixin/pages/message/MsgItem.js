"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["msg", "selfID"],
  setup(props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const myMsg = common_vendor.computed$1(() => props.selfID === props.msg.sendID).value;
    console.log("mySmg", myMsg);
    console.log("props===", props);
    return {
      defaultAvatar,
      myMsg
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.msg.senderFaceUrl && $props.msg.senderFaceUrl.includes("https://") ? $props.msg.senderFaceUrl : $setup.defaultAvatar,
    b: common_vendor.t($props.msg.content),
    c: common_vendor.t(_ctx.$filters.formatMsgDate($props.msg.sendTime)),
    d: $props.msg.sendID === $props.selfID ? 1 : "",
    e: $props.msg.sendID === $props.selfID
  }, $props.msg.sendID === $props.selfID ? {
    f: common_vendor.t($props.msg.isRead ? "\u5DF2\u8BFB" : "\u672A\u8BFB"),
    g: $props.msg.isRead ? "#999" : "#428BE5"
  } : {}, {
    h: $setup.myMsg ? 1 : ""
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-27324538"], ["__file", "C:/myself/social/social/src/pages/message/MsgItem.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=MsgItem.js.map
