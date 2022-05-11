<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-05-07 23:18:37
 * @LastEditTime: 2022-05-11 16:27:26
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view :class="{ 'chat_bg_msg': true, 'chat_bg_omsg': myMsg }">
    <image
      :src="
        msg.senderFaceUrl && msg.senderFaceUrl.includes('https://')
          ? msg.senderFaceUrl
          : defaultAvatar
      "
      class="chat_bg_msg_icon"
    />
    <view class="content-wraper" :class="{'chat_bg_msg_content_text': msg.sendID === selfID}">
      <text>{{ msg.content }}</text>
      <text>{{ $filters.formatMsgDate(msg.sendTime) }}</text>
    </view>
    <view :style="{color: msg.isRead ? '#999':'#428BE5'}" v-if="msg.sendID === selfID">{{msg.isRead ? '已读' : '未读'}}</view>
  </view>
</template>

<script>
import { onMounted, computed, ref } from "vue";
export default {
  props: ["msg", "selfID"],
  setup(props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const myMsg = computed(() => props.selfID === props.msg.sendID).value;
    console.log('mySmg', myMsg)
    console.log("props===", props);
    return {
      defaultAvatar,
      myMsg
    };
  },
};
</script>

<style scoped lang="scss">
.chat_bg_msg {
  display: flex;
  padding: 12px 24px;
}
.chat_bg_omsg {
  flex-direction: row-reverse;
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
  text:first-child {
    align-self: flex-start;
    color: #363636;
  }
  text:last-child {
    align-self: flex-end;
    color: #999;
    font-size: 12rpx;
  }
}
.chat_bg_msg_content_text{
    background-color: #E7F4FD;
}
</style>
