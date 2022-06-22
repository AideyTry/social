"use strict";
var common_vendor = require("../../../common/vendor.js");
var api_communication = require("../../../api/communication.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
const _sfc_main = {
  name: "follow",
  setup(props) {
    let infoList = common_vendor.ref([]);
    let isFlollow = common_vendor.ref(false);
    let followText = common_vendor.ref("\u5173\u6CE8");
    const following = (info) => {
      if (isFlollow.value) {
        common_vendor.index.showModal({
          content: "\u786E\u8BA4\u4E0D\u518D\u5173\u6CE8\uFF1F",
          success: function(res) {
            if (res.confirm) {
              let params2 = { followId: info.user_id };
              api_communication.deleteFollow(params2).then((data) => {
                if (data.data.code === 200) {
                  followText.value = "\u5173\u6CE8";
                  isFlollow.value = false;
                  getInfo(JSON.parse(decodeURIComponent(props.userids)));
                }
              });
            } else if (res.cancel) {
              console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
            }
          }
        });
        return;
      }
      let params = { followId: info.user_id };
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
    const initFlow = (info) => {
      let params = { followId: info.user_id };
      console.log("params===", params);
      api_communication.getFollow(params).then((data) => {
        console.log("data1===", data);
        if (data.data.code === 200) {
          isFlollow.value = data.data.isFollow;
          data.data.isFollow ? followText.value = "\u5DF2\u5173\u6CE8" : followText.value = "\u5173\u6CE8";
        }
      });
    };
    const getInfo = (userids) => {
      const params = {
        userids
      };
      if (parseInt(props.type) === 0) {
        common_vendor.index.setNavigationBarTitle({
          title: "\u5173\u6CE8"
        }), api_communication.getFollowsInfo(params).then((data) => {
          if (data.data.code === 200) {
            infoList.value = data.data.followsInfo;
            infoList.value = infoList.value.filter((element) => element);
            console.log("infoList.value====", infoList.value);
            infoList.value.forEach((item) => {
              initFlow(item);
            });
          }
        });
      } else if (parseInt(props.type) === 1) {
        common_vendor.index.setNavigationBarTitle({
          title: "\u7C89\u4E1D"
        }), api_communication.getFansInfo(params).then((data) => {
          console.log("getFansInfo===", data);
          if (data.data.code === 200) {
            infoList.value = data.data.fansInfo;
            infoList.value = infoList.value.filter((element) => element);
            infoList.value.forEach((item) => {
              initFlow(item);
            });
          }
        });
      }
    };
    const goUserDetail = (info) => {
      console.log("info======", info);
      common_vendor.index.navigateTo({
        url: `/pages/user/info/User?id=${info.user_id}`
      });
    };
    common_vendor.onMounted(() => {
      getInfo(JSON.parse(decodeURIComponent(props.userids)));
    });
    return {
      infoList,
      followText,
      isFlollow,
      following,
      goUserDetail
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.infoList, (item, k0, i0) => {
      return {
        a: item.avatar || "",
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.username),
        d: common_vendor.t(item.motto),
        e: common_vendor.o$1(($event) => $setup.following(item)),
        f: item.id,
        g: common_vendor.o$1(($event) => $setup.goUserDetail(item), item.id)
      };
    }),
    b: common_vendor.t($setup.followText),
    c: !$setup.isFlollow ? 1 : "",
    d: $setup.isFlollow ? 1 : ""
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-37177592"], ["__file", "C:/myself/social/social/src/pages/user/info/Follow.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=Follow.js.map
