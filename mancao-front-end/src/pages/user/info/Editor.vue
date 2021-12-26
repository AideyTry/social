<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 16:09:06
 * @LastEditTime: 2021-12-26 20:34:50
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
    </view>
    <view class="info-item">
      <view class="title-wraper">
        <text class="title">个人照片</text>
        <text>({{ quantity(images) }}/{{ images.length }})</text>
      </view>
      <scroll-view scroll-x="true" class="photos">
        <view class="photos">
          <view
            class="photo-wraper"
            @click="onUpload(item, index)"
            v-for="(item, index) in images"
            :key="index"
          >
            <image
              mode="aspectFill"
              :src="item ? item : defaultAvatar"
              class="photo"
            ></image>
            <text
              class="photo-add"
              v-if="(!item && images[index - 1]) || (index === 0 && !images[0])"
              >+</text
            >
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="info-item">
      <view class="title-wraper">
        <text class="title">个人签名</text>
      </view>
      <input type="text" placeholder="请输入个人签名" />
    </view>

    <view class="info-item">
      <view class="title-wraper">
        <text class="title">基础信息</text>
      </view>
      <view class="base-item">
        <text>昵称</text>
        <input type="text" placeholder="请输入个人签名" />
      </view>
      <view class="base-item">
        <text>性别</text>
        <input type="text" placeholder="请输入个人签名" />
      </view>
      <view class="base-item">
        <text>出生日期</text>
        <picker
          mode="date"
          :value="date"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
          <view class="uni-input">{{ date }}</view>
        </picker>
      </view>
      <view class="base-item">
        <text>所在地</text>
        <input type="text" placeholder="请输入个人签名" />
      </view>
      <view class="base-item">
        <text>家乡</text>
        <input type="text" placeholder="请输入个人签名" />
      </view>
      <view class="base-item">
        <text>学校</text>
        <input type="text" placeholder="请输入个人签名" />
      </view>
      <view class="base-item">
        <text>职业</text>
        <input type="text" placeholder="请输入个人签名" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
const defaultAvatar = "/static/images/default_avatar.png";
const store = useStore();
let userInfo = computed(() => store.state.user.userInfo).value;

let images = reactive(userInfo.photos);

const quantity = (images) => {
  const arr = images.filter((item) => item);
  return arr.length;
};

console.log("images===", images);
// if (!userInfo.photos) {
//   for(let i = 0; i<5; i++){
//     images.push('')
//   }
// }

/**
 * @description: 提交图片
 * @param {*}
 * @Author:
 * @return {*}
 */
const onUploadFile = (filePath) => {
  uni.uploadFile({
    url: "http://127.0.0.1:3000/users/uploadFile",
    filePath,
    name: "file",
    formData: {
      user: "test",
    },
    success: (uploadFileRes) => {
      console.log("uploadFileRes===", uploadFileRes);
    },
  });
};

/**
 * @description: 选择图片
 * @param {*}
 * @Author:
 * @return {*}
 */
const chooseImage = (index) => {
  uni.chooseImage({
    success: (chooseImageRes) => {
      console.log("chooseImageRes===", chooseImageRes);
      const { tempFilePaths, tempFiles } = chooseImageRes;
      console.log("tempFilePaths[0]===", tempFilePaths[0]);
      // onUploadFile(tempFilePaths[0])
      images[index] = tempFilePaths[0];
      console.log("images===", images);
    },
  });
};

/**
 * @description: 头像上传
 * @param {*}
 * @Author:
 * @return {*}
 */
const onUpload = (item, index) => {
  console.log("item, index===", item, index);
  if (item) {
    let itemList = ["编辑"];
    if (index > 0) {
      itemList = ["设为头像", "编辑", "删除"];
    }
    uni.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        if (res.tapIndex === 0) {
          images[index] = images[0];
          images[0] = item;
        }

        if (res.tapIndex === 1) {
          chooseImage(index);
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      },
    });
    return;
  }
  chooseImage(index);
};

/** 一下为日期基本信息 */

const getDate = (type) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === "start") {
    year = year - 60;
  } else if (type === "end") {
    year = year + 2;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
};

const currentDate = getDate({
  format: true,
});
console.log('currentDate===', currentDate)
let date = ref(currentDate);
let startDate = getDate("start");
let endDate = getDate("end");

const bindDateChange = (e) => {
  date.value = e.detail.value;
  console.log('date======', date.value)
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

.info-item {
  padding: 30rpx 0;
  .base-item {
    display: flex;
    justify-content: space-between;
    background-color: #fdfdfd;
    padding: 20rpx 6rpx;
    border-bottom: 1rpx solid #eee;
  }
}
.title-wraper {
  padding: 20rpx 0;
  .title {
    font-weight: 700;
  }
}
.photos {
  display: flex;
  .photo-wraper {
    position: relative;
    margin-right: 20rpx;
    .photo {
      width: 200rpx;
      height: 200rpx;
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
