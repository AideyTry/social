"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_openIM = require("../../utils/openIM.js");
const ChatContent = () => "./ChatContent.js";
const _sfc_main = {
  components: {
    ChatContent
  },
  onShow: function(showprops) {
    this.currentDate = new Date() + Math.random();
    setTimeout(() => {
      this.getConver();
    }, 1e3);
  },
  setup(props) {
    let inputString = common_vendor.ref("");
    const messageInfo = common_vendor.ref([]);
    const store = common_vendor.useStore();
    console.log("store.state.user===========================================================================", store.getters["user/getUserInfo"]);
    common_vendor.computed$1(() => store.getters["user/getUserInfo"]).value;
    const monitorOnRecv = () => {
      utils_openIM.openIM.on("OnRecvNewMessage", (data) => {
        const RecvMessage = JSON.parse(data.data);
        if (RecvMessage.contentType === 101) {
          messageInfo.value.unshift(RecvMessage);
        }
      });
    };
    const getConver = () => {
      const options = {
        groupID: "",
        startClientMsgID: "",
        count: 1e4,
        userID: props.userID
      };
      utils_openIM.openIM.getHistoryMessageList(options).then(({ data }) => {
        console.log("\u5386\u53F2\u6570\u636E=", JSON.parse(data));
        messageInfo.value = [...JSON.parse(data).reverse()];
      }).catch((err) => {
        console.log("err 000000000000000000000000000000000000000000=", err);
      });
    };
    const onConfirm = (event) => {
      const { value } = event.detail;
      inputString.value = value;
      const offlinePushInfo = {
        title: "you have a new message",
        desc: "",
        ex: "",
        iOSPushSound: "",
        iOSBadgeCount: false
      };
      utils_openIM.openIM.createTextMessage(value).then((res) => {
        const options = {
          recvID: props.userID,
          groupID: "",
          offlinePushInfo,
          message: res.data
        };
        utils_openIM.openIM.sendMessage(options).then(({ data, errCode }) => {
          const SendMessage = JSON.parse(data);
          messageInfo.value.unshift(SendMessage);
          inputString.value = "";
        }).catch((err) => {
          console.log("err=", err);
        });
      }).catch((err) => {
        console.log("text err=", err);
      });
    };
    const asRead = () => {
      utils_openIM.openIM.on("OnRecvC2CReadReceipt", (data) => {
        JSON.parse(data.data).map((cr) => {
          cr.msgIDList.map((crt) => {
            messageInfo.value.find((ms) => {
              if (ms.clientMsgID === crt) {
                ms.isRead = true;
              }
            });
          });
        });
      });
    };
    common_vendor.watch(() => messageInfo, (count, prevCount) => {
      const selfMessages = count.value.filter((item) => item.sendID === props.userID);
      const msgIDList = selfMessages.map((element) => element.clientMsgID);
      const options = {
        userID: props.userID,
        msgIDList
      };
      utils_openIM.openIM.markC2CMessageAsRead(options).then(({ data }) => {
        console.log("\u4F20\u5165\u5DF2\u8BFB=", data);
        utils_openIM.openIM.markC2CMessageAsRead({
          userID: props.userID,
          msgIDList: []
        });
      }).catch((err) => {
        console.log("err===", err);
      });
    }, {
      deep: true
    });
    common_vendor.onMounted(() => {
      common_vendor.index.setNavigationBarTitle({
        title: props.title
      });
      getConver();
      monitorOnRecv();
      asRead();
    });
    let currentDate = common_vendor.ref("");
    return {
      inputString,
      messageInfo,
      onConfirm,
      currentDate,
      getConver
    };
  }
};
if (!Array) {
  const _component_ChatContent = common_vendor.resolveComponent("ChatContent");
  _component_ChatContent();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.currentDate,
    b: common_vendor.p({
      msgList: $setup.messageInfo
    }),
    c: common_vendor.o$1((...args) => $setup.onConfirm && $setup.onConfirm(...args)),
    d: $setup.inputString,
    e: common_vendor.o$1(($event) => $setup.inputString = $event.detail.value)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ae0119f8"], ["__file", "C:/myself/social/social/src/pages/message/Chat.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=Chat.js.map
