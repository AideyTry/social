<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-24 14:06:50
 * @LastEditTime: 2022-06-24 17:20:23
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="waterfall">
    <view hidden>
      <view v-for="item in props.list" :key="item.id">
        <image
          :src="item.url"
          @load="loadImg($event, item)"
        ></image>
      </view>
    </view>
    <view class="list" v-for="list in waterfall" :key="list.height">
      <view v-for="item in list.list" :key="item.id" @click="goDetail(item)">
        <text>{{ item.title }}</text>
        <view class="waterfall-image-wrapper">
          <image
            class="waterfall-image"
            mode="widthFix"
            :style="{ width: waterfallImageWidth + 'rpx' }"
            :src="item.url"
          ></image>
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
            <span
              v-if="item.likeFlag"
              style="color: #f00"
              class="iconfont"
              @click.stop="like(item)"
              >&#xe86f;</span
            >
            <span v-else class="iconfont" @click.stop="like(item)"
              >&#xe86f;</span
            >
            <text style="margin-left: 10rpx">{{ item.likes }}</text>
          </view>
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
  onUnmounted,
  onUpdated,
  onBeforeUnmount,
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
  },
});
let waterfallList = ref([]); // 需要渲染的数据列表

let lists = ref(props.list);
let waterfall = reactive([
  {
    height: 0,
    list: [],
  },
  {
    height: 0,
    list: [],
  },
]);

let waterfallImageWidth = ref(328); // 每一列宽度

const goDetail = (item) => {
  console.log("item=", item);
  console.log("props===", props);
  uni.navigateTo({
    url: `/pages/index/HobbyDetailMountain?id=${item.id}&hobby=${props.activeIndex}`,
  });
};

const loadImg = (ev, item) => {
  console.log("ev================", ev);
  console.log("item================,", item);
  let height = ev.detail.height * waterfallImageWidth.value / ev.detail.width;
  console.log('height==================', height)
  // 根据当前高度决定将新数据给谁，并更新列高度；优先插入左侧
  if (waterfall[0].height <= waterfall[1].height) {
    // 考虑热度优先的问题， 所以用的是shift()方法推出头部数据。
    waterfall[0].list.push(lists.value.shift());
    waterfall[0].height += height;
  } else {
    waterfall[1].list.push(lists.value.shift());
    waterfall[1].height += height;
  }
};

// 点赞
const like = (item) => {
  console.log("item=", item);
  // item.likeFlag = true
  let likeIds = uni.getStorageSync("like") || [];
  if (likeIds.includes(item.id)) {
    console.log("isOK=", likeIds);
    for (let i = 0; i < likeIds.length; i++) {
      if (likeIds[i] === item.id) {
        likeIds.splice(i, 1);
      }
    }
    item.likes -= 1;
    item.likeFlag = false;
    uni.setStorageSync("like", likeIds);
  } else {
    item.likes += 1;
    item.likeFlag = true;
    console.log("likeIds=", likeIds);
    likeIds.unshift(item.id);
    uni.setStorageSync("like", likeIds);
  }
  const params = { hobby: props.activeIndex, hobbyId: item.id };
  setLike(params).then((data) => {
    console.log("like data=", data);
  });
};

const getLikes = () => {
  const params = {
    hobby: props.activeIndex,
  };
  getLike(params).then((data) => {
    console.log("getLike=", data);
    if (data.data.code === 200) {
      const ids = data.data.likes.map((item) => item.hobby_id);
      uni.setStorageSync("like", ids);
      for (let i = 0; i < waterfallList.value.length; i++) {
        if (ids.includes(waterfallList.value[i].id)) {
          waterfallList.value[i].likeFlag = true;
        } else {
          waterfallList.value[i].likeFlag = false;
        }
      }
      console.log("waterfallList====", waterfallList.value);
    }
  });
};

watchEffect(() => {
  lists.value = props.list;
});

onMounted(() => {
  console.log("list1=", props.list);
  console.log("6666lists================", lists);
});
onUpdated(() => {
  console.log("list2=", props.list);
  console.log("6666lists================", lists.value);
  console.log("waterfall.value===", waterfall);
  // initWaterfall();
});
onBeforeUnmount(() => {
    console.log('onBeforeUnmount==========================')
})
onUnmounted(() => {
  console.log('===卸载啦。。。。。。。。。。。。。。。。。。。。。')
  waterfall = reactive([
    {
      height: 0,
      list: [],
    },
    {
      height: 0,
      list: [],
    },
  ]);
});
</script>

<style lang="scss" scoped>
.waterfall {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.waterfall-item {
  position: absolute;
  float: left;
}
.waterfall-image-wrapper {
  position: relative;
  .waterfall-image {
    position: absolue;
  }
  .video-icon {
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
  padding: 0 20rpx 20rpx;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  .info {
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
