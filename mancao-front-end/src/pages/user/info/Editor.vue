<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-22 16:09:06
 * @LastEditTime: 2022-01-04 17:17:42
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="userinfo-wraper">
    <uni-forms ref="form" :modelValue="formData" :rules="rules">
      <view class="userinfo">
        <uni-forms-item name="avatar">
        <image :src="avatar ? avatar : defaultAvatar" class="avatar"></image>
        </uni-forms-item>
      </view>
      <view class="info-item">
        <view class="title-wraper">
          <text class="title">个人照片</text>
          <text>({{ quantity(images) }}/{{ images.length }})</text>
        </view>
        <!-- <uni-forms-item name="photos"> -->
        <scroll-view scroll-x="true" class="photos">
          <view class="photos">
            <view
              class="photo-wraper"
              @click="onUpload(item, index)"
              v-for="(item, index) in images"
              :key="index"
            >
              <image
                mode="aspectFill"
                :src="item ? item : defaultAvatar"
                class="photo"
              ></image>
              <text
                class="photo-add"
                v-if="
                  (!item && images[index - 1]) || (index === 0 && !images[0])
                "
                >+</text
              >
            </view>
          </view>
        </scroll-view>
        <!-- </uni-forms-item> -->
      </view>

      <view class="info-item">
        <view class="title-wraper">
          <text class="title">个人签名</text>
        </view>
        <uni-forms-item name="motto">
          <input v-model="formData.motto" type="text" placeholder="请输入个人签名" />
        </uni-forms-item>
      </view>

      <view class="info-item">
        <view class="title-wraper">
          <text class="title">基础信息</text>
        </view>
        <!-- <view class="base-item">
        <text>昵称</text>
        <input type="text" placeholder="请输入昵称" />
      </view> -->
        <uni-forms-item label="昵称" name="username">
          <input
            class="input"
            v-model="formData.username"
            type="text"
            placeholder="请输入昵称"
          />
        </uni-forms-item>
        <uni-forms-item label="性别" name="gender">
          <!-- <text>性别</text> -->
          <view @click="changeGender">{{ gender }}</view>
        </uni-forms-item>
        <uni-forms-item label="出生日期" name="birthday">
          <picker
            mode="date"
            :value="formData.birthday"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            <view class="uni-input">{{ formData.birthday }}</view>
          </picker>
        </uni-forms-item>
        <uni-forms-item label="所在地" name="location">
          <PickerRegion
            :propsProvinceCode="formData.location.provinceCode"
            :propsCityCode="formData.location.cityCode"
            @change="onChange"
          />
        </uni-forms-item>
        <uni-forms-item label="家乡" name="hometown">
          <PickerRegion
            :propsProvinceCode="formData.hometown.provinceCode"
            :propsCityCode="formData.hometown.cityCode"
            @change="onChangeHome"
          />
        </uni-forms-item>
        <uni-forms-item label="学校" name="schoolName">
          <view @click="openSchool" @changeSchool="onChangeSchool">{{
            formData.schoolName ? formData.schoolName : "请选择学校"
          }}</view>
        </uni-forms-item>
        <uni-forms-item label="职业" name="job">
          <picker
            :range="professions"
            :value="activeProfessionIndex"
            @change="changeProfession"
          >
            <view class="uni-input">{{ formData.job ? formData.job : `请选择职业` }}</view>
          </picker>
        </uni-forms-item>
      </view>
    </uni-forms>
    <button @click="submit">保存</button>
    <!-- end -->
  </view>
</template>


<script setup>
import { computed, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import PickerRegion from "./PickerRegion.vue";
import { editUserInfo } from '../../../api/user'
const store = useStore();
let userInfo = computed(() => store.state.user.userInfo).value;
/* uni-forms */
let formData = reactive({
  avatar: userInfo.avatar,
  username: userInfo.username,
  gender: "1",
  birthday: userInfo.birthday,
  location: {
    provinceCode: userInfo.location.provinceCode,
    cityCode: userInfo.location.cityCode
  },
  hometown: {
    provinceCode: userInfo.hometown.provinceCode,
    cityCode: userInfo.hometown.cityCode
  },
  schoolName: userInfo.schoolName,
  job: userInfo.job,
  motto: userInfo.motto,
  photos: userInfo.photos
});
let rules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入昵称",
      },
    ],
  },
};


const form = ref(null);

const binddata = (name, obj) => {
  console.log("name, obj===", name, obj);
};

const submit = (e) => {
  console.log("form=e==", e);
  form.value
    .validate()
    .then((res) => {
      console.log("表单数据信息：", res);
      const params = {
        form: {...res, photos: images}
      }

      editUserInfo(params).then(data => {
        console.log('data======', data)
      })
    })
    .catch((err) => {
      console.log("表单错误信息：", err);
    });
};

