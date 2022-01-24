"use strict";
var uni_modules_uniIcons_components_uniIcons_icons = require("./icons.js");
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniIcons",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333333"
    },
    size: {
      type: [Number, String],
      default: 16
    },
    customPrefix: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      icons: uni_modules_uniIcons_components_uniIcons_icons.icons.glyphs
    };
  },
  computed: {
    unicode() {
      let code = this.icons.find((v) => v.font_class === this.type);
      if (code) {
        return unescape(`%u${code.unicode}`);
      }
      return "";
    }
  },
  methods: {
    _onClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.color,
    b: $props.size + "px",
    c: common_vendor.n("uniui-" + $props.type),
    d: common_vendor.n($props.customPrefix),
    e: common_vendor.n($props.customPrefix ? $props.type : ""),
    f: common_vendor.o((...args) => $options._onClick && $options._onClick(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
