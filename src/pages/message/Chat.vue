<template>
  <view class="chat-wraper">
    <ChatContent :key="messageInfo" :msgList="messageInfo"></ChatContent>
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
import { onMounted, computed, ref } from "vue";
import openIM from "@/utils/openIM.js";
import { getIMToken } from "../../utils/auth.js";
import { useStore } from "vuex";
import ChatContent from "./ChatContent.vue";
export default {
  components: {
    ChatContent,
  },
  setup(props) {
    let inputString = ref("");
    const messageInfo = ref([]);
    const monitorOnRecv = () => {
      openIM.on("OnRecvNewMessage", (data) => {
        const RecvMessage = JSON.parse(data.data);
        if (RecvMessage.contentType === 101) {
          messageInfo.value.unshift(RecvMessage);
        }
      });
    };

    const getConver = () => {
      const options = {
        groupID: "", // 群聊ID，拉取群聊时传入，否则为“”
        startClientMsgID: "", // 上一次拉取的最后一条消息ID或空字符串,为空字符则从最新一条开始
        count: 10000, // 每次拉取条数
        userID: "13817373289", // 用户ID，拉取单聊时传入，否则为“”
      };
      openIM
        .getHistoryMessageList(options)
        .then(({ data }) => {
          console.log("历史数据=", JSON.parse(data));
          messageInfo.value = [...JSON.parse(data).reverse()];
        })
        .catch((err) => {});
    };
    const onConfirm = (event) => {
      console.log("event=", event);
      const { value } = event.detail;
      inputString.value = value;
      const offlinePushInfo = {
        title: "", // 推送标题
        desc: "", // 推送描述
        ex: "", // 扩展字段
        iOSPushSound: "", // ios推送声音
        iOSBadgeCount: false, // ios推送角标
      };
      console.log("props.userID=", props.userID);
      openIM
        .createTextMessage(value)
        .then((res) => {
          console.log("message=", JSON.parse(res.data));
          const options = {
            recvID: props.userID,
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
    onMounted(() => {
      uni.setNavigationBarTitle({
        title: props.title,
      });
      getConver();
      monitorOnRecv();
    });
    return {
      inputString,
      messageInfo,
      onConfirm,
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
