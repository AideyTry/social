<template>
  <div class="hobby-detail">
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
        <view @click="onEdit">
          <text>...</text>
        </view>
      </view>
    </view>
    <view class="swiper-box" v-if="hobbyInfo.fileType === 0">
      <swiper class="swiper-box" :indicator-dots="hobbyInfo.photos.length > 1">
        <swiper-item v-for="(item, index) in hobbyInfo.photos" :key="index">
          <view class="swiper-item">
            <image :src="item" class="image" mode="aspectFit"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
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
          {{ hobbyInfo.title }}
        </view>
        <view class="main">
          {{ hobbyInfo.content }}
        </view>
        <view class="publish-date"
          ><text>发布于: </text><text>{{ publishDate }}</text></view
        >
      </view>
    </view>
    <view class="comment-wraper">
      <Comment v-if="hobbyInfo.id" :hobbyInfo="hobbyInfo" :key="hobbyInfo.id" />
    </view>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";

import { getHobbyDetail } from "@/api/hobby.js";
import { deletePublish } from "@/api/publish.js";
import { setFollow, getFollow, deleteFollow } from "@/api/communication.js";
import Comment from "@/pages/components/Comment.vue";
import VideoPlayer from "@/pages/components/VideoPlayer.vue";

import { formatDate } from "@/utils/util.js";

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
        console.log("data===", data);
        if (data.data.code === 200) {
          hobbyInfo.value = data.data.data;
          publishDate.value = formatDate(data.data.data.create_time);
          console.log("hobbyInfo.value===", hobbyInfo.value);
          console.log("data.data.data.url===", data.data.data.url);
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
      uni.navigateTo({
        url: `/pages/user/info/EditDetail?id=${info.id}&hobby=${info.hobby}`,
      });
    };
    const onDelete = (info) => {
      console.log("info==", info);
      uni.showModal({
        title: "删除",
        content: "确定删除？",
        success: function(res) {
          if (res.confirm) {
            const params = {
              hobby: props.hobby,
              id: props.id,
            };
            deletePublish(params).then((data) => {
              if (data.data.code === 200) {
                uni.showToast({
                  title: "删除成功",
                  duration: 2000,
                });
                uni.switchTab({
                  url: "/pages/user/index",
                  success() {
                    let page = getCurrentPages().pop(); //跳转页面成功之后
                    console.log("page==============", page);
                    if (!page) return;
                    page.onLoad(); //如果页面存在，则重新刷新页面
                  },
                });
              }
            });
          } else if (res.cancel) {
          }
        },
      });
    };
    const onEdit = (e) => {
      uni.showActionSheet({
        itemList: operations,
        success: function(res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
          activeOperationIndex.value = res.tapIndex;
          if (activeOperationIndex.value === 1) {
            onDelete(props);
          } else {
            onUpdate(props);
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        },
      });
      // console.log("value=", value);
      // activeOperationIndex.value = value;
      // if (activeOperationIndex.value === 1) {
      //   onDelete(props);
      // } else {
      //   onUpdate(props);
      // }
    };

    onMounted(() => {
      console.log("userInfo===", userInfo);
      initGetHobbyDetail({ id: props.id, hobby: props.hobby });
    });
    return {
      hobbyInfo,
      info,
      publishDate,
      options,
      goBack,
      onEdit,
      operations,
      activeOperationIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
.hobby-detail {
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
</style>
