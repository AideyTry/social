<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:38
 * @LastEditTime: 2022-05-14 01:53:07
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <!-- <scroll-view scroll-y class="con"></scroll-view> -->
    <view class="con">
        <MsgItem v-for="(item) in msgList" :key="item.clientMsgID + currentDate" :msg="item" :selfID="userInfo.phone"></MsgItem>
    </view>
  </view>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import MsgItem from './MsgItem.vue'
import { useStore } from "vuex";
export default {
  props: ["msgList"],
  components: {
      MsgItem
  },
  onShow: function(){
    this.currentDate = new Date() + Math.random()
    console.log('this.currentDate===============================', this.currentDate)
    console.log('msgList============', this.msgList)
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;

    let currentDate = ref('')

    onMounted(() => {
    });
    return {
        userInfo,
        currentDate
    };
  },
};
</script>

<style scoped lang="scss">
.con{
    width: 100%;
    height: calc(100vh - 200rpx);
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    // >>> .uni-scroll-view-content{
    // width: 100%;
    // // height: 716px;
    // overflow-x: hidden;
    // overflow-y: auto;
    // display: flex;
    // flex-direction: column-reverse;
    // }
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
