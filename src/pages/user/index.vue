<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:52:36
 * @LastEditTime: 2022-02-27 11:42:35
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="userinfo-wraper">
    <view class="userinfo">
      <view class="avatar-warper" @click="onUserInfo">
        <image
          :src="userInfo.avatar ? userInfo.avatar : defaultAvatar"
          class="avatar"
        ></image>
        <text class="avatar-title">请上传图片</text>
      </view>
      <view class="userinfo-detail">
        <text>用户名：{{ userInfo.username }}</text>
        <text>签&nbsp;&nbsp;名: {{ userInfo.motto }}</text>
      </view>
    </view>
    <view class="fans-wraper">
      <view class="follows"><text>关注</text>&nbsp;<text>{{ follows }}</text></view>
      <view class="fans"><text>粉丝</text>&nbsp;<text>{{ fans }}</text></view>
    </view>
    <button @click="onLogout">退出</button>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { removeToken } from "../../utils/auth";
import { getFollows, getFans } from "@/api/communication.js";

const defaultAvatar = "/static/images/default_avatar.png";
const store = useStore();
const userInfo = computed(() => store.state.user.userInfo).value;

const onLogout = () => {
  new Promise((resolve, reject) => {
    removeToken();
    resolve();
  }).then(() => {
    location.reload();
  });
};

const onUserInfo = () => {
  uni.navigateTo({
    url: "/pages/user/info/index",
  });
};

// fans
let follows = ref(0);
let fans = ref(0);
let getFollowsData = () => {
  getFollows().then((data) => {
    console.log("getfollows =", data);
    if (data.data.code === 200) {
      follows.value = data.data.follows;
    }
  });
};
let getFansData = () => {
    getFans().then((data) => {
    console.log("getfans =", data);
    if (data.data.code === 200) {
      fans.value = data.data.fans;
    }
  });
}

onMounted(() => {
  getFollowsData();
  getFansData()
});
</script>

<style lang="scss" scoped>
.userinfo-wraper {
  padding: 40rpx;
}
.userinfo {
  display: flex;
  .userinfo-detail {
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.avatar-warper {
  position: relative;
}
.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.avatar-title {
  position: absolute;
  left: 6%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12rpx;
}

  .fans-wraper {
    display: flex;
    justify-content: center;
  }
  .follows {
  }
  .fans {
    margin-left: 20rpx;
    padding-left: 20rpx;
    position: relative;
  }
  .fans:before {
    content: "";
    height: 80%;
    position: absolute;
    top: 10%;
    left: 0;
    border-left: 1px solid #ccc;
  }
</style>
