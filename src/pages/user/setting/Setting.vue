<template>
  <view class="setting-wrapper">
    <view class="setting" @click="onEdit">
      <text>编辑</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="setting" @click="onAbout">
      <text>关于蔓草</text>
      <span class="iconfont"> &#xe662; </span>
    </view>
    <view class="logout-wraper">
      <button @click="onCancel" class="cancel">账户注销</button>
      <button @click="onLogout" class="logout">退出登录</button>
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
import { removeToken } from "@/utils/auth";
import { deletedUser } from "@/api/user.js";
export default {
  setup() {
    const onEdit = () => {
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
    const onAbout = () => {
      //#ifdef APP-PLUS || H5
      uni.navigateTo({
        url: "/pages/user/about/about",
      });
      //#endif
      //#ifdef MP-WEIXIN
      uni.navigateTo({
        url: "/pages/userInfo/about/about",
      });
      //#endif
    };
    const onCancel = () => {
      uni.showModal({
        title: "注销",
        content: "注销账户将不存在，确认注销吗？",
        success: function (res) {
          if (res.confirm) {
            deletedUser().then((res) => {
              console.log("res==================================", res);
              if (res.data.code === 200) {
                uni.showToast({
                  title: "注销成功",
                  duration: 2000,
                });
                new Promise((resolve, reject) => {
                  removeToken();
                  resolve();
                }).then(() => {
                  //#ifdef H5
                  location.reload();
                  //#endif
                  //#ifdef APP-PLUS || MP-WEIXIN
                  uni.reLaunch({
                    url: "/pages/login/index",
                  });
                  //#endif
                });
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    };
    const onLogout = () => {
      uni.showModal({
        title: "退出",
        content: "确认退出当前登录吗？",
        success: function (res) {
          if (res.confirm) {
            new Promise((resolve, reject) => {
              removeToken();
              resolve();
            }).then(() => {
              //#ifdef H5
              location.reload();
              //#endif
              //#ifdef APP-PLUS || MP-WEIXIN
              uni.reLaunch({
                url: "/pages/login/index",
              });
              //#endif
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    };
    return {
      onEdit,
      onAbout,
      onCancel,
      onLogout,
    };
  },
};
</script>

<style scoped lang="scss">
.setting-wrapper {
  padding: 40rpx;
  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #dbdbdb;
  }
  .logout-wraper {
    margin-top: 60rpx;
    .cancel {
      background-color: #ccc;
      color: #fff;
    }
    .logout {
      margin-top: 30rpx;
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
