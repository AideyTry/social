<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:52:36
 * @LastEditTime: 2022-03-30 18:21:20
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
        <text class="avatar-title" v-if="!userInfo.avatar">请上传图片</text>
      </view>
      <view class="userinfo-detail">
        <text>用户名：{{ userInfo.username }}</text>
        <text>签&nbsp;&nbsp;名: {{ userInfo.motto }}</text>
      </view>
    </view>
    <view class="fans-wraper">
      <view class="follows"
        ><text>关注</text>&nbsp;<text>{{ follows }}</text></view
      >
      <view class="fans"
        ><text>粉丝</text>&nbsp;<text>{{ fans }}</text></view
      >
    </view>
    <view class="publish-wraper">
      <view class="my-publishs" @click="changeTab(0)">
        <text>我发布的</text>
        <view :class="{ active: activeIndex === 0 }"></view>
      </view>
      <view class="my-likes" @click="changeTab(1)">
        <text>我喜欢的</text>
        <view :class="{ active: activeIndex === 1 }"></view>
      </view>
    </view>
    <view>
      <InfoList :list="publishs" v-if="publishs.length" />
    </view>
    <button @click="onLogout" style="margin-top: 20rpx;">退出</button>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { removeToken } from "../../utils/auth";
import { getFollows, getFans } from "@/api/communication.js";
import { getPublish, getMylikes } from "@/api/publish.js";

import InfoList from "@/pages/components/InfoList.vue";

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
};

// publish
let activeIndex = ref(0);
let publishs = ref([]);

const getPublishData = () => {
  getPublish().then((data) => {
    console.log("data getPublish=", data);
    if (data.data.code === 200) {
      publishs.value = data.data.data;
    }
  });
};

// 喜爱
let likes = ref([]);
const getMylikesData = () => {
  getMylikes().then((data) => {
    console.log("data likes=", data);
    if (data.data.code === 200) {
      likes.value = data.data.data;
    }
  });
};

const changeTab = (flag) => {
  activeIndex.value = flag;
};

watchEffect(() => {
  if (activeIndex.value === 0) {
    getPublishData();
  } else {
    getMylikesData();
  }
}, activeIndex.value);

onMounted(() => {
  getFollowsData();
  getFansData();
  getPublishData();
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
.publish-wraper {
  display: flex;
  justify-content: center;
  margin: 20rpx 0;
  padding-top: 20rpx;
  border-top: 1rpx solid #ccc;
  // border-bottom: 1rpx solid #ccc;
  .my-publishs,
  .my-likes {
    font-size: 28rpx;
    position: relative;
  }
  .my-likes {
    margin-left: 40rpx;
  }
  .active {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -10rpx;
    width: 100%;
    height: 0.1875rem;
    border-radius: 0.125rem;
    background-color: #ff8200;
  }
}
</style>
