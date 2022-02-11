<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:13
 * @LastEditTime: 2022-02-11 21:35:18
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
    <uni-file-picker
      file-mediatype="all"
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
import qs from "qs";
import SparkMD5 from "spark-md5";
import { fileParse } from "../../utils/util";
import { uploadImage, uploadLargeFile } from "../../api/file";
import { request } from "../../utils/request";

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
const onSelect1 = (e) => {
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

// 大文件上传
let hash = ref("");
let partList = ref([]);
let requestList = ref([]);
let total = ref(0);
let sendIndex = ref(0);

/**
 * @description: 传递完文件后合并切片文件
 * @param {*}
 * @Author:
 * @return {*}
 */
const complete = async () => {
  console.log("去调用接口合并文件");
};

/**
 * @description: 串行发送请求
 * @param {*}
 * @Author:
 * @return {*}
 */
const send = async () => {
  if (sendIndex.value >= requestList.value.length) {
    complete();
    return;
  }
  await requestList.value[sendIndex.value]();
  sendIndex.value++;
  send();
};

const sendRequest = async () => {
  partList.value.forEach((item, index) => {
    let fn = () => {
      // let formData = new FormData();
      // console.log("item===", item);
      // console.log("item.filename===", item.chunk);
      // formData.append("chunk", item.chunk);
      // formData.append("filename", item.filename);
      // console.log("formData=", formData);
      console.log('item===', item)
      const blobUrl = URL.createObjectURL(item.chunk)
      console.log('blobUrl===', blobUrl)
      const uploadTask = uni.uploadFile({
        url: "/dev/files/uploadLargeFile",
        filePath: blobUrl,
        name: "file",
        fileType: "video",
        formData: {
          username: item.filename,
        },
        success: (uploadFileRes) => {
          console.log("uploadFileRes===", uploadFileRes);
        },
      });
      // uploadLargeFile(formData).then((result) => {
      //   const {
      //     data: { code },
      //   } = result;
      //   if (code === 200) {
      //     total.value += 1;
      //     // 传完后要把切片移除掉
      //     partList.value.splice(index, 1);
      //   }
      // });
    };
    requestList.value.push(fn);
  });

  // 传递,使用串行（传完一个再传递下一个）
  send();
};

const onSelect = async (e) => {
  console.log("select ", e);
  const { tempFilePaths, tempFiles } = e;
  const file = tempFiles[0].file;
  src.value = tempFilePaths[0];
  console.log("tempFilePath===", tempFilePaths[0]);
  console.log("tempFiles===", tempFiles[0]);
  console.log("file===", file);
  const buffer = await fileParse(file, "buffer");
  const spark = new SparkMD5.ArrayBuffer();
  let suffix;
  spark.append(buffer);
  hash.value = spark.end();
  suffix = /\.([0-9a-zA-Z]+)$/i.exec(file.name)[1];
  // 创建切片
  let partsize = file.size / 100;
  let cut = 0;
  for (let i = 0; i < 100; i++) {
    let item = {
      chunk: file.slice(cut, cut + partsize),
      filename: `${hash.value}_${i}_.${suffix}`,
    };
    cut += partsize;
    partList.value.push(item);
  }
  sendRequest();
};

const onProgress = (e) => {
  console.log("e process=", e);
};
// const progress = (e) => {
//   console.log("progress=", e);
// };
const fail = (err) => {
  console.log("err=", err);
};

// 图片
let srcImage = ref("");
let progressImage = ref("0");
const onSelectImage = async (e) => {
  console.log("image=", e);
  if (!e) return;
  const { tempFilePaths, tempFiles } = e;
  const file = tempFiles[0].file;
  const result = await fileParse(file, "base64");
  console.log("result===", result);
  uploadImage(
    qs.stringify({
      chunk: encodeURIComponent(result),
      filename: file.name,
    })
  ).then((data) => {
    console.log("data===", data);
  });
};
const progressImages = (e) => {
  console.log("image process=", e);
};
const successImage = () => {};
const failImage = () => {};
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
