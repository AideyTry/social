"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_openIM = require("../../utils/openIM.js");
var utils_auth = require("../../utils/auth.js");
const ChatContent = () => "./ChatContent.js";
const _sfc_main = {
  components: {
    ChatContent
  },
  onShow() {
    console.log("show======");
    this.getAllConversationList();
  },
  setup() {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = common_vendor.useStore();
    const userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    const convers = common_vendor.ref([]);
    const goChat = (item) => {
      console.log("item=", item);
      common_vendor.index.navigateTo({
        url: `/pages/message/Chat?userID=${item.userID}&title=${item.showName}`
      });
    };
    const getAllConversationList = () => {
      utils_openIM.openIM.getAllConversationList().then(({ data }) => {
        console.log("\u4F1A\u8BDD\u603B\u6570data====", JSON.parse(data));
        convers.value = JSON.parse(data);
        unReadMessage();
      }).catch((err) => {
        console.log("err=", err);
      });
    };
    const connectIM = (userID, token) => {
      console.log("userID, token=====================", userID, token);
      const config = {
        userID,
        token,
        url: "wss://mancao.social:20038",
        platformID: 5
      };
      utils_openIM.openIM.login(config).then((res) => {
        console.log("login suc...", res);
        if (res.errCode === 0) {
          getAllConversationList();
        }
      }).catch((err) => {
        console.log("login failed...", err);
      });
    };
    const showLastMessage = (lastData) => {
      return JSON.parse(lastData).content;
    };
    const unReadMessage = () => {
      utils_openIM.openIM.getTotalUnreadMsgCount().then(({ data }) => {
        console.log("data===", data);
        console.log("Number(data)=", Number(data));
        if (Number(data) > 0) {
          common_vendor.index.setTabBarBadge({
            index: 2,
            text: "\xB7\xB7\xB7"
          });
        } else {
          common_vendor.index.removeTabBarBadge({
            index: 2
          });
        }
      }).catch((err) => {
        console.log("err=", err);
      });
    };
    const monitorOnRecv = () => {
      utils_openIM.openIM.on("OnRecvNewMessage", (data) => {
        const RecvMessage = JSON.parse(data.data);
        if (RecvMessage.contentType === 101) {
          getAllConversationList();
        }
      });
    };
    common_vendor.onMounted(() => {
      connectIM(userInfo.phone, utils_auth.getIMToken());
      monitorOnRecv();
    });
    return {
      defaultAvatar,
      convers,
      goChat,
      showLastMessage,
      getAllConversationList
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($setup.convers, (item, k0, i0) => {
      return common_vendor.e({
        a: item.faceURL && item.faceURL.includes("https://") ? item.faceURL : $setup.defaultAvatar,
        b: item.unreadCount
      }, item.unreadCount ? {
        c: common_vendor.t(item.unreadCount)
      } : {}, {
        d: common_vendor.t(item.showName),
        e: common_vendor.t($setup.showLastMessage(item.latestMsg)),
        f: common_vendor.t(_ctx.$filters.formatMsgDate(item.latestMsgSendTime)),
        g: item.userID,
        h: common_vendor.o$1(($event) => $setup.goChat(item), item.userID)
      });
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-716a8bf6"], ["__file", "C:/myself/social/social/src/pages/message/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
