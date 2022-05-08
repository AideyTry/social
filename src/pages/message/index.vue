<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:38
 * @LastEditTime: 2022-05-08 21:07:15
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <view v-for="item in convers" :key="item.userID" class="conver" @click="goChat(item)">
      <view class="conver-msg">
        <image
          :src="
            item.faceURL && item.faceURL.includes('https://')
              ? item.faceURL
              : defaultAvatar
          "
          class="chat_bg_msg_icon"
        />
        <view class="content-wraper">
          <text>{{ item.showName }}</text>
          <text>{{ $filters.commentTime(item.latestMsgSendTime) }}</text>
        </view>
      </view>
      <text class="conver-time">{{
        $filters.commentTime(item.latestMsgSendTime)
      }}</text>
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
  setup() {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;
    let operationID = ref(null);
    const convers = ref([]);
    const goChat = (item) => {
      console.log('item=', item)
      uni.navigateTo({
        url: `/pages/message/Chat?userID=${item.userID}&title=${item.showName}`,
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
            openIM
              .getAllConversationList()
              .then(({ data }) => {
                console.log("data====", JSON.parse(data));
                convers.value = JSON.parse(data);
              })
              .catch((err) => {
                console.log("err=", err);
              });
          }
          operationID.value = res.operationID;
          //         openIM.getAllConversationList().then(res=>{
          // //注意 会话对象中latestMsg（会话最后一条消息）仍为Json字符串格式 若需要使用请自行转换
          //         console.log('回话=', JSON.parse(res.data))
          //         console.log('列表信息=', JSON.parse(JSON.parse(res.data)[0].latestMsg))
          //       }).catch(err=>{

          //       })
          //   const options = {
          //   offset: 0,
          //   count: 20
          // }
          // openIM.getConversationListSplit(options).then(({ data })=>{
          //   console.log('获取的数据=', data)
          // }).catch(err=>{
          //   console.log('err===', err)
          // })
        })
        .catch((err) => {
          console.log("login failed...", err);
        });
    };

    onMounted(() => {
      connectIM(userInfo.phone, getIMToken());
      // login();
      // resiger()
    });
    return {
      defaultAvatar,
      operationID,
      convers,
      goChat
    };
  },
};
</script>

<style scoped lang="scss">
.conver {
  display: flex;
  justify-content: space-between;
  border-bottom: 1rpx solid #dbdbdb;
  padding: 10rpx;
  .conver-msg {
    display: flex;
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
