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
    let waterfallList = common_vendor.ref([]);
    let waterfallImageWidth = common_vendor.ref(328);
    let waterfallImageCol = common_vendor.ref(2);
    let waterfallImageRight = common_vendor.ref(20);
    let waterfallImageBottom = common_vendor.ref(20);
    let waterfallDeviationHeight = common_vendor.ref([]);
    common_vendor.ref(null);
    let waterfall = common_vendor.ref(null);
    const initWaterfall = () => {
      waterfallDeviationHeight.value = new Array(waterfallImageCol.value);
      for (let i = 0; i < waterfallDeviationHeight.value.length; i++) {
        waterfallDeviationHeight.value[i] = 0;
      }
      imagePreLoading();
    };
    const imagePreLoading = async () => {
      for (let i = 0; i < props.list.length; i++) {
        let image = new Image();
        image.src = props.list[i].url;
        console.log("waterfall==", waterfall.value);
        const img = await new Promise((resolve) => {
          image.onload = (e) => {
            console.log("e=", e);
            let imageData = {};
            imageData.height = waterfallImageWidth.value / image.width * image.height + 160;
            imageData.id = props.list[i].id;
            imageData.src = props.list[i].url;
            imageData.title = props.list[i].title;
            imageData.avatar = props.list[i].avatar;
            imageData.username = props.list[i].username;
            imageData.likes = props.list[i].likes;
            imageData.fileType = props.list[i].fileType;
            waterfallList.value.push(imageData);
            rankImage(imageData);
            resolve(imageData);
          };
        });
        getLikes();
        console.log("img==", img);
      }
    };
    const rankImage = (imageData) => {
      const min = Math.min.apply(null, waterfallDeviationHeight.value);
      let minIndex = waterfallDeviationHeight.value.indexOf(min);
      imageData.top = waterfallDeviationHeight.value[minIndex];
      imageData.left = minIndex * (waterfallImageRight.value + waterfallImageWidth.value);
      waterfallDeviationHeight.value[minIndex] += imageData.height + waterfallImageBottom.value;
      console.log("imageData==", imageData);
    };
    const goDetail = (item) => {
      console.log("item=", item);
      console.log("props===", props);
      common_vendor.index.navigateTo({
        url: `/pages/index/HobbyDetailMountain?id=${item.id}&hobby=${props.activeIndex}`
      });
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
    const getLikes = () => {
      const params = {
        hobby: props.activeIndex
      };
      api_communication.getLike(params).then((data) => {
        console.log("getLike=", data);
        if (data.data.code === 200) {
          const ids = data.data.likes.map((item) => item.hobby_id);
          common_vendor.index.setStorageSync("like", ids);
          for (let i = 0; i < waterfallList.value.length; i++) {
            if (ids.includes(waterfallList.value[i].id)) {
              waterfallList.value[i].likeFlag = true;
            } else {
              waterfallList.value[i].likeFlag = false;
            }
          }
          console.log("waterfallList====", waterfallList.value);
        }
      });
    };
    common_vendor.onMounted(() => {
      console.log("list1=", props.list);
      initWaterfall();
    });
    common_vendor.onUpdated(() => {
      console.log("list2=", props.list);
    });
    common_vendor.watchEffect(() => {
      initWaterfall();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(waterfallList), (item, k0, i0) => {
          return common_vendor.e({
            a: item.src,
            b: item.fileType
          }, item.fileType ? {} : {}, {
            c: common_vendor.t(item.title),
            d: item.avatar,
            e: common_vendor.t(item.username),
            f: item.likeFlag
          }, item.likeFlag ? {
            g: common_vendor.o$1(($event) => like(item))
          } : {
            h: common_vendor.o$1(($event) => like(item))
          }, {
            i: common_vendor.t(item.likes),
            j: item.top + "rpx",
            k: item.left + "rpx",
            l: item.id,
            m: common_vendor.o$1(($event) => goDetail(item), item.id)
          });
        }),
        b: common_vendor.unref(waterfallImageWidth) + "rpx"
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb38ae7e"], ["__file", "C:/myself/social/social/src/pages/index/WaterFall.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=WaterFall.js.map
