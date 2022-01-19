<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:13
 * @LastEditTime: 2022-01-19 18:03:28
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <uni-file-picker
      fileMediatype="video"
      @select="onSelect"
      @progress="progress"
      @success="success"
      @fail="fail"
    />
    <view>
      <button @tap="uploadVideo">上传视频</button>
      <video :src="src"></video>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

let src = ref("");

const uploadVideo = () => {
  uni.chooseVideo({
    sourceType: ["camera", "album"],
    success: function(res) {
      console.log("res===", res);
      src.value = res.tempFilePath;
	    uni.uploadFile({
    url: "http://127.0.0.1:3000/files/uploadVideo",
    filePath: res.tempFilePath,
    name: "file",
	fileType: 'video',
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
const success = (e) => {
  console.log("e===", e);
};
const onSelect = (e) => {
  console.log("select ", e);
  const { tempFilePaths } = e;
  src.value = tempFilePaths[0];
  console.log('tempFilePath===', tempFilePaths[0])
  uni.uploadFile({
    url: "http://127.0.0.1:3000/files/uploadVideo",
    filePath: tempFilePaths[0],
    name: "file",
	fileType: 'video',
    formData: {
      user: "test",
    },
    success: (uploadFileRes) => {
      console.log("uploadFileRes===", uploadFileRes);
    },
  });
};
const progress = (e) => {
  console.log("progress=", e);
};
const fail = (err) => {
  console.log("err=", err);
};
</script>

<style></style>
