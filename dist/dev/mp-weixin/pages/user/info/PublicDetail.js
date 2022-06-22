"use strict";
var common_vendor = require("../../../common/vendor.js");
var api_hobby = require("../../../api/hobby.js");
var api_publish = require("../../../api/publish.js");
var utils_util = require("../../../utils/util.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
const Comment = () => "../../components/Comment.js";
const VideoPlayer = () => "../../components/VideoPlayer.js";
const _sfc_main = {
  components: {
    Comment,
    VideoPlayer
  },
  onLoad: function(options) {
    console.log("options===", options);
  },
  onReady: function() {
  },
  setup(props) {
    console.log("props=", props);
    const store = common_vendor.useStore();
    const userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    const options = common_vendor.reactive({
      poster: "",
      src: ""
    });
    let info = common_vendor.ref([
      {
        content: "https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif"
      }
    ]);
    common_vendor.ref(0);
    common_vendor.ref("default");
    let hobbyInfo = common_vendor.ref({});
    const initGetHobbyDetail = (obj) => {
      const { id, hobby } = obj;
      const params = { id, hobby };
      api_hobby.getHobbyDetail(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          hobbyInfo.value = data.data.data;
          publishDate.value = utils_util.formatDate(data.data.data.create_time);
          console.log("hobbyInfo.value===", hobbyInfo.value);
          console.log("data.data.data.url===", data.data.data.url);
          options.poster = data.data.data.url;
          options.src = data.data.data.video_url;
        }
      });
    };
    const goBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/user/index"
      });
    };
    let publishDate = common_vendor.ref(null);
    let operations = common_vendor.ref(["\u7F16\u8F91", "\u5220\u9664"]);
    let activeOperationIndex = common_vendor.ref(0);
    const onUpdate = (info2) => {
      console.log("info==", info2);
      common_vendor.index.navigateTo({
        url: `/pages/user/info/EditDetail?id=${info2.id}&hobby=${info2.hobby}`
      });
    };
    const onDelete = (info2) => {
      console.log("info==", info2);
      common_vendor.index.showModal({
        title: "\u5220\u9664",
        content: "\u786E\u5B9A\u5220\u9664\uFF1F",
        success: function(res) {
          if (res.confirm) {
            const params = {
              hobby: props.hobby,
              id: props.id
            };
            api_publish.deletePublish(params).then((data) => {
              if (data.data.code === 200) {
                common_vendor.index.showToast({
                  title: "\u5220\u9664\u6210\u529F",
                  duration: 2e3
                });
                common_vendor.index.switchTab({
                  url: "/pages/user/index",
                  success() {
                    let page = getCurrentPages().pop();
                    console.log("page==============", page);
                    if (!page)
                      return;
                    page.onLoad();
                  }
                });
              }
            });
          } else if (res.cancel)
            ;
        }
      });
    };
    const onEdit = (e) => {
      common_vendor.index.showActionSheet({
        itemList: operations,
        success: function(res) {
          console.log("\u9009\u4E2D\u4E86\u7B2C" + (res.tapIndex + 1) + "\u4E2A\u6309\u94AE");
          activeOperationIndex.value = res.tapIndex;
          if (activeOperationIndex.value === 1) {
            onDelete(props);
          } else {
            onUpdate(props);
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    };
    common_vendor.onMounted(() => {
      console.log("userInfo===", userInfo);
      initGetHobbyDetail({ id: props.id, hobby: props.hobby });
    });
    return {
      hobbyInfo,
      info,
      publishDate,
      options,
      goBack,
      onEdit,
      operations,
      activeOperationIndex
    };
  }
};
if (!Array) {
  const _component_VideoPlayer = common_vendor.resolveComponent("VideoPlayer");
  const _component_Comment = common_vendor.resolveComponent("Comment");
  (_component_VideoPlayer + _component_Comment)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o$1((...args) => $setup.goBack && $setup.goBack(...args)),
    b: $setup.hobbyInfo.avatar || "",
    c: common_vendor.t($setup.hobbyInfo.username || ""),
    d: common_vendor.o$1((...args) => $setup.onEdit && $setup.onEdit(...args)),
    e: $setup.hobbyInfo.fileType === 0
  }, $setup.hobbyInfo.fileType === 0 ? {
    f: common_vendor.f($setup.hobbyInfo.photos, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    g: $setup.hobbyInfo.photos.length > 1
  } : {}, {
    h: $setup.hobbyInfo.fileType === 1
  }, $setup.hobbyInfo.fileType === 1 ? {
    i: $setup.hobbyInfo.id,
    j: common_vendor.p({
      options: {
        src: $setup.hobbyInfo.video_url,
        poster: $setup.hobbyInfo.url
      }
    })
  } : {}, {
    k: common_vendor.t($setup.hobbyInfo.title),
    l: common_vendor.t($setup.hobbyInfo.content),
    m: common_vendor.t($setup.publishDate),
    n: $setup.hobbyInfo.id
  }, $setup.hobbyInfo.id ? {
    o: $setup.hobbyInfo.id,
    p: common_vendor.p({
      hobbyInfo: $setup.hobbyInfo
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cc42b28a"], ["__file", "C:/myself/social/social/src/pages/user/info/PublicDetail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=PublicDetail.js.map
