<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:38
 * @LastEditTime: 2022-07-24 11:07:13
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="message-wrapper">
    <view
      v-for="item in convers"
      :key="item.userID"
      class="conver"
      @click="goChat(item)"
    >
      <view class="conver-msg">
        <view class="chat_bg_msg_icon-wraper">
          <image
            :src="
              item.faceURL && item.faceURL.includes('https://')
                ? item.faceURL
                : defaultAvatar
            "
            class="chat_bg_msg_icon"
          />
          <view class="unread-total" v-if="item.unreadCount"
            ><text>{{ item.unreadCount }}</text></view
          >
        </view>
        <view class="content-wraper">
          <text>{{ item.showName }}</text>
          <text>{{ showLastMessage(item.latestMsg) }}</text>
        </view>
      </view>
      <text class="conver-time">{{
        $filters.formatMsgDate(item.latestMsgSendTime)
      }}</text>
    </view>
    <view v-if="convers.length <= 0" class="empty">
      <view>您还未发起聊天</view>
      <view>快去关注兴趣爱好发布者一起聊天吧~！</view>
    </view>
  </view>
</template>

<script>
import { onMounted, computed, ref, watch } from "vue";
import openIM from "@/utils/openIM.js";
import { getIMToken } from "../../utils/auth.js";
import { useStore } from "vuex";
import ChatContent from "./ChatContent.vue";
export default {
  components: {
    ChatContent,
  },
  onShow(){
    console.log('show======')
    this.getAllConversationList()
  },
  setup() {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;
    const convers = ref([]);
    const goChat = (item) => {
      console.log("item=", item);
      uni.navigateTo({
        url: `/pages/message/Chat?userID=${item.userID}&title=${item.showName}&conversationID=${item.conversationID}`,
      });
    };
    const getAllConversationList = () => {
      openIM
        .getAllConversationList()
        .then(({ data }) => {
          console.log("会话总数data====", JSON.parse(data));
          convers.value = JSON.parse(data);
          unReadMessage();
        })
        .catch((err) => {
          console.log("err=", err);
        });
    };
    const connectIM = (userID, token) => {
      console.log("userID, token=====================", userID, token);
      const config = {
        userID,
        token,
        // url: "ws://42.192.229.151/:10003",
        url: "wss://mancao.social:20038",
        platformID: 5,
      };
      openIM
        .login(config)
        .then((res) => {
          console.log("login suc...", res);
          if (res.errCode === 0) {
            getAllConversationList();
          }
        })
        .catch((err) => {
          console.log("login failed...", err);
        });
    };

    const showLastMessage = (lastData) => {
      return JSON.parse(lastData).content;
    };

    const unReadMessage = () => {
      openIM
        .getTotalUnreadMsgCount()
        .then(({ data }) => {
          console.log("data===", data);
          console.log('Number(data)=', Number(data))
          if(Number(data) > 0){
          uni.setTabBarBadge({
            index: 2,
            text: '···'
          });
          }else {
            uni.removeTabBarBadge({
              index: 2
            })
          }
        })
        .catch((err) => {
          console.log("err=", err);
        });
    };

    const monitorOnRecv = () => {
      openIM.on("OnRecvNewMessage", (data) => {
        const RecvMessage = JSON.parse(data.data);
        if (RecvMessage.contentType === 101) {
          getAllConversationList();
        }
      });
    };

    onMounted(() => {
      connectIM(userInfo.phone, getIMToken());
      monitorOnRecv();
      // login();
      // resiger()
    });
    return {
      defaultAvatar,
      convers,
      goChat,
      showLastMessage,
      getAllConversationList
    };
  },
};
</script>

<style scoped lang="scss">
.empty{
  padding-top: 48rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #a0a0a0;
}
.conver {
  display: flex;
  justify-content: space-between;
  border-bottom: 1rpx solid #dbdbdb;
  padding: 10rpx;
  .conver-msg {
    display: flex;
  }
  .chat_bg_msg_icon-wraper {
    position: relative;
  }
  .unread-total {
    position: absolute;
    right: -12rpx;
    top: -8rpx;
    width: auto;
    height: auto;
    border-radius: 50%;
    padding: 4rpx;
    background: #f00;
    color: #fff;
    font-size: 12rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chat_bg_msg_icon {
    width: 84rpx;
    height: 84rpx;
  }
  .content-wraper {
    display: flex;
    flex-direction: column;
    margin: 0 12rpx;
    background-color: #f2f2f2;
  }
  .conver-time {
  }
}
</style>
