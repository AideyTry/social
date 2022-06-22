"use strict";
var common_vendor = require("../../common/vendor.js");
var api_hobby = require("../../api/hobby.js");
var api_communication = require("../../api/communication.js");
var utils_util = require("../../utils/util.js");
require("../../utils/request.js");
require("../../utils/auth.js");
const Comment = () => "../components/Comment.js";
const VideoPlayer = () => "../components/VideoPlayer.js";
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
          initFlow();
        }
      });
    };
    let isFlollow = common_vendor.ref(false);
    let followText = common_vendor.ref("\u5173\u6CE8");
    const following = () => {
      if (isFlollow.value) {
        common_vendor.index.showModal({
          content: "\u786E\u8BA4\u4E0D\u518D\u5173\u6CE8\uFF1F",
          success: function(res) {
            if (res.confirm) {
              let params2 = { followId: hobbyInfo.value.user_id };
              api_communication.deleteFollow(params2).then((data) => {
                if (data.data.code === 200) {
                  followText.value = "\u5173\u6CE8";
                  isFlollow.value = false;
                }
              });
            } else if (res.cancel) {
              console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
            }
          }
        });
        return;
      }
      console.log("userInfo===", userInfo);
      let params = { followId: hobbyInfo.value.user_id };
      api_communication.setFollow(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          followText.value = "\u5DF2\u5173\u6CE8";
          isFlollow.value = true;
        } else if (data.data.code === 400) {
          common_vendor.index.showToast({
            title: data.data.msg,
            icon: "none",
            duration: 2e3
          });
        }
      });
    };
    let publishDate = common_vendor.ref(null);
    const initFlow = () => {
      let params = { followId: hobbyInfo.value.user_id };
      console.log("params===", params);
      api_communication.getFollow(params).then((data) => {
        console.log("data1===", data);
        if (data.data.code === 200) {
          isFlollow.value = data.data.isFollow;
          data.data.isFollow ? followText.value = "\u5DF2\u5173\u6CE8" : followText.value = "\u5173\u6CE8";
        }
      });
    };
    const onNavTitle = (obj) => {
      console.log("obj===================================================================================", obj);
      const { hobby } = obj;
      const strateies = {
        "hobby2": () => common_vendor.index.setNavigationBarTitle({
          title: "\u72FC\u4EBA\u6740"
        }),
        "hobby3": () => common_vendor.index.setNavigationBarTitle({
          title: "\u5267\u672C\u6740"
        }),
        "hobby4": () => common_vendor.index.setNavigationBarTitle({
          title: "\u767B\u5C71"
        }),
        "hobby5": () => common_vendor.index.setNavigationBarTitle({
          title: "\u65C5\u6E38"
        }),
        "hobby6": () => common_vendor.index.setNavigationBarTitle({
          title: "\u89C6\u9891"
        }),
        "hobby7": () => common_vendor.index.setNavigationBarTitle({
          title: "\u7535\u5F71"
        })
      };
      strateies[`hobby${hobby}`]();
    };
    common_vendor.onMounted(() => {
      console.log("userInfo===", userInfo);
      onNavTitle(props);
      initGetHobbyDetail({ id: props.id, hobby: props.hobby });
    });
    return {
      followText,
      isFlollow,
      following,
      hobbyInfo,
      info,
      publishDate,
      options
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
    a: $setup.hobbyInfo.fileType === 0
  }, $setup.hobbyInfo.fileType === 0 ? {
    b: common_vendor.f($setup.hobbyInfo.photos, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    c: $setup.hobbyInfo.photos.length > 1
  } : {}, {
    d: $setup.hobbyInfo.fileType === 1
  }, $setup.hobbyInfo.fileType === 1 ? {
    e: $setup.hobbyInfo.id,
    f: common_vendor.p({
      options: {
        src: $setup.hobbyInfo.video_url,
        poster: $setup.hobbyInfo.url
      }
    })
  } : {}, {
    g: $setup.hobbyInfo.avatar || "",
    h: common_vendor.t($setup.hobbyInfo.username || ""),
    i: common_vendor.t($setup.followText),
    j: !$setup.isFlollow ? 1 : "",
    k: $setup.isFlollow ? 1 : "",
    l: common_vendor.o$1((...args) => $setup.following && $setup.following(...args)),
    m: common_vendor.t($setup.hobbyInfo.title),
    n: common_vendor.t($setup.hobbyInfo.content),
    o: common_vendor.t($setup.publishDate),
    p: $setup.hobbyInfo.id
  }, $setup.hobbyInfo.id ? {
    q: $setup.hobbyInfo.id,
    r: common_vendor.p({
      hobbyInfo: $setup.hobbyInfo
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-13b26782"], ["__file", "C:/myself/social/social/src/pages/index/HobbyDetailMountain.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=HobbyDetailMountain.js.map
