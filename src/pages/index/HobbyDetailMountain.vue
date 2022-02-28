<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-25 14:59:08
 * @LastEditTime: 2022-02-28 23:07:22
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="hobby-detail">
    <uni-swiper-dot
      :info="info"
      :current="current"
      field="content"
      :mode="mode"
    >
      <swiper class="swiper-box" @change="change">
        <swiper-item v-for="(item, index) in info" :key="index">
          <view class="swiper-item">
            <image :src="item.content" class="image"></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
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
      <Comment :hobbyInfo="hobbyInfo" v-if="hobbyInfo.hobby_4_id" />
    </view>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

import { getHobbyDetail } from "@/api/hobby.js";
import { setFollow, getFollow, deleteFollow } from "@/api/communication.js";
import Comment from "@/pages/components/Comment.vue";

import { formatDate } from "@/utils/util.js";

export default {
  components: {
    Comment,
  },
  onLoad: function(options) {
    console.log("options===", options);
  },
  setup(props) {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;

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
    const initGetHobbyDetail = (id) => {
      const params = { id };
      getHobbyDetail(params).then((data) => {
        console.log("data===", data);
        if (data.data.code === 200) {
          hobbyInfo.value = data.data.data;
          publishDate.value = formatDate(data.data.data.create_time);
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
          success: function(res) {
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

    onMounted(() => {
      console.log("userInfo===", userInfo);
      initGetHobbyDetail(props.id);
    });
    return {
      followText,
      isFlollow,
      following,
      hobbyInfo,
      info,
      publishDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.hobby-detail {
}
.swiper-box {
  width: 100%;
  height: 750rpx;
  .swiper-item {
    width: 100%;
    height: 100%;
    .image {
      width: 100%;
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
