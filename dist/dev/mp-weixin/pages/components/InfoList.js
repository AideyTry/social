"use strict";
var common_vendor = require("../../common/vendor.js");
const __default__ = {
  name: "infoList"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    list: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    let infoList = common_vendor.ref([]);
    const goDetail = (item) => {
      console.log("item=", item);
      if (props.activeIndex === 0) {
        common_vendor.index.navigateTo({
          url: `/pages/user/info/PublicDetail?id=${item.id}&hobby=${item.hobby}`
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/user/info/LikeDetail?id=${item.id}&hobby=${item.hobby}`
        });
      }
    };
    common_vendor.watch(() => props.list, (state) => {
      console.log("state=", state);
      infoList.value = state;
    }, {
      deep: true
    });
    common_vendor.onMounted(() => {
      console.log("props=", props);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(infoList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.comments || 0),
            b: common_vendor.t(item.title),
            c: item.avatar || "",
            d: common_vendor.t(item.username),
            e: common_vendor.t(_ctx.$filters.commentTime(item.create_time || "")),
            f: item.url || "",
            g: item.id,
            h: common_vendor.o$1(($event) => goDetail(item), item.id)
          };
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-260b9811"], ["__file", "C:/myself/social/social/src/pages/components/InfoList.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=InfoList.js.map
