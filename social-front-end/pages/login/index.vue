<template>
    <view class="login-wraper">
		<view class="image">
			<image style="width: 100%;height: 100%;" src="../../static/images/login-bg.gif" mode=""></image>
		</view>
        <view class="login">
            <form @submit="formSubmit" @reset="formReset" class="login-in">
                <view class="row uni-form-item uni-column">
                    <text class="col-8 title">手机号：</text>
                    <input class="col-16 uni-input" name="username" placeholder="请输入手机号" @input="onInput"/>
                </view>
                <view class="row uni-form-item uni-column">
                    <text class="col-8 title">验证码：</text>
                    <input class="col-8 uni-input" name="password" placeholder="请输入验证码" @input="onInputCode"/>
					<button class="col-8 code" v-if="codeVisible" :disabled="!sendCaptchaEnabled" @click="sendCaptcha">{{codeMessage}}<text v-if="!sendCaptchaEnabled">({{counterTimer}}s)</text></button>
                </view>
                <view class="uni-btn-v">
                    <button form-type="submit" type="primary" class="btn-block" :disabled="loginVisible" >登录</button>
                </view>
            </form>
			<view class="cut-off-line row">
				<view class="col-8 line-left"></view>
				<text>其他登录方式</text>
				<view class="col-8 line-right"></view>
			</view>
			<view class="other-login">
				<view class="login-way wechat">
					<svg class="icon login-icon" aria-hidden="true">
					  <use xlink:href="#icon-weixin"></use>
					</svg>
				</view>
				<view class="login-way qq">
					<svg class="icon login-icon" aria-hidden="true">
					  <use xlink:href="#icon-QQ"></use>
					</svg>
				</view>
				<view class="login-way weibo">
					<svg class="icon login-icon" aria-hidden="true">
					  <use xlink:href="#icon-weibo"></use>
					</svg>
				</view>
			</view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
				codeVisible: false,
				loginVisible: true,
				sendCaptchaEnabled: true,
				codeMessage: '获取验证码',
				counterTimer: 60
            }
        },
        methods: {
			onInput: function(e){
				console.log('input e=', e)
				if((/^1[3456789]\d{9}$/.test(e.detail.value))){
					this.codeVisible = true
				} else {
					this.codeVisible = false
				}
			},
			onInputCode: function(e){
				console.log('code=', e)
				if(/^\d{6}$/.test(e.detail.value)){
					this.loginVisible = false
				} else {
					this.loginVisible = true
				}
			},
			sendCaptcha: function(e){
				console.log('button e=', e)
				if(!this.sendCaptchaEnabled){
					return
				}
				this.sendCaptchaEnabled = false
				this.codeMessage = '重新发送'
				const timer = setInterval(() => {
					if(this.counterTimer <= 0){
						this.counterTimer = 60
						this.sendCaptchaEnabled = true
						clearInterval(timer)
						this.codeMessage = '获取验证码'
						return
					}
					this.counterTimer--
				}, 1000)
			},
            formSubmit: function(e) {
				console.log('e=', e)
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                var formdata = e.detail.value
                uni.showModal({
                    content: '表单数据内容：' + JSON.stringify(formdata),
                    showCancel: false
                });
            },
            formReset: function(e) {
                console.log('清空数据')
            }
        }
    }
</script>

<style>
	.image{
		height: 600upx;
	}
	.login{
		padding: 20upx;
	}
	.login-in{
		display: flex;
		justify-content: center;
	}
    .uni-form-item .title {
        padding: 20upx 0;
    }
	.code{
		font-size: 14upx;
	}
	.uni-btn-v{
		margin-top: 20upx;
	}
	.cut-off-line{
		padding: 60upx 0;
		display: flex;
		justify-content: center;
	}
	.line-left{
		border: 2upx solid #3F536E
	}
	.line-right{
		border: 2upx solid #3F536E
	}
	.other-login{
		/* padding-top: 40upx; */
		display: flex;
		justify-content: center;
	}
	.wechat, .qq{
		margin-right: 100upx;
	}
    .login-way{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.login-icon{
		width: 100upx;
		height: 100upx;
	}
</style>
