<template>
  <view class="info-list">
    <view class="ul">
      <view
        class="li"
        v-for="item in infoList"
        :key="item.id"
        @click="goUserDetail(item)"
      >
        <view class="userinfo-wraper">
          <view class="avatar-wraper">
            <image
              class="avatar"
              mode="aspectFit"
              :src="item.avatar || ''"
            ></image>
          </view>
          <view class="publish-info">
            <view class="title">{{ item.title }} </view>
            <view class="userinfo">
              <text class="username">{{ item.username }}</text>
            </view>
            <view class="userinfo">
              <text class="username">{{ item.motto }}</text>
            </view>
          </view>
        </view>
        <view
          :class="{ follow: !isFlollow, active: isFlollow }"
          @click.stop="following(item)"
        >
          <text>{{ followText }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getFollowsInfo, getFansInfo } from "@/api/communication.js";
import { setFollow, getFollow, deleteFollow } from "@/api/communication.js";
export default {
  name: "follow",
    onLoad: function (options) {
    console.log("options===", options);
    this.propsOptions = options
  },
  setup(props) {
    let infoList = ref([]);
    let propsOptions = ref(null)

    // 关注
    let isFlollow = ref(false);
    let followText = ref("关注");
    const following = (info) => {
      if (isFlollow.value) {
        uni.showModal({
          content: "确认不再关注？",
          success: function (res) {
            if (res.confirm) {
              let params = { followId: info.user_id };
              deleteFollow(params).then((data) => {
                if (data.data.code === 200) {
                  followText.value = "关注";
                  isFlollow.value = false;
                  getInfo(JSON.parse(decodeURIComponent(propsOptions.value.userids)));
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          },
        });
        return;
      }
      let params = { followId: info.user_id };
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

    const initFlow = (info) => {
      let params = { followId: info.user_id };
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

    const getInfo = (userids) => {
      const params = {
        userids,
      };
      if (parseInt(propsOptions.value.type) === 0) {
        uni.setNavigationBarTitle({
          title: "关注",
        }),
          getFollowsInfo(params).then((data) => {
            if (data.data.code === 200) {
              infoList.value = data.data.followsInfo;
              infoList.value = infoList.value.filter((element) => element);
              console.log("infoList.value====", infoList.value);
              infoList.value.forEach((item) => {
                initFlow(item);
              });
            }
          });
      } else if (parseInt(propsOptions.value.type) === 1) {
        uni.setNavigationBarTitle({
          title: "粉丝",
        }),
          getFansInfo(params).then((data) => {
            console.log("getFansInfo===", data);
            if (data.data.code === 200) {
              infoList.value = data.data.fansInfo;
              infoList.value = infoList.value.filter((element) => element);
              infoList.value.forEach((item) => {
                initFlow(item);
              });
            }
          });
      }
    };

    // 跳转到好友详情
    const goUserDetail = (info) => {
      console.log("info======", info);
      //#ifdef APP-PLUS || H5
      uni.navigateTo({
        url: `/pages/user/info/User?id=${info.user_id}`,
      });
      //#endif
      //#ifdef MP-WEIXIN
      uni.navigateTo({
        url: `/pages/userInfo/User/User?id=${info.user_id}`,
      });
      //#endif
    };

    onMounted(() => {
      console.log('follow props=====================================================', propsOptions)
      //   console.log("props=", JSON.parse(decodeURIComponent(props.userids)));
      getInfo(JSON.parse(decodeURIComponent(propsOptions.value.userids)));
      // console.log("infoList.value=", infoList.value);
    });
    return {
      propsOptions,
      infoList,
      followText,
      isFlollow,
      following,
      goUserDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  .userinfo-wraper {
    display: flex;
  }
  .avatar-wraper {
    width: 100rpx;
    height: 100rpx;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .img {
    margin-left: 20rpx;
    width: 133rpx;
    height: 100rpx;
    .img-url {
      width: 100%;
      height: 100%;
    }
  }
}
.publish-info {
  margin-left: 40rpx;
  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #363636;
  }
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
  padding: 10rpx 10rpx;
  font-size: 24rpx;
}

.userinfo {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #363636;
  .avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 10rpx;
  }
  .username,
  .update-time {
    margin-left: 30rpx;
  }
}
.replay-icon {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
