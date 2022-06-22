"use strict";
var common_vendor = require("../../common/vendor.js");
var api_hobby = require("../../api/hobby.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + WaterFall)();
}
const WaterFall = () => "./WaterFall.js";
const __default__ = {
  name: "McTabs",
  mounted() {
    console.log("this===", this);
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "60f14796-result": common_vendor.unref(result)
    }));
    const list = common_vendor.ref([
      { title: "\u82F1\u8BED", content: [] },
      {
        title: "\u72FC\u4EBA\u6740",
        content: []
      },
      { title: "\u5267\u672C\u6740", content: [] },
      {
        title: "\u767B\u5C71",
        content: []
      },
      {
        title: "\u65C5\u6E38",
        content: []
      },
      {
        title: "\u89C6\u9891",
        content: []
      }
    ]);
    let swiperIndex = common_vendor.ref(0);
    let navItemWidth = common_vendor.ref(0);
    const navItems = common_vendor.reactive([]);
    const strateies = {
      hobby0: (obj) => getEnglishVideos(obj),
      hobby1: (obj) => getWerewolf(obj),
      hobby2: (obj) => getScriptKill(obj),
      hobby3: (obj) => getMountaineers(obj),
      hobby4: (obj) => getTravel(obj),
      hobby5: (obj) => getvideoList(obj)
    };
    const handleScroll = (e) => {
      console.log("e=", e);
      const {
        detail: { current }
      } = e;
      console.log("current=", current);
    };
    const taggleNav = (index) => {
      swiperIndex.value = index;
    };
    const swiperChange = (e) => {
      const {
        detail: { current }
      } = e;
      swiperIndex.value = current;
      navItemWidth.value = navItems[swiperIndex.value].width;
      strateies[`hobby${current}`]({ pageNum: 1, pageSize: 100 });
      console.log("e=", e);
      console.log("navItemWidth.value=====", navItemWidth.value);
    };
    common_vendor.onMounted(() => {
      console.log("list====", list.value);
      if (list.value.length > 0) {
        list.value.forEach(() => {
          navItems.push({ width: 48 });
        });
        navItemWidth.value = navItems[swiperIndex.value].width;
        console.log("navItemWidth===", navItemWidth.value);
        getEnglishVideos({ pageNum: 1, pageSize: 10 });
      }
    });
    const result = common_vendor.computed$1(() => `${navItemWidth.value}rpx`);
    let videos = common_vendor.ref([]);
    let pageNum = common_vendor.ref(1);
    let pageSize = common_vendor.ref(10);
    let total = common_vendor.ref(0);
    var getEnglishVideos = ({ pageNum: pageNum2 = 1, pageSize: pageSize2 = 10 }) => {
      const params = {
        pageNum: pageNum2,
        pageSize: pageSize2
      };
      api_hobby.getVideoList(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          videos.value = videos.value.concat(data.data.data);
          total.value = data.data.total;
        }
      });
    };
    const onScrolltolower = (e) => {
      if (swiperIndex.value === 0) {
        if (Math.ceil(total.value / pageSize.value) <= pageNum.value) {
          return;
        }
        pageNum.value++;
        getEnglishVideos({ pageNum: pageNum.value, pageSize: pageSize.value });
      }
    };
    const goDetail = (item) => {
      console.log("item===", item);
      common_vendor.index.navigateTo({
        url: `/pages/index/VideoDetail?id=${item.id}`
      });
    };
    let mountaineers = common_vendor.ref([]);
    let mountaineersTotal = common_vendor.ref(0);
    const getMountaineers = ({ pageNum: pageNum2 = 1, pageSize: pageSize2 = 10 }) => {
      const params = {
        pageNum: pageNum2,
        pageSize: pageSize2,
        hobby: 4
      };
      console.log("hobby");
      api_hobby.getHobbyList(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          console.log("data.data.data=", data.data.data);
          mountaineers.value = data.data.data;
          mountaineersTotal.value = data.data.total;
        }
      });
    };
    let werewolfs = common_vendor.ref([]);
    let werewolfsTotal = common_vendor.ref(0);
    const getWerewolf = ({ pageNum: pageNum2 = 1, pageSize: pageSize2 = 10 }) => {
      const params = {
        pageNum: pageNum2,
        pageSize: pageSize2,
        hobby: 2
      };
      console.log("hobby");
      api_hobby.getHobbyList(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          console.log("data.data.data=", data.data.data);
          werewolfs.value = data.data.data;
          werewolfsTotal.value = data.data.total;
        }
      });
    };
    let scriptKills = common_vendor.ref([]);
    let scriptKillsTotal = common_vendor.ref(0);
    const getScriptKill = ({ pageNum: pageNum2 = 1, pageSize: pageSize2 = 10 }) => {
      const params = {
        pageNum: pageNum2,
        pageSize: pageSize2,
        hobby: 3
      };
      console.log("hobby");
      api_hobby.getHobbyList(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          console.log("data.data.data=", data.data.data);
          scriptKills.value = data.data.data;
          scriptKillsTotal.value = data.data.total;
        }
      });
    };
    let travels = common_vendor.ref([]);
    let travelsTotal = common_vendor.ref(0);
    const getTravel = ({ pageNum: pageNum2 = 1, pageSize: pageSize2 = 10 }) => {
      const params = {
        pageNum: pageNum2,
        pageSize: pageSize2,
        hobby: 5
      };
      console.log("hobby");
      api_hobby.getHobbyList(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          console.log("data.data.data=", data.data.data);
          travels.value = data.data.data;
          travelsTotal.value = data.data.total;
        }
      });
    };
    let videoList = common_vendor.ref([]);
    let videoListTotal = common_vendor.ref(0);
    const getvideoList = ({ pageNum: pageNum2 = 1, pageSize: pageSize2 = 10 }) => {
      const params = {
        pageNum: pageNum2,
        pageSize: pageSize2,
        hobby: 6
      };
      console.log("hobby");
      api_hobby.getHobbyList(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          console.log("data.data.data=", data.data.data);
          videoList.value = data.data.data;
          videoListTotal.value = data.data.total;
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.unref(swiperIndex) == index
          }, common_vendor.unref(swiperIndex) == index ? {
            c: common_vendor.s(`{width: ${common_vendor.unref(navItemWidth)}rpx}`)
          } : {}, {
            d: index,
            e: common_vendor.n(common_vendor.unref(swiperIndex) == index ? "nav-item-act" : ""),
            f: common_vendor.o$1(($event) => taggleNav(index))
          });
        }),
        b: common_vendor.o$1(handleScroll),
        c: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: index === 0
          }, index === 0 ? {
            b: common_vendor.f(common_vendor.unref(videos), (item2, k1, i1) => {
              return common_vendor.e({
                a: item2.img
              }, item2.img ? {
                b: item2.img,
                c: common_vendor.o$1(($event) => goDetail(item2))
              } : {}, {
                d: item2.hintTitle || item2.dateSrc
              }, item2.hintTitle || item2.dateSrc ? common_vendor.e({
                e: item2.hintTitle
              }, item2.hintTitle ? {
                f: common_vendor.t(item2.hintTitle)
              } : {}, {
                g: common_vendor.t(item2.dateSrc)
              }) : {}, {
                h: common_vendor.t(item2.title),
                i: "60f14796-2-" + i0 + "-" + i1 + "," + ("60f14796-1-" + i0 + "-" + i1),
                j: common_vendor.o$1(($event) => goDetail(item2)),
                k: common_vendor.t(item2.description),
                l: item2.id,
                m: "60f14796-1-" + i0 + "-" + i1 + "," + ("60f14796-0-" + i0),
                n: common_vendor.p({
                  title: item2.title,
                  ellipsis: item2.title,
                  note: item2.description,
                  direction: "column"
                })
              });
            }),
            c: common_vendor.p({
              type: "videocam",
              size: "20",
              color: "#999"
            }),
            d: "60f14796-0-" + i0
          } : index === 1 ? {
            f: "60f14796-3-" + i0,
            g: common_vendor.p({
              list: common_vendor.unref(werewolfs),
              activeIndex: 2
            })
          } : index === 2 ? {
            i: "60f14796-4-" + i0,
            j: common_vendor.p({
              list: common_vendor.unref(scriptKills),
              activeIndex: 3
            })
          } : index === 3 ? {
            l: "60f14796-5-" + i0,
            m: common_vendor.p({
              list: common_vendor.unref(mountaineers),
              activeIndex: 4
            })
          } : index === 4 ? {
            o: "60f14796-6-" + i0,
            p: common_vendor.p({
              list: common_vendor.unref(travels),
              activeIndex: 5
            })
          } : index === 5 ? {
            r: "60f14796-7-" + i0,
            s: common_vendor.p({
              list: common_vendor.unref(videoList),
              activeIndex: 6
            })
          } : {}, {
            e: index === 1,
            h: index === 2,
            k: index === 3,
            n: index === 4,
            q: index === 5,
            t: index
          });
        }),
        d: common_vendor.o$1(onScrolltolower),
        e: common_vendor.unref(swiperIndex),
        f: common_vendor.o$1(swiperChange),
        g: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-60f14796"], ["__file", "C:/myself/social/social/src/pages/index/McTabs.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=McTabs.js.map
