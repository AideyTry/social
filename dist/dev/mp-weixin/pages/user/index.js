"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_auth = require("../../utils/auth.js");
var api_communication = require("../../api/communication.js");
var api_publish = require("../../api/publish.js");
require("../../utils/openIM.js");
var utils_storage = require("../../utils/storage.js");
require("../../utils/request.js");
if (!Math) {
  InfoList();
}
const InfoList = () => "../components/InfoList.js";
const __default__ = {
  onShow: function() {
    if (utils_storage.getTotalIM() > 0) {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: "\xB7\xB7\xB7"
      });
    } else {
      common_vendor.index.removeTabBarBadge({
        index: 2
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = common_vendor.useStore();
    const userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    const onLogout = () => {
      new Promise((resolve, reject) => {
        utils_auth.removeToken();
        resolve();
      }).then(() => {
        location.reload();
      });
    };
    const onUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/info/index"
      });
    };
    let follows = common_vendor.ref([]);
    let fans = common_vendor.ref([]);
    let getFollowsData = () => {
      api_communication.getFollows().then((data) => {
        console.log("getfollows =", data);
        if (data.data.code === 200) {
          follows.value = data.data.follows;
        }
      });
    };
    let getFansData = () => {
      api_communication.getFans().then((data) => {
        console.log("getfans =", data);
        if (data.data.code === 200) {
          fans.value = data.data.fans;
        }
      });
    };
    const goFollows = () => {
      const userids = [];
      for (let item of follows.value) {
        userids.push(item.follow_id);
      }
      common_vendor.index.navigateTo({
        url: `/pages/user/info/Follow?type=${0}&userids=${encodeURIComponent(JSON.stringify(userids))}`
      });
    };
    const goFans = () => {
      const userids = [];
      for (let item of fans.value) {
        userids.push(item.user_id);
      }
      common_vendor.index.navigateTo({
        url: `/pages/user/info/Follow?type=${1}&userids=${encodeURIComponent(JSON.stringify(userids))}`
      });
    };
    let activeIndex = common_vendor.ref(0);
    let publishs = common_vendor.ref([]);
    const getPublishData = () => {
      publishs.value = [];
      api_publish.getPublish().then((data) => {
        console.log("data getPublish=", data);
        if (data.data.code === 200) {
          publishs.value = data.data.data;
        }
      });
    };
    common_vendor.ref([]);
    const getMylikesData = () => {
      publishs.value = [];
      api_publish.getMylikes().then((data) => {
        console.log("data likes=", data);
        if (data.data.code === 200) {
          publishs.value = data.data.data;
        }
      });
    };
    const changeTab = (flag) => {
      activeIndex.value = flag;
    };
    common_vendor.watchEffect(() => {
      if (activeIndex.value === 0) {
        getPublishData();
      } else {
        getMylikesData();
      }
    }, activeIndex.value);
    common_vendor.onMounted(() => {
      getFollowsData();
      getFansData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : defaultAvatar,
        b: !common_vendor.unref(userInfo).avatar
      }, !common_vendor.unref(userInfo).avatar ? {} : {}, {
        c: common_vendor.o$1(onUserInfo),
        d: common_vendor.t(common_vendor.unref(userInfo).username),
        e: common_vendor.t(common_vendor.unref(userInfo).motto),
        f: common_vendor.t(common_vendor.unref(follows).length),
        g: common_vendor.o$1(goFollows),
        h: common_vendor.t(common_vendor.unref(fans).length),
        i: common_vendor.o$1(goFans),
        j: common_vendor.unref(activeIndex) === 0 ? 1 : "",
        k: common_vendor.o$1(($event) => changeTab(0)),
        l: common_vendor.unref(activeIndex) === 1 ? 1 : "",
        m: common_vendor.o$1(($event) => changeTab(1)),
        n: common_vendor.p({
          list: common_vendor.unref(publishs),
          activeIndex: common_vendor.unref(activeIndex)
        }),
        o: common_vendor.o$1(onLogout)
      }, {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4070cfdc"], ["__file", "C:/myself/social/social/src/pages/user/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
