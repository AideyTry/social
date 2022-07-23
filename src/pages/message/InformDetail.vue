<template>
  <view class="inform-detail-wrapper">
    <view class="title" v-if="title !== '0'"
      ><text>{{ title }}</text></view
    >
    <view class="content"><text>上传截图、提高举报准确度</text></view>
    <scroll-view scroll-x="true" class="photos">
      <view class="photos">
        <view
          class="photo-wraper"
          @click="onUpload(item, index)"
          v-for="(item, index) in images"
          :key="index"
        >
          <image mode="aspectFill" :src="item ? item : ''" class="photo"></image
          ><span
            class="iconfont photo-add"
            v-if="(!item && images[index - 1]) || (index === 0 && !images[0])"
          >
            &#xe602;</span
          >
        </view>
      </view>
    </scroll-view>
    <textarea
      :placeholder="
        title === '0'
          ? '请填写不少于10个字的举报理由（必填项）'
          : '还有其他想说的...（选填）'
      "
      :value="inputInform"
      @input="onInput"
      :maxlength="100"
    />
    <view
      ><text>{{ count }}/100</text></view
    >
    <view class="submit-wraper">
      <button @click="onSubmit" type="primary" :disabled="!submitvisible">
        提交
      </button>
    </view>
  </view>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { sendInform } from "@/api/user.js";
export default {
  onLoad: function (options) {
    console.log("options===", options);
    this.propsOptions = options;
  },
  setup() {
    let title = ref(null);
    let images = reactive([""]);
    let inputInform = ref("");
    let propsOptions = ref(null);
    let submitvisible = ref(true);

    watch(inputInform, (current) => {
      console.log("current======", current);
      if (propsOptions.value.title != "0") {
        return;
      }
      if (current) {
        submitvisible.value = true;
      } else {
        submitvisible.value = false;
      }
    });

    let count = computed(() => inputInform.value.length);

    /**
     * @description: 提交图片
     * @param {*}
     * @Author:
     * @return {*}
     */
    const onUploadFile = (index, filePath) => {
      console.log("index, filePath===", index, filePath);
      uni.uploadFile({
        url: `${process.env.BASE_URL}/users/uploadFile`,
        filePath,
        name: "file",
        formData: {
          user: "test",
        },
        success: (uploadFileRes) => {
          console.log("uploadFileRes===", uploadFileRes);
          const { data } = uploadFileRes;
          const imgData = JSON.parse(data);
          console.log("imgData=", imgData);
          images[index] = imgData.url;
          images.push("");
          console.log("index===", index);
        },
      });
    };

    const chooseImage = (index) => {
      uni.chooseImage({
        success: (chooseImageRes) => {
          console.log("chooseImageRes===", chooseImageRes);
          const { tempFilePaths, tempFiles } = chooseImageRes;
          console.log("tempFilePaths[0]===", tempFilePaths[0]);
          onUploadFile(index, tempFilePaths[0]);
          // images[index] = tempFilePaths[0];
          // console.log("images===", images);
        },
      });
    };

    const onUpload = (item, index) => {
      console.log("item, index===", item, index);
      if (item) {
        return;
      }
      chooseImage(index);
    };
    const onInput = (e) => {
      console.log("einput= ", e);
      inputInform.value = e.detail.value;
    };
    const onSubmit = () => {
      console.log("title============", title.value);
      console.log("inputInform=====================", inputInform.value);
      const resultImages = JSON.parse(JSON.stringify(images));
      console.log(
        "resultImages==========================",
        resultImages.splice(resultImages.length - 1, 1)
      );
      console.log("resultImages result=", resultImages);
      const params = {
        title: title.value,
        content: inputInform.value,
        images: resultImages
      }
      sendInform(params).then((data) => {
        console.log("data======", data);
      });
    };
    onMounted(() => {
      title.value = propsOptions.value.title;
      if (title.value === "0") {
        submitvisible.value = false;
      }
    });
    return {
      title,
      inputInform,
      count,
      images,
      propsOptions,
      submitvisible,
      onUpload,
      onInput,
      onSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>
.inform-detail-wrapper {
  padding: 20rpx;
  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #363636;
  }
  .content {
    margin: 40rpx 0;
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
        border: 1rpx solid #787878;
      }
      .photo-add {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        // transform: translateX(-50%);
        font-size: 68rpx;
      }
    }
  }
  ::v-deep uni-textarea {
    margin-top: 60rpx;
    width: 100%;
    background-color: #ededed;
  }
  .submit-wraper {
    margin-top: 60rpx;
  }
}
</style>
