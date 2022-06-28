<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-25 14:59:08
 * @LastEditTime: 2022-06-28 12:22:20
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="hobby-detail">
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
    <view class="author-wraper">
      <view class="author">
        <view class="author-info">
          <image
            class="avatar"
            mode="aspectFit"
            :src="hobbyInfo.avatar || ''"
          ></image>
          <text>{{ hobbyInfo.username || "" }}</text>
        </view>
        <view
          :class="{ follow: !isFlollow, active: isFlollow }"
          @click="following"
        >
          <text>{{ followText }}</text>
        </view>
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
import { setFollow, getFollow, deleteFollow } from "@/api/communication.js";
import Comment from "@/pages/components/Comment.vue";
import VideoPlayer from "@/pages/components/VideoPlayer.vue";

import { formatDate } from "@/utils/util.js";

export default {
  components: {
    Comment,
    VideoPlayer,
  },
  onLoad: function (options) {
    console.log("options===", options);
    this.propsOptions = options
  },
  onReady: function () {},
  setup(props, context) {
    console.log("props=", props);
    console.log('context==========', context)
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;

    const options = reactive({
      poster: "",
      src: "", //视频源
    });

    let propsOptions = ref(null)

    let info = ref([
      {
        content:
          "https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif",
      },
    ]);

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
          initFlow();
        }
      });
    };

    // 关注
    let isFlollow = ref(false);
    let followText = ref("关注");
    const following = () => {
      if (isFlollow.value) {
        uni.showModal({
          content: "确认不再关注？",
          success: function (res) {
            if (res.confirm) {
              let params = { followId: hobbyInfo.value.user_id };
              deleteFollow(params).then((data) => {
                if (data.data.code === 200) {
                  followText.value = "关注";
                  isFlollow.value = false;
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
        return;
      }
      console.log("userInfo===", userInfo);
      let params = { followId: hobbyInfo.value.user_id };
      setFollow(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          followText.value = "已关注";
          isFlollow.value = true;
        } else if (data.data.code === 400) {
          uni.showToast({
            title: data.data.msg,
            icon: "none",
            duration: 2000,
          });
        }
      });
    };

    // 发布
    let publishDate = ref(null);

    const initFlow = () => {
      let params = { followId: hobbyInfo.value.user_id };
      console.log("params===", params);
      getFollow(params).then((data) => {
        console.log("data1===", data);
        if (data.data.code === 200) {
          isFlollow.value = data.data.isFollow;
          data.data.isFollow
            ? (followText.value = "已关注")
            : (followText.value = "关注");
        }
      });
    };

    // 导航标题
    const onNavTitle = (obj) => {
      console.log(
        "obj===================================================================================",
        obj
      );
      const { hobby } = obj;
      //#ifdef H5
      const strateies = {
        hobby2: () =>
          uni.setNavigationBarTitle({
            title: "狼人杀",
          }),
        hobby3: () =>
          uni.setNavigationBarTitle({
            title: "剧本杀",
          }),
        hobby4: () =>
          uni.setNavigationBarTitle({
            title: "登山",
          }),
        hobby5: () =>
          uni.setNavigationBarTitle({
            title: "旅游",
          }),
        hobby6: () =>
          uni.setNavigationBarTitle({
            title: "视频",
          }),
        hobby7: () =>
          uni.setNavigationBarTitle({
            title: "电影",
          }),
      };
      strateies[`hobby${hobby}`]();
      //#endif

      //#ifdef APP-PLUS || MP-WEIXIN
      switch (Number(hobby)) {
        case 2:
          uni.setNavigationBarTitle({
            title: "狼人杀",
          });
          break;
        case 3:
          uni.setNavigationBarTitle({
            title: "剧本杀",
          });
          break;
        case 4:
          uni.setNavigationBarTitle({
            title: "登山",
          });
          break;
        case 5:
          uni.setNavigationBarTitle({
            title: "旅游",
          });
          break;
        case 6:
          uni.setNavigationBarTitle({
            title: "视频",
          });
          break;
        case 7:
          uni.setNavigationBarTitle({
            title: "电影",
          });
          break;
        default:
          uni.setNavigationBarTitle({
            title: "狼人杀",
          });
      }
      //#endif
    };

    onMounted(() => {
      console.log("userInfo===", userInfo);
      console.log('propsOptions===========', propsOptions)
      onNavTitle(propsOptions.value);
      initGetHobbyDetail({ id: propsOptions.value.id, hobby: propsOptions.value.hobby });
    });
    return {
      followText,
      isFlollow,
      following,
      hobbyInfo,
      info,
      publishDate,
      options,
      propsOptions
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
  .follow {
    border: 1rpx solid #ff2442;
    border-radius: 8rpx;
    color: #ff2442;
    padding: 10rpx 20rpx;
    font-size: 24rpx;
  }
  .active {
    border: 1rpx solid #ccc;
    border-radius: 8rpx;
    color: #ccc;
    padding: 10rpx 20rpx;
    font-size: 24rpx;
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
