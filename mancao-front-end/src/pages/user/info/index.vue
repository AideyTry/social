<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 16:09:06
 * @LastEditTime: 2021-12-25 23:13:24
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="userinfo-wraper">
    <view class="userinfo">
        <image
          :src="userInfo.avatar ? userInfo.avatar : defaultAvatar"
          class="avatar"
        ></image>
        <text class="basic-info">
            {{userInfo.location}}/{{userInfo.gender}}/{{userInfo.age}}
        </text>
    </view>
    <view class="photos">
      <view class="photo-wraper" @click="onUpload" v-for="(item, index) in userInfo.photos" :key="index">
        <image
          :src="item ? item : defaultAvatar"
          class="photo"
        ></image>
        <text class="photo-add" v-if="userInfo.photos[index - 1] || (index === 0 && !userInfo.photos[0])">+</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const defaultAvatar = "/static/images/default_avatar.png";
const store = useStore();
let userInfo = computed(() => store.state.user.userInfo).value;
if(!userInfo.photos){
userInfo.photos = new Array(5)
}

/**
 * @description: 头像上传
 * @param {*}
 * @Author:
 * @return {*}
 */
const onUpload = (e) => {
  uni.chooseImage({
    success: (chooseImageRes) => {
      console.log("chooseImageRes===", chooseImageRes);
      const { tempFilePaths, tempFiles } = chooseImageRes;
      console.log('tempFilePaths[0]===', tempFilePaths[0])
      uni.uploadFile({
        url: "http://127.0.0.1:3000/users/uploadFile",
        filePath: tempFilePaths[0],
        name: "file",
        formData: {
          user: "test",
        },
        success: (uploadFileRes) => {
          console.log("uploadFileRes===", uploadFileRes);
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.userinfo-wraper {
  padding: 40rpx;
}
.userinfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.photos{
    display: flex;
.photo-wraper{
    position: relative;
    margin-right: 20rpx;
    .photo{
        width: 100rpx;
        height: 100rpx;
        border-radius: 20%;
    }
    .photo-add {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12rpx;
}
}
}
</style>