const defaultAvatar = "/static/images/default_avatar.png";

// let schoolName = ref('')

let images = reactive(userInfo.photos);

watch(images, (images, old) => {
  console.log('images', images)
  formData.photos = images
})

const quantity = (images) => {
  const arr = images.filter((item) => item);
  return arr.length;
};

console.log("images===", images);
// if (!userInfo.photos) {
//   for(let i = 0; i<5; i++){
//     images.push('')
//   }
// }

const avatar = ref(userInfo.avatar);

watch(avatar, (avatar, old) => {
  formData.avatar = avatar
})

/**
 * @description: 提交图片
 * @param {*}
 * @Author:
 * @return {*}
 */
const onUploadFile = (index, filePath) => {
  uni.uploadFile({
    url: "http://127.0.0.1:3000/users/uploadFile",
    filePath,
    name: "file",
    formData: {
      user: "test",
    },
    success: (uploadFileRes) => {
      console.log("uploadFileRes===", uploadFileRes);
      const { data } = uploadFileRes
      const imgData = JSON.parse(data)
      console.log('imgData=', imgData)
      images[index] = imgData.url;
    },
  });
};

/**
 * @description: 选择图片
 * @param {*}
 * @Author:
 * @return {*}
 */
const chooseImage = (index) => {
  uni.chooseImage({
    success: (chooseImageRes) => {
      console.log("chooseImageRes===", chooseImageRes);
      const { tempFilePaths, tempFiles } = chooseImageRes;
      console.log("tempFilePaths[0]===", tempFilePaths[0]);
      onUploadFile(index, tempFilePaths[0])
      // images[index] = tempFilePaths[0];
      // console.log("images===", images);
    },
  });
};

/**
 * @description: 头像上传
 * @param {*}
 * @Author:
 * @return {*}
 */
const onUpload = (item, index) => {
  console.log("item, index===", item, index);
  if (item) {
    let itemList = ["编辑"];
    if (index > 0) {
      itemList = ["设为头像", "编辑", "删除"];
    }
    uni.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        if (res.tapIndex === 0) {
          images[index] = images[0];
          images[0] = item;
          avatar.value = item;
        }

        if (res.tapIndex === 1) {
          chooseImage(index);
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      },
    });
    return;
  }
  chooseImage(index);
};

/** 一下为日期基本信息 */

const getDate = (type) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === "start") {
    year = year - 60;
  } else if (type === "end") {
    year = year + 2;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
};

const currentDate = getDate({
  format: true,
});
console.log("currentDate===", currentDate);
formData.birthday = currentDate
let startDate = getDate("start");
let endDate = getDate("end");

const bindDateChange = (e) => {
  formData.birthday = e.detail.value;
};

/* 性别 */
const gender = ref("1");
const changeGender = () => {
  uni.showActionSheet({
    itemList: ["男", "女"],
    success: function (res) {
      console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
    },
    fail: function (res) {
      console.log(res.errMsg);
    },
  });
};

/* 保存 */
const onSave = () => {};

/*  区域选择 */
const onChange = (obj) => {
  console.log("obj=====", obj);
    const { provinceCode, cityCode } = obj
  formData.location.provinceCode = provinceCode
  formData.location.cityCode = cityCode
};
const onChangeHome = (obj) => {
  console.log("obj.home=====", obj);
  const { provinceCode, cityCode } = obj
  formData.hometown.provinceCode = provinceCode
  formData.hometown.cityCode = cityCode
};

/* 选择学校 */
const { hash } = location;
const ops = hash.split("?")[1];
if (ops) {
  const opsSchoolName = ops.split("=")[1];
  if (opsSchoolName) {
    formData.schoolName = decodeURI(opsSchoolName);
  }
}
console.log("ops==", ops);
const openSchool = () => {
  uni.navigateTo({
    url: "/pages/user/info/School",
  });
};
const onChangeSchool = (name) => {
  formData.schoolName= name;
};

/* 职业 */
let professions = ref([
  "IT/互联网/通信",
  "金融",
  "工业制造业",
  "教育/科研",
  "公共事业单位",
  "医药/健康",
  "媒体/公关",
  "影视/娱乐",
  "零售",
  "餐饮/酒店",
  "其他",
]);
let activeProfessionIndex = ref(0);
const changeProfession = (e) => {
  const {
    detail: { value },
  } = e;
  activeProfessionIndex.value = value;
  formData.job = professions["value"][value];
};
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

// .info-item {
//   padding: 30rpx 0;
//   .base-item {
//     display: flex;
//     justify-content: space-between;
//     background-color: #fdfdfd;
//     padding: 20rpx 6rpx;
//     border-bottom: 1rpx solid #eee;
//   }
// }
.title-wraper {
  padding: 20rpx 0;
  .title {
    font-weight: 700;
  }
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
</style>
