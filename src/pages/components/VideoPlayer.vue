<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-03-19 14:23:05
 * @LastEditTime: 2022-03-25 15:48:11
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="video-wraper">
    <!-- #ifdef H5 -->
    <video id="video" ref="refdVideo" :src="src" :poster="poster" class="video"></video>
    <!-- #endif -->
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
// import Hls2 from "hls.js";

const props = defineProps({
  options: {
    type: Object,
    default: {
      src: "",
      poster: ''
    },
  },
});

const src = ref("");
const poster = ref("")

const videoInit = () => {
  console.log('props.options=', props.options)
  src.value = props.options.src;
  poster.value = props.options.poster
};

watch(
  () => {
    return props.options;
  },
  (state) => {
    videoInit();
  },
  {
    deep: true,
  }
);

onMounted(() => {
    videoInit();
});
</script>

<style scoped lang="scss">
.video-wraper {
  // width: 400rpx;
  // height: 300rpx;
  .video{
    width: 100%;
    height: 554rpx;
  }
}
</style>
