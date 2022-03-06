<template>
  <view class="login-wraper">
    <uni-title type="h1" align="center" title="蔓草"></uni-title>
    <view class="image">
      <image
        style="width: 100%; height: 100%"
        src="../../static/images/login-bg.gif"
        mode=""
      ></image>
    </view>
    <!-- #ifdef H5 || APP-PLUS -->
    <view class="login">
      <form @submit="formSubmit" @reset="formReset" class="login-in">
        <view class="row-flex uni-form-item uni-column">
          <text class="title">手机号：</text>
          <input
            class="uni-input"
            name="phone"
            placeholder="请输入手机号"
            @input="onInput"
          />
        </view>
        <view class="row-flex uni-form-item uni-column">
          <text class="title">验证码：</text>
          <input
            class="uni-input"
            name="code"
            placeholder="请输入验证码"
            @input="onInputCode"
          />
          <button
            class="code"
            v-if="codeVisible"
            :disabled="!sendCaptchaEnabled"
            @click="sendCaptcha"
          >
            {{ codeMessage
            }}<text v-if="!sendCaptchaEnabled">({{ counterTimer }}s)</text>
          </button>
        </view>
        <view class="uni-btn-v">
          <button
            form-type="submit"
            type="primary"
            class="btn-block"
            :disabled="loginVisible"
          >
            登录
          </button>
        </view>
      </form>
      <view class="cut-off-line row">
        <view class="col-8 line-left"></view>
        <text>其他登录方式</text>
        <view class="col-8 line-right"></view>
      </view>
      <view class="other-login">
        <button
          open-type="getUserInfo"
          @getuserinfo="getuserinfo"
          withCredentials="true"
          class="login-way wechat"
        >
          <view class="m-icon m-icon-weixin"></view>
        </button>
        <!-- </view> -->
        <button
          open-type="getUserInfo"
          @getuserinfo="getuserinfo"
          withCredentials="true"
          class="login-way wechat"
        >
          <view class="m-icon m-icon-QQ"></view>
        </button>
        <button
          open-type="getUserInfo"
          @getuserinfo="getuserinfo"
          withCredentials="true"
          class="login-way wechat"
        >
          <view class="m-icon m-icon-weibo"></view>
        </button>
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <button
      type="primary"
      open-type="openSetting"
      @getuserinfo="miniProLogin"
      class="auth-btn"
    >
      登录
    </button>
    <button
      type="primary"
      open-type="getUserInfo"
      @getuserinfo="getInfo"
      class="auth-btn"
    >
      登录授权
    </button>

    <!-- #endif -->
  </view>
</template>
<script>
import { sendCode, codePhoneLogin } from "../../api/user.js";
import { setToken } from "../../utils/auth.js";

/*  #ifdef  MP-WEIXIN  */
import { loginWechat } from '../../api/wechat'
/*  #endif  */
export default {
  data() {
    return {
      codeVisible: false,
      loginVisible: true,
      sendCaptchaEnabled: true,
      codeMessage: "获取验证码",
      counterTimer: 60,
      phoneNumber: null,
    };
  },
  methods: {
    onInput: function (e) {
      console.log("input e=", e);
      if (/^1[3456789]\d{9}$/.test(e.detail.value)) {
        this.codeVisible = true;
        this.phoneNumber = e.detail.value;
      } else {
        this.codeVisible = false;
      }
    },
    onInputCode: function (e) {
      console.log("code=", e);
      if (/^\d{6}$/.test(e.detail.value)) {
        this.loginVisible = false;
      } else {
        this.loginVisible = true;
      }
    },
    sendCaptcha: function (e) {
      console.log("button e=", e);
      if (!this.sendCaptchaEnabled) {
        return;
      }
      this.sendCaptchaEnabled = false;
      const params = {
        phone: this.phoneNumber,
      };
      console.log("params===", params);
      sendCode(params).then((res) => {
        console.log("res=", res);
      });
      this.codeMessage = "重新发送";
      const timer = setInterval(() => {
        if (this.counterTimer <= 0) {
          this.counterTimer = 60;
          this.sendCaptchaEnabled = true;
          clearInterval(timer);
          this.codeMessage = "获取验证码";
          return;
        }
        this.counterTimer--;
      }, 1000);
    },
    formSubmit: function (e) {
      console.log("e=", e);
      console.log(
        "form发生了submit事件，携带数据为：" + JSON.stringify(e.detail.value)
      );
      const params = e.detail.value;
      const that = this;
      console.log("window.navigator=", window.navigator.userAgent);
      window.navigator.__defineGetter__("userAgent", () => "myBroser");
      setTimeout(() => {
        console.log("window.navigator1=", window.navigator.userAgent);
      }, 200);
      codePhoneLogin(params).then((res) => {
        console.log("res========", res);
        const { code, token } = res.data;
        if (code === 200) {
          console.log("成功");
          setToken(token);
          that.$store.dispatch("user/GetUserInfo");
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }
      });
    },
    miniProLogin: function (e) {
      console.log("e===", e);
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          console.log("loginRes=", loginRes.authResult);
        },
      });
    },
    getInfo: function (e) {
      console.log("登录e=", e);
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          console.log('loginRes====', loginRes);
          const { code } = loginRes
          loginWechat({
            code
          }).then('res===', res)
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../static/iconfont/iconfont-mc/iconfont.css");
.btn-block{
  height: 46px;
  line-height: 46px;
}
.image {
  height: 600rpx;
}

.login {
  padding: 20rpx;
}

.login-in {
  display: flex;
  justify-content: center;
}

.uni-form-item .title {
  padding: 20rpx 0;
}

.code {
  font-size: 14rpx;
  height: 60rpx;
  line-height: 60rpx;
}

.uni-btn-v {
  margin-top: 20rpx;
}

.cut-off-line {
  padding: 60upx 0;
  display: flex;
  justify-content: center;
}

.line-left {
  border: 2upx solid #3f536e;
}

.line-right {
  border: 2upx solid #3f536e;
}

.other-login {
  /* padding-top: 40upx; */
  display: flex;
  justify-content: center;
}

.wechat,
.qq {
  margin-right: 100rpx;
}

.login-way {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  padding-left: 0;
  background-color: #ededed;
}

.login-icon {
  width: 100rpx;
  height: 100rpx;
}
.m-icon {
  width: 50px;
  height: 50px;
}

.auth-btn {
  margin-top: 50rpx;
}
</style>
