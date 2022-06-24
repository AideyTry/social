"use strict";
var common_vendor = require("../../common/vendor.js");
var api_communication = require("../../api/communication.js");
require("../../utils/request.js");
require("../../utils/auth.js");
const __default__ = {
  name: "waterFall"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    list: {
      type: Array,
      default: []
    },
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.ref([]);
    let lists = common_vendor.ref(props.list);
    let waterfall = common_vendor.reactive([
      {
        height: 0,
        list: []
      },
      {
        height: 0,
        list: []
      }
    ]);
    let waterfallImageWidth = common_vendor.ref(328);
    const goDetail = (item) => {
      console.log("item=", item);
      console.log("props===", props);
      common_vendor.index.navigateTo({
        url: `/pages/index/HobbyDetailMountain?id=${item.id}&hobby=${props.activeIndex}`
      });
    };
    const loadImg = (ev, item) => {
      console.log("ev================", ev);
      console.log("item================,", item);
      let height = ev.detail.height * waterfallImageWidth.value / ev.detail.width;
      console.log("height==================", height);
      if (waterfall[0].height <= waterfall[1].height) {
        waterfall[0].list.push(lists.value.shift());
        waterfall[0].height += height;
      } else {
        waterfall[1].list.push(lists.value.shift());
        waterfall[1].height += height;
      }
    };
    const like = (item) => {
      console.log("item=", item);
      let likeIds = common_vendor.index.getStorageSync("like") || [];
      if (likeIds.includes(item.id)) {
        console.log("isOK=", likeIds);
        for (let i = 0; i < likeIds.length; i++) {
          if (likeIds[i] === item.id) {
            likeIds.splice(i, 1);
          }
        }
        item.likes -= 1;
        item.likeFlag = false;
        common_vendor.index.setStorageSync("like", likeIds);
      } else {
        item.likes += 1;
        item.likeFlag = true;
        console.log("likeIds=", likeIds);
        likeIds.unshift(item.id);
        common_vendor.index.setStorageSync("like", likeIds);
      }
      const params = { hobby: props.activeIndex, hobbyId: item.id };
      api_communication.setLike(params).then((data) => {
        console.log("like data=", data);
      });
    };
    common_vendor.watchEffect(() => {
      lists.value = props.list;
    });
    common_vendor.onMounted(() => {
      console.log("list1=", props.list);
      console.log("6666lists================", lists);
    });
    common_vendor.onUpdated(() => {
      console.log("list2=", props.list);
      console.log("6666lists================", lists.value);
      console.log("waterfall.value===", waterfall);
    });
    common_vendor.onBeforeUnmount(() => {
      console.log("onBeforeUnmount==========================");
    });
    common_vendor.onUnmounted(() => {
      console.log("===\u5378\u8F7D\u5566\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002");
      waterfall = common_vendor.reactive([
        {
          height: 0,
          list: []
        },
        {
          height: 0,
          list: []
        }
      ]);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.list, (item, k0, i0) => {
          return {
            a: item.url,
            b: common_vendor.o$1(($event) => loadImg($event, item)),
            c: item.id
          };
        }),
        b: common_vendor.f(common_vendor.unref(waterfall), (list, k0, i0) => {
          return {
            a: common_vendor.f(list.list, (item, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item.title),
                b: item.url,
                c: item.fileType
              }, item.fileType ? {} : {}, {
                d: common_vendor.t(item.title),
                e: item.avatar,
                f: common_vendor.t(item.username),
                g: item.likeFlag
              }, item.likeFlag ? {
                h: common_vendor.o$1(($event) => like(item))
              } : {
                i: common_vendor.o$1(($event) => like(item))
              }, {
                j: common_vendor.t(item.likes),
                k: item.id,
                l: common_vendor.o$1(($event) => goDetail(item), item.id)
              });
            }),
            b: list.height
          };
        }),
        c: common_vendor.unref(waterfallImageWidth) + "rpx"
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6deeb950"], ["__file", "C:/myself/social/social/src/pages/index/WaterFallApp.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=WaterFallApp.js.map
