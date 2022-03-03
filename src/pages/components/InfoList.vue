<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-03-01 13:17:37
 * @LastEditTime: 2022-03-03 22:58:55
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
      <view class="li" v-for="item in infoList" :key="item.id">
        <view class="comment">
          <view>回复</view>
          <view><text>2</text></view>
        </view>
        <view class="publish-info">
          <view class="title">{{ item.title }} </view>
          <view class="userinfo">
            <image
              class="avatar"
              mode="aspectFit"
              :src="item.url || ''"
            ></image>
            <text class="username">{{ item.username }}</text>
            <text class="update-time"
              >{{ $filters.commentTime(item.create_time) }}&nbsp;更新</text
            >
          </view>
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
import { ref, onMounted } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
});
let infoList = ref([]);
onMounted(() => {
  console.log("props=", props);
  infoList.value = props.list;
  console.log("infoList.value=", infoList.value);
});
</script>

<style lang="scss" scoped>
.li {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
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
  .username,.update-time {
    margin-left: 30rpx;
  }
}
</style>
