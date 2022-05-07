<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:38
 * @LastEditTime: 2022-05-07 23:32:39
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <scroll-view scroll-y class="con">
        <MsgItem v-for="(item) in messageInfo" :key="item.clientMsgID" :msg="item"></MsgItem>
    </scroll-view>
  </view>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import openIM from "@/utils/openIM.js";
import MsgItem from './MsgItem.vue'
export default {
  components: {
      MsgItem
  },
  setup() {
    let recvInfo = ref({});
    let sendInfo = ref({});
    const messageInfo = ref([]);
    const getConver = () => {
      openIM.on("OnRecvNewMessage", (data) => {
        console.log("on 触发=", data);
        console.log("数据=", JSON.parse(data.data));
        const RecvMessage = JSON.parse(data.data);
        if (RecvMessage.contentType === 101) {
          sendInfo = {
            senderFaceUrl: RecvMessage.senderFaceUrl,
            senderNickname: RecvMessage.senderNickname,
            content: RecvMessage.content,
            sendTime: RecvMessage.sendTime,
          };
        //   messageInfo.push(sendInfo);
        }
      });
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
          messageInfo.value = [...JSON.parse(data).reverse()]
        })
        .catch((err) => {});
    };
    onMounted(() => {
        getConver()
    });
    return {
        messageInfo
    };
  },
};
</script>

<style scoped lang="scss">
.con{
    width: 100%;
    // height: 716px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    // &_nomore{
    //     font-size: 12px;
    //     color: #777;
    //     text-align: center;
    //     padding: 8px;
    // }
    // /*滚动条 start*/
    // &::-webkit-scrollbar {
    //     width: 7px;
    //     height: 4px;
    //     background-color: #f5f5f5;
    //   }
    //   /*定义滚动条轨道 内阴影+圆角*/
    //   &::-webkit-scrollbar-track {
    //     box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    //     background: #fff;
    //   }
    //   /*定义滑块 内阴影+圆角*/
    //   &::-webkit-scrollbar-thumb {
    //     border-radius: 3px;
    //     box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    //     background-color: rgba(245, 238, 238, 0.7);
    //   }
    //   &::-webkit-scrollbar-thumb:hover {
    //     border-radius: 3px;
    //     box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    //     background-color: rgba(245, 238, 238, 1);
    //   }
}
</style>
