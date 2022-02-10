<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:13
 * @LastEditTime: 2022-02-10 16:52:36
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <uni-file-picker
      file-mediatype="video"
      @select="onSelect"
      @progress="onProgress"
      @success="success"
      @fail="fail"
    >
      <button>选择文件</button>
    </uni-file-picker>
    <progress
      :percent="progressPercent"
      active
      :fontSize="24"
      activeColor="#00f"
      show-info
      stroke-width="3"
    />
    <!-- <progress :percent="80" active :fontSize="24" activeColor="#00f" show-info stroke-width="3"/> -->
    <view>
      <button @tap="uploadVideo">上传视频</button>
      <!-- <video :src="src"></video> -->
    </view>

    <view>
      <uni-file-picker
        file-mediatype="image"
        @select="onSelectImage"
        @progress="progressImages"
        @success="successImage"
        @fail="failImage"
      >
        <button>选择图片</button>
      </uni-file-picker>
      <progress
        :percent="progressImage"
        active
        :fontSize="24"
        activeColor="#00f"
        show-info
        stroke-width="3"
      />
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import qs from 'qs'
import { fileParse } from '../../utils/util'
import { uploadImage } from '../../api/file'

let src = ref("");
let progressPercent = ref("0");

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
    // formData: {
    //   user: "test",
    // },
    success: (uploadFileRes) => {
      console.log("uploadFileRes===", uploadFileRes);
    },
  });

  uploadTask.onProgressUpdate((res) => {
    console.log("res===", res);
    console.log("上传进度" + res.progress);
    progressPercent.value = res.progress;
    console.log("已经上传的数据长度" + res.totalBytesSent);
    console.log("预期需要上传的数据总长度" + res.totalBytesExpectedToSend);

    // 测试条件，取消上传任务。
    // if (res.progress > 50) {
    //   uploadTask.abort();
    // }
  });
};

const onProgress = (e) => {
  console.log('e process=', e)
}
// const progress = (e) => {
//   console.log("progress=", e);
// };
const fail = (err) => {
  console.log("err=", err);
};

// 图片
let srcImage = ref("");
let progressImage = ref("0");
const onSelectImage = async(e) => {
  console.log('image=', e)
    if(!e) return
    const { tempFilePaths, tempFiles } = e;
    const file = tempFiles[0].file
    const result = await fileParse(file, 'base64')
    console.log('result===', result)
    uploadImage(qs.stringify({
      chunk: encodeURIComponent(result),
      filename: file.name,
    })).then(data => {
      console.log('data===', data)
    })

}
const progressImages = (e) => {
  console.log('image process=', e)
}
const successImage = () => {

}
const failImage = () => {

}
</script>

<style lang="scss" scoped>
// .progress-box {
//         display: flex;
//         height: 50rpx;
//         margin-bottom: 60rpx;
//     }
//     .uni-icon {
//         line-height: 1.5;
//     }
//     .progress-cancel {
//         margin-left: 40rpx;
//     }

//     .progress-control button{
//         margin-top: 20rpx;
//     }
</style>
