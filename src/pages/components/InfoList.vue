<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-03-01 13:17:37
 * @LastEditTime: 2022-04-21 22:19:45
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="info-list">
    <!-- <uni-list>
      <uni-list-item
        v-for="item in infoList"
        :key="item.id"
        :title="item.username"
        :note="item.title"
        :thumb="item.avatar"
        thumb-size="lg"
      ></uni-list-item>
    </uni-list> -->
    <view class="ul">
      <view class="li" v-for="item in infoList" :key="item.id"  @click="goDetail(item)">
        <view class="comment">
          <svg class="replay-icon" aria-hidden="true">
            <use xlink:href="#icon-pinglunhuifu"></use>
          </svg>
          <view><text>{{item.comments || 0}}</text></view>
        </view>
        <view class="publish-info">
          <view class="title">{{ item.title }} </view>
          <view class="userinfo">
            <image
              class="avatar"
              mode="aspectFit"
              :src="item.avatar || ''"
            ></image>
            <text class="username">{{ item.username }}</text>
            <text class="update-time"
              >{{ $filters.commentTime(item.create_time || '') }}&nbsp;更新</text
            >
          </view>
        </view>
        <view class="img">
            <image
              class="img-url"
              mode="aspectFit"
              :src="item.url || ''"
            ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "infoList",
};
</script>

<script setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  activeIndex: {
    type: Number,
    default: 0
  }
});
let infoList = ref([]);

const goDetail = (item) => {
  console.log('item=', item)
  if(props.activeIndex === 0){
    uni.navigateTo({
    url: `/pages/user/info/PublicDetail?id=${item.id}&hobby=${item.hobby}`
  });
  } else {
    uni.navigateTo({
      url: `/pages/user/info/LikeDetail?id=${item.id}&hobby=${item.hobby}`
    });
  }
}

watch(
  () => props.list,
  (state) => {
    console.log("state=", state);
    infoList.value = state;
  },
  {
    deep: true,
  }
);

onMounted(() => {
  console.log("props=", props);

  // console.log("infoList.value=", infoList.value);
});
</script>

<style lang="scss" scoped>
.li {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  .img{
    margin-left: 20rpx;
    width: 133rpx;
    height: 100rpx;
    .img-url{
      width: 100%;
      height: 100%;
    }
  }
}
.publish-info {
  margin-left: 40rpx;
  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #363636;
  }
}

.userinfo {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #363636;
  .avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 10rpx;
  }
  .username,
  .update-time {
    margin-left: 30rpx;
  }
}
  .replay-icon{
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
