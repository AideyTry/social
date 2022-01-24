<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 13:32:17
 * @LastEditTime: 2022-01-24 17:42:19
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="tabs">
    <scroll-view
      scroll-x
      scroll-with-animaiton
      :enable-flex="true"
      @scroll="handleScroll"
    >
      <view class="nav">
        <view
          class="nav-item"
          v-for="(item, index) in list"
          :key="index"
          :class="swiperIndex == index ? 'nav-item-act' : ''"
          @click="taggleNav(index)"
        >
          <text>{{ item.title }}</text>
          <view
            class="nav-line"
            :style="`{width: ${navItemWidth}rpx}`"
            v-if="swiperIndex == index"
          ></view>
        </view>
      </view>
    </scroll-view>
    <swiper
      :current="swiperIndex"
      :duration="300"
      class="swiper"
      @change="swiperChange"
    >
      <swiper-item v-for="(item, index) in list" :key="index">
        <scroll-view scroll-y="true" class="swiper-scroll">
          <uni-list v-if="index === 0">
            <uni-list-item
              :title="item.title"
              :ellipsis="item.title"
              :note="item.description"
              v-for="item in videos"
              :key="item.id"
              direction="column"
              class="content-item"
            >
              <template v-slot:header>
                <view class="uni-thumb uni-content list-picture">
                  <image
                    v-if="item.img"
                    class="slot-image"
                    :src="item.img"
                    mode="widthFix"
                     @click="goDetail(item)"
                  ></image>
                  <view class="hint" v-if="item.hintTitle || item.dateSrc">
                    <!-- <text v-if="item.hintTitle">By</text> -->
                    <text v-if="item.hintTitle" class="hint-title">{{ item.hintTitle }}</text>
                    <text class="hint-date">{{ item.dateSrc }}</text>
                  </view>
                </view>
              </template>
              <template v-slot:body>
                <view class="content-body">
                  <view class="title-wraper"
                    @click="goDetail(item)"
                    ><text class="title">{{ item.title }}</text
                    ><view class="video"><uni-icons style="vertical-align: middle;" type="videocam" size="20" color="#999"></uni-icons
                  ><text>VIDEO</text></view></view>
                  <view class="description">{{ item.description }}</view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
          <view v-else>待上线</view>
        </scroll-view>
        <!-- <slot></slot> -->
      </swiper-item>
    </swiper>
  </view>
</template>:enable-flex="true"

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { getVideoList } from "@/api/hobby.js";
const list = ref([
  { title: "英语", content: [] },
  {
    title: "狼人杀",
    content: [],
  },
  { title: "剧本杀", content: [] },
  {
    title: "登山",
    content: [],
  },
  {
    title: "旅游",
    content: [],
  },
]);
let swiperIndex = ref(0);
let navItemWidth = ref(0);
const navItems = reactive([]);
// let navItemWidth = ref(0)
const handleScroll = (e) => {
  console.log("e=", e);
};
const taggleNav = (index) => {
  swiperIndex.value = index;
};
const swiperChange = (e) => {
  const {
    detail: { current },
  } = e;
  swiperIndex.value = current;
  navItemWidth.value = navItems[swiperIndex.value].width;
  console.log("e=", e);
  console.log("navItemWidth.value=====", navItemWidth.value);
};
onMounted(() => {
  const items = document.querySelectorAll(".nav-item");
  if(items.length > 0){
  items.forEach((item) => {
    console.log("width=", item.offsetWidth);
    navItems.push({ width: item.offsetWidth });
  });
  navItemWidth.value = navItems[swiperIndex.value].width;
  console.log("items===", items);
  console.log("navItemWidth===", navItemWidth.value);
  getEnglishVideos();
  }
});
const result = computed(() => `${navItemWidth.value}rpx`);

// 英语
let videos = ref([]);
var getEnglishVideos = () => {
  getVideoList().then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      videos.value = data.data.data;
    }
  });
};
const goDetail = (item) => {
  console.log('item===', item)
  uni.navigateTo({
    url: `/pages/index/VideoDetail?id=${item.id}`
});
}
</script>

<style lang="scss" scoped>
.tabs {
}
.nav {
  white-space: nowrap;
  position: relative;
  height: 60rpx;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #dcdfe6;
  .nav-item {
    display: inline-block;
    margin: 0 16rpx;
    text-align: center;
    transition: color 0.3s ease;
    position: relative;
  }
  .nav-item:first-child {
    margin-left: 0;
  }
  .nav-line {
    position: absolute;
    bottom: -24rpx;
    // width: v-bind(result);
    width: 60rpx;
    height: 4rpx;
    border-radius: 10rpx;
    background-color: pink;
    transition: left 0.3s ease;
  }
}
.nav-item-act {
  color: pink;
  font-weight: bolder;
}
.swiper {
  height: calc(100vh - 80upx);
}
.swiper-scroll {
  height: 100%;
  .content-item {
    .hint {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      color: #999999;
      margin-bottom: 10rpx;
      text:first-child {
        margin-right: 20rpx;
      }
    }
    .hint-title {
      color: #014073;
      margin-right: 20rpx;
    }
    .hint-date {
      // margin-left: 20rpx;
    }
    .content-body {
      .title-wraper{
        display: inline-block;
        text-align: left;
      .title {
        // display: inline-block;
        font-size: 40rpx;
        font-family: "Times New Roman", Times, serif;
        color: #000;
      }
      .video{
        display: inline-block;
        color: #999999;
        font-size: 16rpx;
      }
      }
      .description {
        // text-align: left;
        // margin-top: 10rpx;
        // color: #666;
        // font-size: 32rpx;
        // font-family: Arial, Helvetica, sans-serif;
        color: #666;
        font-size: 32rpx;
        font-family: Arial, Helvetica, sans-serif;
        margin-top: 10rpx;
        line-height: 40rpx;
      }
    }
  }
}
</style>