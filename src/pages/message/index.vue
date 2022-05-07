<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:38
 * @LastEditTime: 2022-05-07 23:45:46
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <ChatContent :key="operationID"></ChatContent>
  </view>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import openIM from "@/utils/openIM.js";
import { getIMToken } from "../../utils/auth.js";
import { useStore } from "vuex";
import ChatContent from './ChatContent.vue'
export default {
  components: {
    ChatContent
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;
    let operationID = ref(null)
    const connectIM = (userID, token) => {
      console.log("userID, token=====================", userID, token);
      const config = {
        userID,
        token,
        url: "wss://42.192.229.151:10003",
        platformID: 5,
      };
      openIM
        .login(config)
        .then((res) => {
          console.log("login suc...", res);
          operationID.value = res.operationID
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
      operationID
    };
  },
};
</script>

<style></style>
