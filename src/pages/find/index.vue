<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:50:13
 * @LastEditTime: 2022-02-25 14:20:49
 * @LastEditors: Aiden(戴林波)
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
    <!-- </view> -->
    <!-- <progress :percent="80" active :fontSize="24" activeColor="#00f" show-info stroke-width="3"/> -->
    <!-- <view>
      <button @tap="uploadVideo">上传视频</button>
      <video :src="src"></video>
    </view> -->

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
    <uni-forms ref="form" :modelValue="formData" :rules="rules">
      <view class="info-item">
        <uni-forms-item required label="标    题：" name="title">
          <uni-easyinput
            v-model="title"
            placeholder="请输入标题"
          ></uni-easyinput>
        </uni-forms-item>
      </view>
      <view class="info-item">
        <!-- <view class="title-wraper">
          <text class="title">个人签名</text>
        </view> -->
        <uni-forms-item required label="兴    趣：" name="hobby">
          <!-- <uni-data-checkbox
            :value="hobby"
            :multiple="false"
            :localdata="hobbys"
            @change="hobbyChange"
          ></uni-data-checkbox> -->
          <radio-group class="uni-list" @change="hobbyChange">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item, index) in hobbys"
              :key="index"
            >
              <view>
                <radio :id="item.value" :value="item.value"></radio>
              </view>
              <view>
                <label class="label-2-text" :for="item.value">
                  <text>{{ item.text }}</text>
                </label>
              </view>
            </label>
          </radio-group>
        </uni-forms-item>
      </view>
      <view class="info-item">
        <uni-forms-item required label="文件类型：" name="fileType">
          <!-- <uni-data-checkbox
            :multiple="false"
            :value="fileType"
            :localdata="fileTypes"
            @change="typeChange"
          ></uni-data-checkbox> -->
          <radio-group class="uni-list" @change="typeChange">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item, index) in fileTypes"
              :key="index"
            >
              <view>
                <radio :id="item.value" :value="item.value"></radio>
              </view>
              <view>
                <label class="label-2-text" :for="item.value">
                  <text>{{ item.text }}</text>
                </label>
              </view>
            </label>
          </radio-group>
        </uni-forms-item>
      </view>
      <view class="info-item">
        <uni-forms-item required label="内    容：" name="content">
          <uni-easyinput
            type="textarea"
            :maxlength="-1"
            autoHeight
            v-model="content"
            placeholder="请输入正文内容"
          ></uni-easyinput>
        </uni-forms-item>
      </view>
    </uni-forms>
    <button @tap="submit" type="primary">上传分享</button>
    <progress
      v-if="uploadLoading"
      :percent="progressPercent"
      :fontSize="24"
      activeColor="#00f"
      show-info
      stroke-width="12"
    />
    <view class="upload-text">
      <text v-if="uploadFlag" @click="onPause">{{ uploadText }}</text>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import qs from "qs";
import SparkMD5 from "spark-md5";
import { fileParse } from "../../utils/util";
import { uploadImage, mergeFile } from "../../api/file";
import { request } from "../../utils/request";

const store = useStore();
const userInfo = computed(() => store.state.user.userInfo).value;

let src = ref("");
let progressPercent = ref(0);
let partListLength = ref(0);
let cutParts = ref([]);
let uploadText = ref("暂停");
let uploadFlag = ref(false);
let uploadBtn = ref(false);
let abort = ref(false);
let uploadLoading = ref(false)

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
  const { avatar, username } = userInfo
  const params = {
    hash: hash.value,
    title: formData.title,
    hobby: formData.hobby,
    fileType: formData.fileType,
    content: formData.content,
    avatar,
    username
  };
  mergeFile(params).then((data) => {
    console.log("data===", data);
    uploadFlag.value = false;
    uploadLoading.value = false
    // progressPercent.value  = 100
  });
};

