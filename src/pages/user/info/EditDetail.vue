<template>
  <div class="hobby-detail">
    <uni-forms ref="form" :modelValue="hobbyInfo">
      <view class="author-wraper">
        <view class="author">
          <view @click="goBack">返回</view>
          <view class="author-info">
            <image
              class="avatar"
              mode="aspectFit"
              :src="hobbyInfo.avatar || ''"
            ></image>
            <text>{{ hobbyInfo.username || "" }}</text>
          </view>
        </view>
      </view>
      <scroll-view
        scroll-x="true"
        class="photos"
        v-if="hobbyInfo.fileType === 0"
      >
        <view class="photos">
          <view
            class="photo-wraper"
            v-for="(item, index) in photos"
            :key="index"
          >
            <image
              mode="aspectFill"
              :src="item.path"
              class="photo"
              @click="onEdit(item, index)"
            ></image>
          </view>
          <view class="photo-add-wraper" @click="addImage">
            <text class="photo-add">+</text>
          </view>
        </view>
      </scroll-view>
      <view class="swiper-box" v-if="hobbyInfo.fileType === 1">
        <view class="swiper-item">
          <VideoPlayer
            :options="{ src: hobbyInfo.video_url, poster: hobbyInfo.url }"
            :key="hobbyInfo.id"
          ></VideoPlayer>
        </view>
      </view>
      <view class="content-wraper">
        <view class="content">
          <view class="title">
            <uni-forms-item name="title">
              <input
                v-model="hobbyInfo.title"
                type="text"
                placeholder="请输入文本"
                @confirm="changeTitle"
              />
            </uni-forms-item>
          </view>
          <view class="main">
            <uni-forms-item name="content">
              <input
                v-model="hobbyInfo.content"
                type="text"
                placeholder="请输入文本"
                @confirm="changeContent"
              />
            </uni-forms-item>
          </view>
          <view class="publish-date"
            ><text>发布于: </text><text>{{ publishDate }}</text></view
          >
        </view>
      </view>
      <view class="comment-wraper">
        <Comment
          v-if="hobbyInfo.id"
          :hobbyInfo="hobbyInfo"
          :key="hobbyInfo.id"
        />
      </view>
    </uni-forms>
    <view class="submit-wraper">
      <button @click="submit" class="submit">发 布</button>
    </view>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import qs from "qs";

import { getHobbyDetail } from "@/api/hobby.js";
import { deletePublish, updatePublish } from "@/api/publish.js";
import { setFollow, getFollow, deleteFollow } from "@/api/communication.js";
import Comment from "@/pages/components/Comment.vue";
import VideoPlayer from "@/pages/components/VideoPlayer.vue";

import { formatDate } from "@/utils/util.js";
import { fileParse } from "@/utils/util.js";

