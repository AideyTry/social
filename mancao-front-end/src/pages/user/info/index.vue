<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 16:09:06
 * @LastEditTime: 2021-12-31 18:23:43
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="userinfo-wraper">
    <view class="userinfo">
      <image
        mode="aspectFill"
        :src="avatar ? avatar : defaultAvatar"
        class="avatar"
      ></image>
      <text class="basic-info">
        {{ userInfo.location }}/{{ userInfo.gender }}/{{ age }}
      </text>
    </view>
    <view class="photos">
      <view
        class="photo-wraper"
        @click="onUpload(item, index)"
        v-for="(item, index) in images"
        :key="index"
      >
        <image mode="aspectFill" :src="item ? item : defaultAvatar" class="photo"></image>
        <text
          class="photo-add"
          v-if="(!item && images[index - 1]) || (index === 0 && !images[0])"
          >+</text
        >
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


console.log('images===', images)

const avatar = ref(userInfo.avatar)
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
}

/**
 * @description: 头像上传
 * @param {*}
 * @Author:
 * @return {*}
 */
const onUpload = (item, index) => {
  console.log('item, index===', item, index)
  if(item){
    uni.previewImage({
            urls: images,
            longPressActions: {
                itemList: ['发送给朋友', '保存图片', '收藏'],
                success: function(data) {
                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                },
                fail: function(err) {
                    console.log(err.errMsg);
                }
            }
        });
        return
  }
    uni.navigateTo({
    url: '/pages/user/info/Editor'
});

let age = ref('')
  // uni.chooseImage({
  //   success: (chooseImageRes) => {
  //     console.log("chooseImageRes===", chooseImageRes);
  //     const { tempFilePaths, tempFiles } = chooseImageRes;
  //     console.log("tempFilePaths[0]===", tempFilePaths[0]);
  //     // onUploadFile(tempFilePaths[0])
  //     images[index] = tempFilePaths[0]
  //     console.log('images===', images)
  //   },
  // });
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
.photos {
  display: flex;
  .photo-wraper {
    position: relative;
    margin-right: 20rpx;
    .photo {
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