"use strict";
var common_vendor = require("../../common/vendor.js");
var api_hobby = require("../../api/hobby.js");
require("../../utils/request.js");
require("../../utils/auth.js");
const VideoPlayer = () => "../components/VideoPlayer.js";
const _sfc_main = {
  components: {
    VideoPlayer
  },
  onLoad: function(options) {
    console.log("options===", options);
  },
  setup(props, context) {
    let videInfo = common_vendor.ref({});
    const getVideoDetail = (id) => {
      const params = { id };
      api_hobby.videoDetail(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          videInfo.value = data.data.data;
        }
      });
    };
    const options = common_vendor.reactive({
      poster: "//img2.chinadaily.com.cn/images/202201/13/61e00901a310cdd3d826b064.jpeg",
      src: "https://social-1308251497.cos.ap-guangzhou.myqcloud.com/video/695c8c8a78f7e9a184a17db72e734a63/695c8c8a78f7e9a184a17db72e734a63.m3u8"
    });
    common_vendor.onMounted(() => {
      getVideoDetail(props.id);
    });
    return {
      videInfo,
      options
    };
  }
};
if (!Array) {
  const _component_VideoPlayer = common_vendor.resolveComponent("VideoPlayer");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_component_VideoPlayer + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($setup.videInfo.title),
    b: common_vendor.t($setup.videInfo.abstract),
    c: common_vendor.p({
      options: $setup.options
    }),
    d: common_vendor.f($setup.videInfo.sections, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.section),
        b: item.id,
        c: "4bf59d7b-2-" + i0 + ",4bf59d7b-1",
        d: common_vendor.p({
          note: item.section
        })
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4bf59d7b"], ["__file", "C:/myself/social/social/src/pages/index/VideoDetail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=VideoDetail.js.map
