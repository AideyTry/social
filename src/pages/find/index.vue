<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:13
 * @LastEditTime: 2022-02-04 23:38:53
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
    <progress :percent="progressPercent" active :fontSize="24" activeColor="#00f"/>
    <view>
      <button @tap="uploadVideo">上传视频</button>
      <video :src="src"></video>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

let src = ref("");
let progressPercent = ref('')

const uploadVideo = () => {
  uni.chooseVideo({
    sourceType: ["camera", "album"],
    success: function(res) {
      console.log("res===", res);
      src.value = res.tempFilePath;
      uni.uploadFile({
        url: "/dev/files/uploadVideo",
        filePath: res.tempFilePath,
        name: "file",
        fileType: "video",
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
  console.log("tempFilePath===", tempFilePaths[0]);
  const uploadTask = uni.uploadFile({
    url: "/dev/files/uploadVideo",
    filePath: tempFilePaths[0],
    name: "file",
    fileType: "video",
    formData: {
      user: "test",
    },
    success: (uploadFileRes) => {
      console.log("uploadFileRes===", uploadFileRes);
    },
  });

  uploadTask.onProgressUpdate((res) => {
    console.log('res===', res)
    console.log("上传进度" + res.progress);
    progressPercent.value = res.progress
    console.log("已经上传的数据长度" + res.totalBytesSent);
    console.log("预期需要上传的数据总长度" + res.totalBytesExpectedToSend);

    // 测试条件，取消上传任务。
    // if (res.progress > 50) {
    //   uploadTask.abort();
    // }
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