export default {
  components: {
    Comment,
    VideoPlayer,
  },
  onLoad: function(options) {
    console.log("options===", options);
  },
  onReady: function() {},
  setup(props) {
    console.log("props=", props);
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;

    const options = reactive({
      poster: "",
      src: "", //视频源
    });

    let info = ref([
      {
        content:
          "https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif",
      },
    ]);
    let current = ref(0);
    let mode = ref("default");

    const change = (e) => {
      current.value = e.detail.current;
    };

    let hobbyInfo = ref({});
    const initGetHobbyDetail = (obj) => {
      const { id, hobby } = obj;
      const params = { id, hobby };
      getHobbyDetail(params).then((data) => {
        if (data.data.code === 200) {
          hobbyInfo.value = data.data.data;
          publishDate.value = formatDate(data.data.data.create_time);
          photos.value = hobbyInfo.value.photos.map((element) => ({
            path: element,
          }));
          options.poster = data.data.data.url;
          options.src = data.data.data.video_url;
        }
      });
    };

    // 返回
    const goBack = () => {
      uni.switchTab({
        url: "/pages/user/index",
      });
    };

    // 发布
    let publishDate = ref(null);

    // 编辑
    let operations = ref(["编辑", "删除"]);
    let activeOperationIndex = ref(0);
    const onUpdate = (info) => {
      console.log("info==", info);
    };
    const onDelete = (index) => {
      if (photos.value.length <= 1) {
        uni.showModal({
          content: "至少需要发布一张图片",
          confirmText: "知道了",
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log("用户点击确定");
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
        return;
      }
      photos.value.splice(index, 1);
      console.log("photos.value===========", photos.value);
    };
    const onEdit = (item, index) => {
      console.log("item, index===", item, index);
      uni.showActionSheet({
        itemList: operations,
        success: function(res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
          activeOperationIndex.value = res.tapIndex;
          if (activeOperationIndex.value === 1) {
            onDelete(index);
          } else {
            onUpdate(props);
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        },
      });
    };

    // 显示的图片组
    const photos = ref([]);

    /**
     * @description: 选择添加图片
     * @param {*}
     * @Author:
     * @return {*}
     */

    const addImage = () => {
      uni.chooseImage({
        count: 6, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], //从相册选择
        success: function(res) {
          console.log("res===", res);
          const { tempFiles } = res;
          photos.value = photos.value.concat(tempFiles);
          console.log("photos.value====", photos.value);
        },
      });
    };

    const form = ref(null);

    const changeTitle = (e) => {
      const { detail: value } = e;
      hobbyInfo.value.title.value = value;
    };

    const changeContent = (e) => {
      const { detail: value } = e;
      hobbyInfo.value.content.value = value;
    };

    /**
     * @description: 发布
     * @param {*}
     * @Author:
     * @return {*}
     */

    const submit = () => {
      form.value
        .validate()
        .then(async (res) => {
          console.log("表单数据信息：", res);
          const { title, content } = res;
          const remoteUrls = photos.value.filter((item) =>
            item.path.includes("social-1308251497")
          );
          const blobUrls = photos.value.filter((item) =>
            item.path.includes("blob:")
          );
          const fileAll = [];
          for (let item of blobUrls) {
            const chunk = await fileParse(item, "base64");
            fileAll.push({
              filename: item.name,
              chunk: chunk,
            });
          }
          // const buffer = await fileParse(tempFiles[0], "buffer");
          // const spark = new SparkMD5.ArrayBuffer();
          // spark.append(buffer);
          // const hash = spark.end();

          const urls = remoteUrls[0].path.match(/myqcloud.com\/(\S*)/)[1];
          const uploadHash = urls.match(/(\S*)\//)[1];
          const remotePhotos = remoteUrls.map((item) => item.path);

          const params = {
            uploadHash,
            uploadFiles: fileAll,
            remotePhotos,
            title,
            id: parseInt(props.id),
            hobby: parseInt(props.hobby),
            content,
          };
          updatePublish(qs.stringify(params)).then((data) => {
            if (data.data.code === 200) {
              uni.showToast({
                title: data.data.msg,
                duration: 2000,
              });
              uni.switchTab({
                url: "/pages/user/index",
                success() {
                  let page = getCurrentPages().pop(); //跳转页面成功之后
                  if (!page) return;
                  page.onLoad(); //如果页面存在，则重新刷新页面
                },
              });
            }
            console.log("data=", data);
          });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    };

    onMounted(() => {
      initGetHobbyDetail({ id: props.id, hobby: props.hobby });
    });
    return {
      hobbyInfo,
      photos,
      info,
      publishDate,
      options,
      goBack,
      onEdit,
      operations,
      activeOperationIndex,
      addImage,
      form,
      changeTitle,
      changeContent,
      submit,
    };
  },
};
</script>

<style lang="scss" scoped>
.hobby-detail {
  padding: 0 40rpx;
}
.swiper-box {
  width: 100%;
  height: 554rpx;
  .swiper-item {
    width: 100%;
    height: 100%;
    .image {
      width: inherit;
      height: 100%;
    }
  }
}

.author-wraper {
  margin-top: 32rpx;
  padding: 0 32rpx;
}
.author {
  padding-bottom: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  .author-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    background-color: #ccc;
    margin-right: 20rpx;
  }
}
.content-wraper {
  margin-top: 32rpx;
  padding: 0 32rpx;
  .content {
    padding-bottom: 32rpx;
    border-bottom: 1px solid #e6e6e6;
    .title {
      font-size: 32rpx;
      font-weight: 700;
    }
    .main {
      margin-top: 20rpx;
      color: #555;
      letter-spacing: 6rpx;
      text-indent: 2em;
    }
    .publish-date {
      margin-top: 20rpx;
      color: #999;
      font-size: 24rpx;
    }
  }
}
.comment-wraper {
  margin-top: 32rpx;
  padding: 0 32rpx;
}
.photos {
  display: flex;
  .photo-wraper {
    position: relative;
    margin-right: 20rpx;
    flex-shrink: 0;
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
  .photo-add-wraper {
    width: 200rpx;
    height: 200rpx;
    border-radius: 20%;
    position: relative;
    flex-shrink: 0;
    border: 1rpx solid #dfdfdf;
  }
  .photo-add {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12rpx;
  }
}
.submit-wraper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  .submit {
    background-color: #00faf3;
    color: #363636;
    padding: 0 200rpx;
    border-radius: 60rpx;
  }
}
</style>
