<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2022-01-16 15:44:05
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="content">
    <McTabs>
    </McTabs>
    <!-- <button @click="open">打开弹窗</button> -->
  </view>
</template>

<script>
import McTabs from './McTabs.vue'
export default {
  components: {
    McTabs
  },
  data() {
    return {
      title: "蔓草",
    };
  },
  onLoad() {},
};
</script>

<style>
.content {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  padding: 0 32rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.change-gender {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
