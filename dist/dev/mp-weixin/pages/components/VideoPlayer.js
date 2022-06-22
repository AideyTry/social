"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    options: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    const srcObj = common_vendor.reactive({
      src: "",
      poster: ""
    });
    const videoInit = () => {
      console.log("props.options=", props.options);
      srcObj.src = props.options.src || "";
      srcObj.poster = props.options.poster || "";
    };
    common_vendor.onMounted(() => {
      videoInit();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(srcObj).src,
        b: common_vendor.unref(srcObj).poster
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7ac097a7"], ["__file", "C:/myself/social/social/src/pages/components/VideoPlayer.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=VideoPlayer.js.map