const promiseSend = (item, index) => {
  return new Promise((resolve, reject) => {
    const blobUrl = URL.createObjectURL(item.chunk);
    console.log("blobUrl===", blobUrl);
    const uploadTask = uni.uploadFile({
      // url: "/prod/files/uploadLargeFile",
      // url: "/upload/files/uploadLargeFile",
      url: "http://localhost:3000/files/uploadLargeFile",
      filePath: blobUrl,
      name: "file",
      fileType: "video",
      formData: {
        filename: item.filename,
      },
      success: (uploadFileRes) => {
        console.log("uploadFileRes===", uploadFileRes);
        const { statusCode } = uploadFileRes;
        // 上传完就从切片数组中删除当前部分
        console.log("index================================", index);
        if (statusCode === 200) {
          // partListLength.value / partList.value.length
          let parts = partList.value;
          const part = parts.splice(0, 1);
          cutParts.value.push(part);
          partList.value = [...parts];
          console.log("partList=", partList);
          console.log("cutPartslength=", cutParts.value.length);
          console.log("partListLength=", partListLength.value);
          progressPercent.value = (
            (cutParts.value.length / partListLength.value) *
            100
          ).toFixed(2);
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail: (err) => {
        console.log("err=", err);
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
  //   let activeIndex = 0
  //   console.log('partList.value.length=', partList.value.length)
  uploadFlag.value = true;
  // uploadText.value = '暂停'
  requestList.value = [];
  //   let i = 0
  //   const send = async () => {
  //           if (i >= partList.value.length) {
  //             // 发送完毕
  //             complete()
  //             return
  //           }
  //           // await requestList[i]()
  //           const items = partList.value
  //           const activeIndex = await promiseSend(items[i], i);
  //           // partList.value.splice(activeIndex, 1)
  //           i++
  //           console.log('activeIndex=', activeIndex)
  //           console.log('i=', i)
  //           send()
  // };
  //   send()

  console.log("partList.value=", partList.value);
  partList.value.forEach((item, index) => {
    const fn = () => promiseSend(item, index);
    requestList.value.push(fn);
  });

  let i = 0;
  const send = async () => {
    if (abort.value) {
      return;
    }
    console.log("abort", abort.value);
    console.log("requestList.value===", requestList.value);
    if (i >= requestList.value.length) {
      complete();
      return;
    }
    try {
      const isStep = await requestList.value[i]();
      console.log("isStep=", isStep);
      if (isStep) {
        i++;
      }
      send();
    } catch (error) {
      throw new Error("err happened");
    }
  };
  send();

  // for (let item of partList.value) {
  //   // 如果中断则不再传递
  // if(abort.value){
  //   return
  // }
  //   await promiseSend(item, activeIndex);
  //   activeIndex++
  //   progressPercent.value = activeIndex
  //   console.log('progressPercent.value===', progressPercent.value)
  //   if(activeIndex >= partList.value.length){
  //     complete()
  //   }
  // }
};

const sends = async (tempFile) => {
  console.log("tempFiles===", tempFile);
  uploadLoading.value = true
  const buffer = await fileParse(tempFile, "buffer");
  const spark = new SparkMD5.ArrayBuffer();
  let suffix;
  spark.append(buffer);
  hash.value = spark.end();
  suffix = /\.([0-9a-zA-Z]+)$/i.exec(tempFile.name)[1];
  // 创建切片
  // let partsize = tempFile.size / 100;
  // let cut = 0;
  // for (let i = 0; i < 100; i++) {
  //   let item = {
  //     chunk: tempFile.slice(cut, cut + partsize),
  //     filename: `${hash.value}_${i}_.${suffix}`,
  //   };
  //   cut += partsize;
  //   partList.value.push(item);
  // }
  const partSize = 524288;
  let cut = 0;
  partListLength.value = Math.ceil(tempFile.size / partSize);
  console.log("partListLength=", partListLength.value);
  for (let i = 0; i < partListLength.value; i++) {
    let item = {
      chunk: tempFile.slice(cut, cut + partSize),
      filename: `${hash.value}_${i}_.${suffix}`,
    };
    cut += partSize;
    partList.value.push(item);
  }
  sendRequest();
};

const uploadVideo = () => {
  uni.chooseVideo({
    sourceType: ["camera", "album"],
    success: function(res) {
      console.log("res===", res);
      src.value = res.tempFilePath;
      uploadBtn.value = true;
      sends(res.tempFile);
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
  if (uploadBtn.value) {
    uploadText.value = "继续";
    uploadBtn.value = false;
    abort.value = true;
    // 暂停上传
  } else {
    uploadText.value = "暂停";
    uploadBtn.value = true;
    abort.value = false;
    // 继续上传
    sendRequest();
  }
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
let progressImage = ref(0);
const onSelectImage = async (e) => {
  console.log("image=", e);
  if (!e) return;
  const { tempFilePaths, tempFiles } = e;
  // uni-ui 上传组件使用
  // const file = tempFiles[0].file;
  const file = tempFiles[0];
  const result = await fileParse(file, "base64");
  console.log("result===", result);
  uploadLoading.value = true
  const { avatar, username } = userInfo
  uploadImage(
    qs.stringify({
      chunk: encodeURIComponent(result),
      filename: file.name,
      title: formData.title,
      hobby: formData.hobby,
      fileType: formData.fileType,
      content: formData.content,
      avatar,
      username
    })
  ).then((data) => {
    console.log("data===", data);
    const {
      data: { code },
    } = data;
    if (code === 200) {
      progressPercent.value = 100;
      uploadLoading.value = false
    }
  });
};
const onUploadImage = async () => {
  uni.chooseImage({
    count: 6, //默认9
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], //从相册选择
    success: function(res) {
      onSelectImage(res);
    },
  });
};
const progressImages = (e) => {
  console.log("image process=", e);
};
const successImage = () => {};
const failImage = () => {};

// 表单数据
const form = ref(null);
let formData = reactive({
  title: "",
  hobby: "",
  fileType: "",
  content: "",
});
let rules = {
  title: {
    rules: [
      {
        required: true,
        errorMessage: "请输入标题",
      },
    ],
  },
  hobby: {
    rules: [
      {
        required: true,
        errorMessage: "请选择兴趣",
      },
    ],
  },
  fileType: {
    rules: [
      {
        required: true,
        errorMessage: "请选择文件类型",
      },
    ],
  },
  content: {
    rules: [
      {
        required: true,
        errorMessage: "请输入正文内容",
      },
    ],
  },
};
let title = ref("");
let content = ref("");
let hobby = ref("");
let fileType = ref("");
let hobbys = reactive([
  { value: 0, text: "狼人杀", disable: false },
  { value: 1, text: "剧本杀", disable: false },
  { value: 2, text: "登山", disable: false },
  { value: 3, text: "旅游", disable: false },
]);
let fileTypes = reactive([
  { value: 0, text: "图片", disable: false },
  { value: 1, text: "视频", disable: false },
]);
const hobbyChange = (e) => {
  console.log("e=", e);
  const {
    detail: { value },
  } = e;
  hobby.value = value;
  form.value.setValue("hobby", value);
};
const typeChange = (e) => {
  const {
    detail: { value },
  } = e;
  fileType.value = value;
  form.value.setValue("fileType", value);
};
const submit = () => {
  form.value
    .validate()
    .then((res) => {
      console.log("表单数据信息：", res);
      const { fileType, title, content, hobby } = res;
      formData.content = content
      formData.title = title
      formData.fileType = fileType
      formData.hobby = hobby
      if (fileType === 0) {
        onUploadImage();
      } else {
        uploadVideo();
      }
    })
    .catch((err) => {
      console.log("表单错误信息：", err);
    });
};
</script>

<style lang="scss" scoped>
.share-wraper {
  padding-top: 100rpx;
  .progress-large-file {
    display: flex;
  }
  .upload-text {
    text-align: center;
  }
  .title-wraper {
    padding: 20rpx 0;
    .title {
      font-weight: 700;
    }
  }
  .uni-list {
    display: flex;
    .uni-list-cell {
      margin-right: 46rpx;
    }
  }
}
</style>
