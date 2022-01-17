<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 21:17:51
 * @LastEditTime: 2022-01-17 09:35:06
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="video-detail">
    <view class="title">{{videInfo.title}}</view>
    <text class="abstract">{{videInfo.abstract}}</text>
    <video controls="controls" preload="meta">
      <source :src="videInfo.src">
    </video>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { videoDetail } from "@/api/hobby";
export default {
  onLoad: function (options) {
    console.log("options===", options);
  },
  setup(props, context) {
    console.log("props===", props);
    console.log("context===", context);
    let videInfo = ref({});
    const getVideoDetail = (id) => {
      const params = { id };
      videoDetail(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          videInfo.value = data.data.data;
        }
      });
    };
    onMounted(() => {
      getVideoDetail(props.id);
    });
    return {
      videInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.video-detail {
    padding: 20rpx;
  .title {
    font-size: 40rpx;
    color: #666;
    margin: 16rpx 0 0 0;
    font-weight: normal;
  }
  .abstract{
    //   font-size: 24rpx;
      font-family: Arial, Helvetica, sans-serif;
      color: #666;
  }
}
</style>
