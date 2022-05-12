<template>
  <view class="_showModal">
    <view class="_shade"></view>
    <view class="_modalBox">
      <view class="_modal">
        <!-- <slot name="title"> -->
        <view class="title-wraper">
            <view class="title"><text>{{ props.title }}</text></view>
                  <svg class="close-icon" aria-hidden="true" @click.stop="onClose">
            <use xlink:href="#icon-guanbi1"></use>
          </svg></view>
        <!-- </slot> -->
        <view class="content-hint"
          >{{props.content}}</view
        >
        <uni-forms ref="form" :modelValue="formData">
          <!-- <slot name="content"> -->
          <uni-forms-item name="username">
            <radio-group name="radio" @change="radioChange">
              <label> <radio value="Aiden" :checked="formData.username === 'Aiden'" /><text>Aiden</text> </label>
              <label> <radio value="Lucy" /><text>Lucy</text> </label>
            </radio-group>
          </uni-forms-item>
          <!-- </slot> -->
        </uni-forms>
        <!-- <slot name="btn"> -->
        <view class="btnbox">
          <button @click="submitForm" type="primary" class="btn">确定</button>
        </view>
        <!-- </slot> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "showModal",
};
</script>

<script setup>
import { ref, reactive} from "vue";
import { exampleLogin } from '@/api/user.js'
import { setToken } from "@/utils/auth.js";
import { useStore } from "vuex";
const store = useStore();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const form = ref(null);
let formData = reactive({
  username: 'Aiden',
});

const radioChange = (e) => {
  const {
    detail: { value },
  } = e;
  form.value.setValue("username", value);
};

const onClose = () => {
    emit('close')
}

const submitForm = () => {
  form.value
    .validate()
    .then((res) => {
      const params = {
        username: res.username,
        password: '111111'
      };
      console.log('params=======', params)
      exampleLogin(params).then(res => {
        console.log("res========", res);
        const { code, token } = res.data;
        if (code === 200) {
          emit('close')
          console.log("成功");
          setToken(token);
          store.dispatch("user/GetUserInfo");
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }
      })
    //   setGender(params).then((data) => {
    //     console.log("data===", data);
    //     store.dispatch("user/GetUserInfo");
    //   });
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
      .title-wraper {
          display:flex;
          align-items: center;
        height: 40rpx;
        line-height: 40rpx;
        // text-align: center;
        font-size: 32rpx;
        font-weight: bold;
        padding: 15rpx 0 0;
        color: #363636;
        // border-bottom: 1upx solid #e1e1e1;
        .title{
            align-self: center;
            flex-basis: 80%;
            display: flex;
            justify-content: center;
            padding-left: 20%;
        }
        .close-icon{
            width: 1.2em;
            height: 1.2em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
            align-self: flex-end;
            flex-basis: 20%;
        }
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