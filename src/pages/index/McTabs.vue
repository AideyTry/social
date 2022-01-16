<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 13:32:17
 * @LastEditTime: 2022-01-16 16:49:39
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
          <view class="nav-line" :style="`{width: ${navItemWidth}rpx}`" v-if="swiperIndex == index"></view>
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
        {{ item.title }}
        <slot></slot>
      </swiper-item>
    </swiper>
  </view>
</template>:enable-flex="true"

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
const list = ref([
  { title: "首页", content: ["首页-1", "首页-2", "首页-3", "首页-4"] },
  {
    title: "测试",
    content: ["测试-1", "测试-2", "测试-3", "测试-4", "测试-5"],
  },
  { title: "我的", content: [] },
  {
    title: "hello",
    content: ["hello-1", "hello-2", "hello-3", "hello-4", "hello-5"],
  },
  {
    title: "测试-1",
    content: ["测试-1-1", "测试-1-2", "测试-1-3", "测试-1-4", "测试-1-5"],
  },
  {
    title: "测试-2",
    content: ["测试-2-1", "测试-2-2", "测试-2-3", "测试-2-4", "测试-2-5"],
  }
]);
let swiperIndex = ref(0);
let navItemWidth = ref(0)
const navItems = reactive([])
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
  navItemWidth.value = navItems[swiperIndex.value].width
  console.log("e=", e);
  console.log('navItemWidth.value=====', navItemWidth.value)
};
onMounted(() => {
    const items = document.querySelectorAll('.nav-item')
    items.forEach(item => {
        console.log('width=', item.offsetWidth)
        navItems.push({width: item.offsetWidth})
    })
    navItemWidth.value = navItems[swiperIndex.value].width
    console.log('items===', items)
    console.log('navItemWidth===', navItemWidth.value)
})
const result = computed(() => `${navItemWidth.value}rpx`)
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
  .nav-item:first-child{
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
</style>