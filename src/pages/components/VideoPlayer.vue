<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-03-19 14:23:05
 * @LastEditTime: 2022-03-27 19:27:39
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="video-wraper">
    <video id="video" ref="refdVideo" :src="srcObj.src" :poster="srcObj.poster" class="video"></video>
  </view>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
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

const srcObj = reactive({
  src: '',
  poster: ''
})
const poster = ref("")

const videoInit = () => {
  console.log('props.options=', props.options)
  srcObj.src = props.options.src;
  srcObj.poster = props.options.poster
};

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
