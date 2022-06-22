<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-24 14:06:50
 * @LastEditTime: 2022-06-22 15:44:04
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="waterfall">
    <view
      class="waterfall-item"
      :style="{
        top: item.top + 'rpx',
        left: item.left + 'rpx',
      }"
      v-for="item in waterfallList"
      :key="item.id"
      @click="goDetail(item)"
    >
      <view class="waterfall-image-wrapper">
      <image
        class="waterfall-image"
        mode="widthFix"
        :style="{ width: waterfallImageWidth + 'rpx' }"
        :src="item.src"
      ></image>
     <!-- <svg class="video-icon" v-if="item.fileType" aria-hidden="true">
        <use xlink:href="#icon-videofill"></use>
      </svg> -->
      <span v-if="item.fileType" class="iconfont video-icon">&#xe7c7;</span>
      </view>
      <view class="hobby-title" ref="hobbyTitle">{{ item.title }}</view>
      <view class="hobby-info">
        <view class="info">
          <image class="avatar" mode="aspectFit" :src="item.avatar"></image>
        <text>{{ item.username }}</text>
        </view>
        <view>
          <!-- <svg v-if="item.likeFlag" class="icon" aria-hidden="true" @click.stop="like(item)">
            <use xlink:href="#icon-xihuan1"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click.stop="like(item)">
            <use xlink:href="#icon-xihuan"></use>
          </svg> -->
          <span v-if="item.likeFlag" style="color: #f00;" class="iconfont" @click.stop="like(item)">&#xe86f;</span>
          <span v-else class="iconfont" @click.stop="like(item)">&#xe86f;</span>
          <text style="margin-left: 10rpx;">{{item.likes}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "waterFall",
};
</script>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  onUpdated,
  getCurrentInstance,
  watchEffect,
} from "vue";

import { getLike, setLike } from "@/api/communication.js";

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  activeIndex: {
    type: Number,
    default: 1,
  }
});
let waterfallList = ref([]); // 需要渲染的数据列表
let waterfallImageWidth = ref(328); // 每一列宽度
let waterfallImageCol = ref(2); // 每行显示几列
let waterfallImageRight = ref(20); // 右边距
let waterfallImageBottom = ref(20); // 下边距
let waterfallDeviationHeight = ref([]); // 存放瀑布流各个列的高度
let hobbyTitle = ref(null);
let waterfall = ref(null);
const initWaterfall = () => {
  waterfallDeviationHeight.value = new Array(waterfallImageCol.value);
  for (let i = 0; i < waterfallDeviationHeight.value.length; i++) {
    waterfallDeviationHeight.value[i] = 0;
  }
  imagePreLoading();
};

/**
 * @description: 图片预加载
 * @param {*}
 * @Author:
 * @return {*}
 */
const imagePreLoading = async () => {
  for (let i = 0; i < props.list.length; i++) {
    let image = new Image();
    image.src = props.list[i].url;
    console.log("waterfall==", waterfall.value);
    const img = await new Promise((resolve) => {
      image.onload = (e) => {
        console.log("e=", e);
        let imageData = {};
        imageData.height =
          (waterfallImageWidth.value / image.width) * image.height + 160;
        imageData.id = props.list[i].id;
        imageData.src = props.list[i].url;
        imageData.title = props.list[i].title;
        imageData.avatar = props.list[i].avatar;
        imageData.username = props.list[i].username;
        imageData.likes = props.list[i].likes;
        imageData.fileType = props.list[i].fileType
        waterfallList.value.push(imageData);
        rankImage(imageData);
        resolve(imageData);
      };
    });
    getLikes()
    console.log("img==", img);
  }
};

const rankImage = (imageData) => {
  const min = Math.min.apply(null, waterfallDeviationHeight.value);
  let minIndex = waterfallDeviationHeight.value.indexOf(min);
  imageData.top = waterfallDeviationHeight.value[minIndex];
  imageData.left =
    minIndex * (waterfallImageRight.value + waterfallImageWidth.value);
  waterfallDeviationHeight.value[minIndex] +=
    imageData.height + waterfallImageBottom.value;
  console.log("imageData==", imageData);
};

const goDetail = (item) => {
  console.log('item=', item)
  console.log('props===', props)
    uni.navigateTo({
    url: `/pages/index/HobbyDetailMountain?id=${item.id}&hobby=${props.activeIndex}`,
  });
}

// 点赞
const like = (item) => {
  console.log('item=', item)
  // item.likeFlag = true
  let likeIds = uni.getStorageSync('like') || []
  if(likeIds.includes(item.id)){
    console.log('isOK=', likeIds)
    for(let i = 0;i < likeIds.length; i++){
      if(likeIds[i] === item.id){
        likeIds.splice(i, 1)
      }
    }
    item.likes -= 1
    item.likeFlag = false
    uni.setStorageSync('like', likeIds)
  } else {
      
  item.likes += 1
  item.likeFlag = true
  console.log('likeIds=', likeIds)
  likeIds.unshift(item.id)
  uni.setStorageSync('like', likeIds)
  }
  const params = { hobby: props.activeIndex, hobbyId: item.id }
  setLike(params).then(data => {
    console.log('like data=', data)
  })

}

const getLikes = () => {
  const params = {
    hobby: props.activeIndex
  }
  getLike(params).then(data => {
    console.log('getLike=', data)
                if (data.data.code === 200) {
          const ids = data.data.likes.map(item => item.hobby_id)
          uni.setStorageSync('like', ids)
          for(let i= 0; i < waterfallList.value.length; i++){
            if(ids.includes(waterfallList.value[i].id)){
              waterfallList.value[i].likeFlag = true
            } else {
              waterfallList.value[i].likeFlag = false
            }
          }
          console.log('waterfallList====', waterfallList.value)
        }
  })
}

onMounted(() => {
  console.log("list1=", props.list);
  initWaterfall();
});
onUpdated(() => {
  console.log("list2=", props.list);
  // initWaterfall();
});

watchEffect(() => {
  initWaterfall();
});
</script>

<style lang="scss" scoped>
.waterfall {
  width: 100%;
  height: 100%;
  position: relative;
}
.waterfall-item {
  position: absolute;
  float: left;
}
.waterfall-image-wrapper{
  position: relative;
  .waterfall-image{
    position: absolue;
  }
  .video-icon{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2em;
    height: 2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    opacity: 0.6;
  }
}
.hobby-title {
  position: relative;
  // bottom: 0;
  padding: 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #363636;
  background-color: #fff;
}
.hobby-info {
  display: flex;
  background-color: #fff;
  padding:0 20rpx 20rpx;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  .info{
    display: flex;
    align-items: center;
  }
.avatar {
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 20rpx;
  }
}
</style>
