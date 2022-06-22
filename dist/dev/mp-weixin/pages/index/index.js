"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_storage = require("../../utils/storage.js");
const McTabs = () => "./McTabs.js";
const _sfc_main = {
  onShow: function() {
    if (utils_storage.getTotalIM() > 0) {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: "\xB7\xB7\xB7"
      });
    }
  },
  components: {
    McTabs
  },
  setup() {
    const store = common_vendor.useStore();
    common_vendor.computed$1(() => store.state.user.userInfo).value;
    common_vendor.onMounted(() => {
    });
    return {
      title: "\u8513\u8349"
    };
  }
};
if (!Array) {
  const _component_McTabs = common_vendor.resolveComponent("McTabs");
  _component_McTabs();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/myself/social/social/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
