<template>
  <view class="userinfo-wraper">
    <view class="userinfo">
      <image
        mode="aspectFill"
        :src="userInfo.avatar"
        class="avatar"
      ></image>
      <view class="basic-info">
        <PickerRegion
          isDisabled
          :propsProvinceCode="
            userInfo.location && userInfo.location.provinceCode
          "
          :propsCityCode="userInfo.location && userInfo.location.cityCode"
          :key="userInfo.location && userInfo.location.cityCode"
        />/{{ $filters.filterGender(userInfo.gender) || "暂无" }}/<text
          v-if="age || age === 0"
          >{{ age }}岁</text
        >
        <text v-if="!age && age !== 0">暂无</text>
        <!-- <uni-tag
          v-if="!age && age !== 0"
          disabled
          inverted
          text="暂无"
        ></uni-tag> -->
      </view>
    </view>
    <view class="photos">
      <view
        class="photo-wraper"
        @click="onPreviewImage(item, index)"
        v-for="(item, index) in userInfo.photos"
        :key="index"
      >
        <image
          mode="aspectFill"
          :src="item"
          class="photo"
        ></image>
      </view>
    </view>
    <uni-forms>
      <uni-forms-item label="签名">
        <view>{{userInfo.motto || "暂未填写"}}</view>
      </uni-forms-item>
      <uni-forms-item label="家乡">
        <PickerRegion
          isDisabled
          :propsProvinceCode="
            userInfo.hometown && userInfo.hometown.provinceCode
          "
          :propsCityCode="userInfo.hometown && userInfo.hometown.cityCode"
          :key="userInfo.hometown && userInfo.hometown.provinceCode"
        />
      </uni-forms-item>
      <uni-forms-item label="学校">
        <view>{{ userInfo.schoolName || "暂未填写" }}</view>
      </uni-forms-item>
      <uni-forms-item label="职业">
        <view>{{ userInfo.job || "暂未填写" }}</view>
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<script>
export default {
  onBackPress(options) {
      console.log('options=', options)
  },
};
</script>

<script setup>
import { ref, reactive, onMounted } from "vue";
import moment from "moment";
import PickerRegion from "./PickerRegion.vue";
import { getFrendInfo } from '@/api/user.js'

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

let userInfo = ref({})

const age = ref(moment().diff(userInfo.birthday, "years"));


// 获取好友信息
const getFrend = () => {
    const params = {
        userId: props.id
    }
    getFrendInfo(params).then(res => {
        console.log('好友=', res)
        if(res.data.code === 200){
            userInfo.value = res.data.data
            console.log('userInfo.value=======', userInfo.value)
        }
    })
}

// 预览图片
const onPreviewImage = (item, index) => {
    uni.previewImage({
        current: index,
        urls: userInfo.value.photos
    })
}

onMounted(() => {
  console.log("props===", props);
  getFrend()
});
</script>

<style lang="scss" scoped>
.userinfo-wraper {
  padding: 40rpx;
}
.userinfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.photos {
  display: flex;
  .photo-wraper {
    position: relative;
    margin-right: 20rpx;
    .photo {
      width: 100rpx;
      height: 100rpx;
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
}
.basic-info {
  display: flex;
}
</style>
