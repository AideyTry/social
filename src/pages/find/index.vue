<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:13
 * @LastEditTime: 2022-02-20 21:13:01
 * @LastEditors: Aiden
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="share-wraper">
    <!-- <uni-file-picker
      file-mediatype="all"
      @select="onSelect"
      @progress="onProgress"
      @success="success"
      @fail="fail"
    >
      <button>选择文件</button>
    </uni-file-picker> -->
    <!-- <view class="progress-large-file"> -->
          <progress
      :percent="progressPercent"
      active
      :fontSize="24"
      activeColor="#00f"
      show-info
      stroke-width="3"
    />
    <view class="upload-text">
      <text v-if="uploadFlag" @click="onPause">{{uploadText}}</text>
    </view>
    <!-- </view> -->
    <!-- <progress :percent="80" active :fontSize="24" activeColor="#00f" show-info stroke-width="3"/> -->
    <view>
      <button @tap="uploadVideo">上传视频</button>
      <!-- <video :src="src"></video> -->
    </view>

    <!-- <view>
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
    </view> -->
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import qs from "qs";
import SparkMD5 from "spark-md5";
import { fileParse } from "../../utils/util";
import { uploadImage, mergeFile } from "../../api/file";
import { request } from "../../utils/request";

let src = ref("");
let progressPercent = ref(0);
let uploadText = ref('暂停')
let uploadFlag = ref(false)
let uploadBtn = ref(false)
let abort = ref(false)


const sends = async (tempFile) => {
  console.log("tempFiles===", tempFile);
  const buffer = await fileParse(tempFile, "buffer");
  const spark = new SparkMD5.ArrayBuffer();
  let suffix;
  spark.append(buffer);
  hash.value = spark.end();
  suffix = /\.([0-9a-zA-Z]+)$/i.exec(tempFile.name)[1];
  // 创建切片
  let partsize = tempFile.size / 100;
  let cut = 0;
  for (let i = 0; i < 100; i++) {
    let item = {
      chunk: tempFile.slice(cut, cut + partsize),
      filename: `${hash.value}_${i}_.${suffix}`,
    };
    cut += partsize;
    partList.value.push(item);
  }
  sendRequest();
}

const uploadVideo = () => {
  uni.chooseVideo({
    sourceType: ["camera", "album"],
    success: function(res) {
      console.log("res===", res);
      src.value = res.tempFilePath;
      sends(res.tempFile)
      // uni.uploadFile({
      //   url: "/dev/files/uploadVideo",
      //   filePath: res.tempFilePath,
      //   name: "file",
      //   fileType: "video",
      //   formData: {
      //     user: "test",
      //   },
      //   success: (uploadFileRes) => {
      //     console.log("uploadFileRes===", uploadFileRes);
      //   },
      // });
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
    // url: "/upload/files/uploadVideo",
    url: "/prod/files/uploadVideo",
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
const complete = () => {
  console.log("去调用接口合并文件");
  const params = {
    hash: hash.value
  }
  mergeFile(params).then(data => {
    console.log('data===', data)
    uploadFlag.value = false
    progressPercent.value  = 100
  })
};


const promiseSend = (item, index) => {
  return new Promise((resolve) => {
    const blobUrl = URL.createObjectURL(item.chunk);
    console.log("blobUrl===", blobUrl);
    const uploadTask = uni.uploadFile({
      url: "/prod/files/uploadLargeFile",
      // url: "/upload/files/uploadLargeFile",
      // url: "http://localhost:3000/files/uploadLargeFile",
      filePath: blobUrl,
      name: "file",
      fileType: "video",
      formData: {
        filename: item.filename,
      },
      success: (uploadFileRes) => {
        console.log("uploadFileRes===", uploadFileRes);
        resolve(index);
      },
    });
  });
};

/**
 * @description: 串行发送请求
 * @param {*}
 * @Author:
 * @return {*}
 */


/**
 * @description:   传递,使用串行（传完一个再传递下一个）
 * @param {*}
 * @Author: 
 * @return {*}
 */
const sendRequest = async () => {
  let activeIndex = 0
  console.log('partList.value.length=', partList.value.length)
  uploadFlag.value = true
  uploadText.value = '暂停'
  let i = 0
  const send = async () => {
          if (i >= partList.value.length) {
            // 发送完毕
            complete()
            return
          } 
          // await requestList[i]()
          const items = partList.value
          const activeIndex = await promiseSend(items[i], i);
          // partList.value.splice(activeIndex, 1)
          i++
          console.log('activeIndex=', activeIndex)
          console.log('i=', i)
          send()
};
  send()
  // for (let item of partList.value) {
  //   // 如果中断则不再传递
  //   if(abort.value){
  //     return
  //   }
  //   await promiseSend(item, activeIndex);
  //   activeIndex++
  //   progressPercent.value = activeIndex
  //   console.log('progressPercent.value===', progressPercent.value)
  //   if(activeIndex >= partList.value.length){
  //     complete()
  //   }
  // }
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

const onPause = () => {
  if(uploadBtn.value){
     uploadText.value = '继续'
     uploadBtn.value = false
     abort.value = true
     // 暂停上传
  } else {
    uploadText.value = '暂停'
    uploadBtn.value = true
    abort.value = false
    // 继续上传
    sendRequest()
  }
}

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
let progressImage = ref(0)
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
.share-wraper{
  .progress-large-file{
    display: flex;
  }
  .upload-text{
    text-align: center;
  }
}
</style>
