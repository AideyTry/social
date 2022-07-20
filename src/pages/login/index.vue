<template>
  <view class="login-wraper">
    <view class="image-wraper">
      <!-- <image
        style="width: 100%; height: 100%"
        src="../../static/images/login-bg.gif"
        mode=""
      ></image> -->
      <image class="image" src="../../static/logo.png"></image>
      <text class="logo-title">蔓草兴趣</text>
    </view>
    <view class="login">
      <!-- #ifdef H5 || APP-PLUS || MP-WEIXIN -->
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
            :disabled="!sendCaptchaEnabled || codeVisible"
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
        <mc-tooltip placement="top-start" :visible="tooltipVisible" content="请先勾选同意后再进行登录">
        <view :class="{'protocol-wraper': true, shake: tooltipVisible}">
          <radio-group @change="protocolChange">
            <label>
              <radio :value="protocolChecked" :checked="protocolChecked" />
              <text class="agreement">我已阅读并同意</text>
              <text class="protocol" @click.stop="goProtocol">用户协议</text>和<text class="privacy" @click.stop="goPrivacy">隐私政策</text>
            </label>
          </radio-group>
        </view>
        </mc-tooltip>
      </form>
      <show-modal
        v-if="demoVisible"
        :title="'请选择账号'"
        :content="'请任意选择一个账号登录'"
        @close="onClose"
      ></show-modal>
      <!-- #ifdef H5 -->
      <vuew class="demo"
        ><button class="demo-title" @click="openDemo">
          点击可使用演示账号登录
        </button></vuew
      >
      <!-- #endif -->
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <view class="cut-off-line row">
        <view class="col-8 line-left"></view>
        <text>其他登录方式</text>
        <view class="col-8 line-right"></view>
      </view>
      <view class="other-login">
        <button
          @click="wechatLogin"
          withCredentials="true"
          class="login-way wechat"
        >
          <view class="m-icon m-icon-weixin"></view>
        </button>
        <!-- </view> -->
        <button
          @click="qqLogin"
          withCredentials="true"
          class="login-way wechat"
        >
          <view class="m-icon m-icon-QQ"></view>
        </button>
        <button
          @click="weiboLogin"
          withCredentials="true"
          class="login-way wechat"
        >
          <view class="m-icon m-icon-weibo"></view>
        </button>
      </view>
      <!-- #endif -->
    </view>

    <!-- #ifdef MP-WEIXIN -->
    <!-- <button
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
    </button> -->

    <!-- #endif -->
    <view class="gov-wraper"
      ><uni-link
        class="gov"
        :showUnderLine="false"
        href="https://beian.miit.gov.cn/"
        text="粤ICP备2021179573号"
      ></uni-link
    ></view>
  </view>
</template>
<script>
import { sendCode, codePhoneLogin } from "../../api/user.js";
import { setToken } from "../../utils/auth.js";
import ShowModal from "@/pages/components/ShowModal.vue";
import mcTooltip from '@/pages/components/mcTooltip.vue'

/*  #ifdef  MP-WEIXIN  */
import { loginWechat } from "../../api/wechat";
/*  #endif  */
export default {
  components: {
    ShowModal: ShowModal,
    mcTooltip
  },
  data() {
    return {
      codeVisible: true,
      loginVisible: true,
      demoVisible: false,
      sendCaptchaEnabled: true,
      codeMessage: "获取验证码",
      counterTimer: 60,
      phoneNumber: null,
      protocolChecked: false,
      tooltipVisible: false,
      timer: null
    };
  },
  methods: {
    onInput: function (e) {
      console.log("input e=", e);
      if (/^1[3456789]\d{9}$/.test(e.detail.value)) {
        this.codeVisible = false;
        this.phoneNumber = e.detail.value;
      } else {
        this.codeVisible = true;
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
      if(!that.protocolChecked){
        that.tooltipVisible = true
        console.log('this.tooltipVisible===', that.tooltipVisible)
        that.timer = setTimeout(() => {
          that.tooltipVisible = false
          console.log('this.tooltipVisible2222===', that.tooltipVisible)
        }, 2000)
        return
      }
      // console.log("window.navigator=", window.navigator.userAgent);
      // window.navigator.__defineGetter__("userAgent", () => "myBroser");
      // setTimeout(() => {
      //   console.log("window.navigator1=", window.navigator.userAgent);
      // }, 200);
      codePhoneLogin(params).then((res) => {
        console.log("res========", res);
        const { code, token } = res.data;
        if (code === 200) {
          console.log("成功");
          that.timer = null
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
    wechatLogin: function () {
      uni.showToast({
        title: "待上线",
        duration: 2000,
      });
    },
    qqLogin: function () {
      uni.showToast({
        title: "待上线",
        duration: 2000,
      });
    },
    weiboLogin: function () {
      uni.showToast({
        title: "待上线",
        duration: 2000,
      });
    },
    getInfo: function (e) {
      console.log("登录e=", e);
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          console.log("loginRes====", loginRes);
          const { code } = loginRes;
          loginWechat({
            code,
          }).then("res===", res);
        },
      });
    },
    openDemo: function () {
      this.demoVisible = true;
    },
    onClose: function () {
      this.demoVisible = false;
    },
    protocolChange: function (value) {
      console.log("value===", value);
      this.protocolChecked = !value.detail.value;
      if(this.protocolChecked){
        this.tooltipVisible = false
      }
    },
    goProtocol: function(){
      uni.navigateTo({
        url: "/pages/protocol/Protocol",
      });
    },
    goPrivacy: function(){
      uni.navigateTo({
        url: "/pages/privacy/Privacy",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("../../static/iconfont/iconfont-mc/iconfont.css");
.login-wraper {
  background-color: #fdfdfd;
  position: relative;
  height: 100vh;
}
.btn-block {
  height: 46px;
  line-height: 46px;
}
.image-wraper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
  .image {
    height: 180rpx;
    width: 180rpx;
    border-radius: 100%;
  }
  .logo-title {
    margin-top: 6rpx;
    font-size: 56rpx;
    font-family: "Times New Roman", Times, serif;
    color: #434343;
    font-weight: 500;
  }
}

.login {
  padding: 20rpx;
}

.login-in {
  display: flex;
  justify-content: center;
}
.uni-form-item .title {
  padding: 40rpx 0;
  font-size: 32rpx;
}

.code {
  width: 208rpx;
  font-size: 24rpx;
  height: 68rpx;
  line-height: 68rpx;
}
uni-button::after {
  border: none !important;
}

.uni-btn-v {
  margin-top: 40rpx;
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
  margin-top: 60rpx;
}
.gov-wraper {
  position: absolute;
  bottom: 100rpx;
  width: 100%;
}
.gov {
  display: flex;
  justify-content: center;
  width: 100%;
}
::v-deep .uni-radio-input{
	width: 16px;
	height: 16px;
  }
.protocol-wraper{
  font-size: 24rpx;
  color: #999;
  .protocol, .privacy{
    color: #0a8cd2;
  }
}
	.shake{
 		animation-delay: 0s;
	    animation-name: shock;
	    animation-duration: .1s;
	    animation-iteration-count: 3;
	    animation-direction: normal;
	    animation-timing-function: linear;
	}

	@keyframes shock {
	    0% {
	        margin-left: 0rpx;
	        margin-right: 20rpx;
	        margin-top: 0rpx;
	    }
	    100% {
	        margin-left: 20rpx;
	        margin-right: 0rpx;
	        margin-top: 0rpx	;
	    }
	}

.demo {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
  .demo-title {
    background-color: #42b983;
    color: #fff;
  }
}
</style>
