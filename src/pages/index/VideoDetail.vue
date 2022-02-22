<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 21:17:51
 * @LastEditTime: 2022-02-22 11:05:33
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="video-detail">
    <view class="title">{{ videInfo.title }}</view>
    <text class="abstract">{{ videInfo.abstract }}</text>
    <!-- <video id="video"></video> -->
    <vue3VideoPlay
      :width="options.width"
      :height="options.height"
      title="冰河世纪"
      :src="options.src"
      :type="options.type"
      :autoPlay="false"
    />
    <uni-list>
    <uni-list-item :note="item.section" v-for="item in videInfo.sections" :key="item.id">
      <template v-slot:body>
        <view class="description">{{ item.section }}</view>
      </template>
    </uni-list-item>
</uni-list>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { videoDetail } from "@/api/hobby";
import Hls from "hls.js";
export default {
  onLoad: function(options) {
    console.log("options===", options);
  },
  setup(props, context) {
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
    /**
     * @description: 通过hls将m3u8转化为video可播放的资源地址
     * @param {*}
     * @Author:
     * @return {*}
     */

    const getM3u8Resorce = () => {
      const video = document.querySelector("#video");
      const videoSrc = "https://www.mancao.social/video/output.m3u8";
      console.log("Hls===", Hls);
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        console.log("hls====", hls);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      }
      console.log("video=", video);
    };

    const options = reactive({
      width: '100%',
      height: '280px',
      src: "/download/video/695c8c8a78f7e9a184a17db72e734a63/695c8c8a78f7e9a184a17db72e734a63.m3u8", //视频源
      type: "m3u8", //视频类型
    });

    onMounted(() => {
      getVideoDetail(props.id);
      // getM3u8Resorce()
    });
    return {
      videInfo,
      options
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
  .abstract {
    //   font-size: 24rpx;
    font-family: Arial, Helvetica, sans-serif;
    color: #666;
  }
  .description{
    font-size: 32rpx;
    margin: 0 0 30rpx 0;
    text-align: left;
    line-height: 1.6;
    color: #666;
  }
}
</style>
