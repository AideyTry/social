<template>
  <view class="info-list">
    <view class="ul">
      <view class="li" v-for="item in infoList" :key="item.id">
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
    </view>
  </view>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { getFollowsInfo, getFansInfo } from "@/api/communication.js";
export default {
  name: "follow",
  setup(props) {
    let infoList = ref([]);

    const getInfo = (userids) => {
      const params = {
        userids,
      };
      if (parseInt(props.type) === 0) {
        uni.setNavigationBarTitle({
          title: "关注",
        }),
          getFollowsInfo(params).then((data) => {
            if (data.data.code === 200) {
              infoList.value = data.data.followsInfo;
              infoList.value = infoList.value.filter((element) => element);
              console.log("infoList.value====", infoList.value);
            }
          });
      } else if (parseInt(props.type) === 1) {
        uni.setNavigationBarTitle({
          title: "粉丝",
        }),
          getFansInfo(params).then((data) => {
            console.log("getFansInfo===", data);
            if (data.data.code === 200) {
              infoList.value = data.data.fansInfo;
              infoList.value = infoList.value.filter((element) => element);
              console.log("infoList.value====", infoList.value);
            }
          });
      }
    };

    onMounted(() => {
      //   console.log("props=", JSON.parse(decodeURIComponent(props.userids)));
      getInfo(JSON.parse(decodeURIComponent(props.userids)));
      // console.log("infoList.value=", infoList.value);
    });
    return {
      infoList,
    };
  },
};
</script>

<style lang="scss" scoped>
.li {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
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
