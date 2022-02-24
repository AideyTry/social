<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-24 14:06:50
 * @LastEditTime: 2022-02-24 23:28:14
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
    >
      <image
        :style="{
          width: waterfallImageWidth + 'rpx',
          height: item.height + 'rpx',
        }"
        :src="item.src"
      ></image>
      <view class="hobby-title">{{ item.title }}</view>
      <view class="hobby-info"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "waterFall",
};
</script>

<script setup>
import { ref, reactive, onMounted, onUpdated, getCurrentInstance } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
});
let waterfallList = ref([]); // 需要渲染的数据列表
let waterfallImageWidth = ref(343); // 每一列宽度
let waterfallImageCol = ref(2); // 每行显示几列
let waterfallImageRight = ref(20); // 右边距
let waterfallImageBottom = ref(20); // 下边距
let waterfallDeviationHeight = ref([]); // 存放瀑布流各个列的高度

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
    const query = uni.createSelectorQuery().in(getCurrentInstance);
    console.log('query===', query)
    query.select('.hobby-title').boundingClientRect(data => {
  console.log("得到布局位置信息===" + data);
  // console.log("节点离页面顶部的距离为" + data.top);
}).exec()
    // console.log('hobbyTitle=', hobbyTitle)
    const img = await new Promise((resolve) => {
      image.onload = (e) => {
        console.log("e=", e);
        let imageData = {};
        imageData.height =
          (waterfallImageWidth.value / image.width) * image.height;
        imageData.src = props.list[i].url;
        imageData.title = props.list[i].title;
        waterfallList.value.push(imageData);
        rankImage(imageData);
        resolve(imageData);
      };
    });
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

onMounted(() => {
  console.log("list1=", props.list);
  initWaterfall();
});
onUpdated(() => {
  console.log("list2=", props.list);
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
</style>
