<template>
  <view class="chat-wraper">
    <ChatContent :key="currentDate" :msgList="messageInfo"></ChatContent>
    <view class="send-msg">
      <input
        type="text"
        placeholder="请输入消息"
        v-model="inputString"
        class="send"
        @confirm="onConfirm"
      />
    </view>
  </view>
</template>

<script>
import {
  onMounted,
  computed,
  ref,
  watch,
  onUpdated,
  onBeforeUpdate,
} from "vue";
import openIM from "@/utils/openIM.js";
import { getIMToken } from "../../utils/auth.js";
import { useStore } from "vuex";
import ChatContent from "./ChatContent.vue";
import { connectIM } from "@/utils/im.js";
import { shielded } from "@/api/user.js";
export default {
  components: {
    ChatContent,
  },
  onShow: function (showprops) {
    this.currentDate = new Date() + Math.random();
    setTimeout(() => {
      this.getConver();
    }, 1000);
  },
  onLoad: function (options) {
    this.propsOptions = options;
  },
  onNavigationBarButtonTap(e) {
    console.log("button ... e=================", e);
    const operations = this.operations;
    const propsOptions = this.propsOptions;
    uni.showActionSheet({
      itemList: operations,
      success: function (res) {
        console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        if (res.tapIndex + 1 === 1) {
          console.log("propsOptions.value.userID=====", propsOptions.userID);
          uni.navigateTo({
            url: `/pages/message/Inform?account=${propsOptions.userID}`,
          });
        } else {
          uni.showModal({
            title: "屏蔽用户",
            content: "屏蔽后，您将不再收到对方的消息",
            success: function (res) {
              console.log("res=============", res);
              if (res.confirm) {
                console.log("用户点击确定");
                console.log(
                  "propsOptions.conversationID===",
                  propsOptions.conversationID
                );
                const params = {
                  shieldedParty: propsOptions.userID
                }
                shielded(params).then((data) => {
                  if (data.data.code === 200) {
                    uni.showToast({
                      title: data.data.msg,
                      duration: 2000,
                    });
                  }
                });
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            },
          });
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      },
    });
  },
  setup(props) {
    let propsOptions = ref(null);
    let inputString = ref("");
    const messageInfo = ref([]);
    let operations = ref(["举报", "屏蔽"]);

    const store = useStore();

    console.log(
      "store.state.user===========================================================================",
      store.getters["user/getUserInfo"]
    );
    const userInfo = computed(() => store.getters["user/getUserInfo"]).value;

    const monitorOnRecv = () => {
      openIM.on("OnRecvNewMessage", (data) => {
        const RecvMessage = JSON.parse(data.data);
        if (RecvMessage.contentType === 101) {
          messageInfo.value.unshift(RecvMessage);
        }
      });
    };

    const getConver = () => {
      // connectIM(userInfo.phone, getIMToken())
      const options = {
        groupID: "", // 群聊ID，拉取群聊时传入，否则为“”
        startClientMsgID: "", // 上一次拉取的最后一条消息ID或空字符串,为空字符则从最新一条开始
        count: 10000, // 每次拉取条数
        // userID: props.userID, // 用户ID，拉取单聊时传入，否则为“”
        userID: propsOptions.value.userID, // 用户ID，拉取单聊时传入，否则为“”
      };
      openIM
        .getHistoryMessageList(options)
        .then(({ data }) => {
          console.log("历史数据=", JSON.parse(data));
          messageInfo.value = [...JSON.parse(data).reverse()];
        })
        .catch((err) => {
          console.log("err 000000000000000000000000000000000000000000=", err);
        });
    };
    const onConfirm = (event) => {
      const { value } = event.detail;
      inputString.value = value;
      const offlinePushInfo = {
        title: "you have a new message", // 推送标题
        desc: "", // 推送描述
        ex: "", // 扩展字段
        iOSPushSound: "", // ios推送声音
        iOSBadgeCount: false, // ios推送角标
      };
      openIM
        .createTextMessage(value)
        .then((res) => {
          const options = {
            // recvID: props.userID,
            recvID: propsOptions.value.userID,
            groupID: "",
            offlinePushInfo: offlinePushInfo,
            message: res.data,
          };
          openIM
            .sendMessage(options)
            .then(({ data, errCode }) => {
              const SendMessage = JSON.parse(data);
              messageInfo.value.unshift(SendMessage);
              inputString.value = "";
            })
            .catch((err) => {
              console.log("err=", err);
            });
        })
        .catch((err) => {
          console.log("text err=", err);
        });
    };

    /**
     * @description: 已读监听
     * @param {*}
     * @Author:
     * @return {*}
     */
    const asRead = () => {
      openIM.on("OnRecvC2CReadReceipt", (data) => {
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

    watch(
      () => messageInfo,
      (count, prevCount) => {
        const selfMessages = count.value.filter(
          (item) => item.sendID === propsOptions.value.userID
        );
        const msgIDList = selfMessages.map((element) => element.clientMsgID);
        const options = {
          // userID: props.userID,
          userID: propsOptions.value.userID,
          msgIDList,
        };
        openIM
          .markC2CMessageAsRead(options)
          .then(({ data }) => {
            console.log("传入已读=", data);
            openIM.markC2CMessageAsRead({
              // userID: props.userID,
              userID: propsOptions.value.userID,
              msgIDList: [],
            });
          })
          .catch((err) => {
            console.log("err===", err);
          });
      },
      {
        deep: true,
      }
    );
    onMounted(() => {
      uni.setNavigationBarTitle({
        // title: props.title,
        title: propsOptions.value.title,
      });
      getConver();
      monitorOnRecv();
      asRead();
    });
    let currentDate = ref("");
    return {
      inputString,
      messageInfo,
      onConfirm,
      currentDate,
      getConver,
      propsOptions,
      operations,
    };
  },
};
</script>

<style lang="scss" scoped>
.chat-wraper {
  .send-msg {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 0;
    width: 100%;
    background-color: #eaeaea;
    .send {
      background-color: #fff;
      height: 80rpx;
      width: 460rpx;
    }
  }
}
</style>
