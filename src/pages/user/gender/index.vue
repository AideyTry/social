<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-09 17:32:15
 * @LastEditTime: 2022-03-31 13:48:17
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="_showModal" v-show="show">
    <view class="_shade"></view>
    <view class="_modalBox">
      <view class="_modal">
        <!-- <slot name="title"> -->
        <view class="title" v-show="title">{{ title }}</view>
        <!-- </slot> -->
        <view class="content-hint"
          >确定性别后无法修改！</view
        >
        <uni-forms ref="form" :modelValue="formData" :rules="rules">
          <!-- <slot name="content"> -->
          <uni-forms-item name="gender">
            <radio-group name="radio" @change="radioChange">
              <label> <radio :value="1" /><text>男</text> </label>
              <label> <radio :value="2" /><text>女</text> </label>
            </radio-group>
          </uni-forms-item>
          <!-- </slot> -->
        </uni-forms>
        <!-- <slot name="btn"> -->
        <view class="btnbox">
          <button @click="submitForm" class="btn">确定</button>
        </view>
        <!-- </slot> -->
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { setGender } from "../../../api/user";
const store = useStore();

let userInfo = computed(() => store.state.user.userInfo).value;

const form = ref(null);
let show = ref(true);
let title = ref("选择性别");
let genderValue = ref(null);
let formData = reactive({
  gender: null,
});
const rules = {
  gender: {
    rules: [
      {
        required: true,
        errorMessage: "请输入昵称",
      },
    ],
  },
};

watchEffect(() => {
  if (userInfo.gender) {
    show.value = false;
  } else {
    show.value = true;
  }
});

const radioChange = (e) => {
  const {
    detail: { value },
  } = e;
  form.value.setValue("gender", value);
};

const submitForm = () => {
  form.value
    .validate()
    .then((res) => {
      const params = {
        gender: res.gender,
      };
      setGender(params).then((data) => {
        console.log("data===", data);
        show.value = false;
        store.dispatch("user/GetUserInfo");
      });
    })
    .catch((err) => {
      console.log("表单错误信息：", err);
    });
};
</script>

<style lang="scss" scoped>
::v-deep .uni-forms-item__content {
  justify-content: center !important;
  .uni-label-pointer {
    margin-left: 40rpx;
  }
}
._showModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  .content-hint {
    margin: 40rpx 0;
    color: #363636;
    text-align: center;
  }
  ._shade {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.6;
    z-index: 11000;
  }
  ._modalBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12000;
    display: flex;
    justify-content: center;
    align-items: center;
    ._modal {
      flex: none;
      width: 70%;
      // min-height:200upx;
      background: #fff;
      border-radius: 10rpx;
      .title {
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        font-size: 32rpx;
        font-weight: bold;
        padding: 15rpx 0 0;
        color: #363636;
        // border-bottom: 1upx solid #e1e1e1;
      }
      .content {
        padding: 30rpx;
        font-size: 24rpx;
        color: #666;
        line-height: 35rpx;
        text-align: center;
      }
      .btnbox {
        display: flex;
        .btn {
          font-size: 30rpx;
          text-align: center;
          flex: auto;
          line-height: 80rpx;
          border-top: 1rpx solid #e1e1e1;
          border-right: 1rpx solid #e1e1e1;
        }
        .btn:last-child {
          border-right: none;
        }
        .cancel {
        }
      }
    }
  }
}
</style>