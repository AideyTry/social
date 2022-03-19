<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 21:17:51
 * @LastEditTime: 2022-03-19 23:48:00
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="video-detail">
    <view class="title">{{ videInfo.title }}</view>
    <text class="abstract">{{ videInfo.abstract }}</text>
    <VideoPlayer :options="options"></VideoPlayer>
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
import VideoPlayer from "@/pages/components/VideoPlayer.vue";
export default {
  components: {
    VideoPlayer
  },
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

    const options = reactive({
      poster: '//img2.chinadaily.com.cn/images/202201/13/61e00901a310cdd3d826b064.jpeg',
      src: "https://social-1308251497.cos.ap-guangzhou.myqcloud.com/video/695c8c8a78f7e9a184a17db72e734a63/695c8c8a78f7e9a184a17db72e734a63.m3u8", //视频源
    });

    onMounted(() => {
      getVideoDetail(props.id);
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
