<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:52:36
 * @LastEditTime: 2022-07-24 17:29:23
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
        <view class="title-wraper">
          <text class="username">用户名：{{ userInfo.username }}</text>
          <view @click="onSetting" class="config-wraper">
            <span class="iconfont"> &#xe68f; </span>
            <text>设置</text>
          </view>
        </view>
        <view class="motto"
          ><text>签&nbsp;&nbsp;&nbsp;名：</text
          ><text>{{ userInfo.motto }}</text></view
        >
      </view>
    </view>
    <view class="fans-wraper">
      <view class="follows" @click="goFollows"
        ><text>关注</text>&nbsp;<text>{{ follows.length }}</text></view
      >
      <view class="fans" @click="goFans"
        ><text>粉丝</text>&nbsp;<text>{{ fans.length }}</text></view
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
      <InfoList :list="publishs" :activeIndex="activeIndex" />
    </view>
    <view v-if="false">
      <button @click="onOpenIMLogout">OpenIM logout</button>
      <button @click="onDeleteConversation">Delete Conversicon</button>
    </view>
  </view>
</template>

<script>
import { getTotalIM } from "@/utils/storage.js";
export default {
  onShow: function () {
    if (getTotalIM() > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: "···",
      });
    } else {
      uni.removeTabBarBadge({
        index: 2,
      });
    }
  },
  onPullDownRefresh() {
    this.getFollowsData();
    this.getFansData();
    uni.stopPullDownRefresh();
  },
};
</script>

<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { getFollows, getFans } from "@/api/communication.js";
import { getPublish, getMylikes } from "@/api/publish.js";

import InfoList from "@/pages/components/InfoList.vue";

import openIM from "@/utils/openIM.js";

const defaultAvatar = "/static/images/default_avatar.png";
const store = useStore();
const userInfo = computed(() => store.state.user.userInfo).value;

const onSetting = () => {
  uni.navigateTo({
    url: `/pages/user/setting/Setting`,
  });
};

const onUserInfo = () => {
  //#ifdef APP-PLUS || H5
  uni.navigateTo({
    url: "/pages/user/info/index",
  });
  //#endif
  //#ifdef MP-WEIXIN
  uni.navigateTo({
    url: "/pages/userInfo/infoIndex/InfoIndex",
  });
  //#endif
};

// fans
let follows = ref([]);
let fans = ref([]);
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

const goFollows = () => {
  const userids = [];
  for (let item of follows.value) {
    userids.push(item.follow_id);
  }
  uni.navigateTo({
    url: `/pages/user/info/Follow?type=${0}&userids=${encodeURIComponent(
      JSON.stringify(userids)
    )}`,
  });
};

const goFans = () => {
  const userids = [];
  for (let item of fans.value) {
    userids.push(item.user_id);
  }
  uni.navigateTo({
    url: `/pages/user/info/Follow?type=${1}&userids=${encodeURIComponent(
      JSON.stringify(userids)
    )}`,
  });
};

// publish
let activeIndex = ref(0);
let publishs = ref([]);

const getPublishData = () => {
  publishs.value = [];
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
  publishs.value = [];
  getMylikes().then((data) => {
    console.log("data likes=", data);
    if (data.data.code === 200) {
      publishs.value = data.data.data;
    }
  });
};

const changeTab = (flag) => {
  activeIndex.value = flag;
};

const onOpenIMLogout = () => {
  openIM
    .logout()
    .then(({ data }) => {
      console.log("logout=", data);
    })
    .catch((err) => {
      console.log("logout err=", err);
    });
};

const onDeleteConversation = () => {
  openIM
    .getAllConversationList()
    .then((res) => {
      //注意 会话对象中latestMsg（会话最后一条消息）仍为Json字符串格式 若需要使用请自行转换
      console.log("res========", res);
      const conversData = JSON.parse(res.data);
      conversData.forEach((item) => {
        openIM
          .deleteConversation(item.conversationID)
          .then((res) => {
            console.log("delete res=", res);
          })
          .catch((err) => {
            console.log("err=========", err);
          });
      });
      console.log("conversData=", conversData);
    })
    .catch((err) => {});
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
  // getPublishData();
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
    .title-wraper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .username {
      display: inline-block;
      min-width: 360rpx;
    }
    .config-wraper {
      background-color: #fafafa;
      padding: 4rpx;
      border-radius: 5%;
    }
    .motto {
      display: flex;
    }
  }
}
.avatar-warper {
  position: relative;
}
.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  padding: 12rpx;
}
.avatar-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
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
