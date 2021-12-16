<template>
	<view class="login-wraper">
		<view class="image">
			<image style="width: 100%;height: 100%;" src="../../static/images/login-bg.gif" mode=""></image>
		</view>
		<view class="login">
			<form @submit="formSubmit" @reset="formReset" class="login-in">
				<view class="row uni-form-item uni-column">
					<text class="col-8 title">手机号：</text>
					<input class="col-16 uni-input" name="phone" placeholder="请输入手机号" @input="onInput" />
				</view>
				<view class="row uni-form-item uni-column">
					<text class="col-8 title">验证码：</text>
					<input class="col-8 uni-input" name="code" placeholder="请输入验证码" @input="onInputCode" />
					<button class="col-8 code" v-if="codeVisible" :disabled="!sendCaptchaEnabled"
						@click="sendCaptcha">{{codeMessage}}<text
							v-if="!sendCaptchaEnabled">({{counterTimer}}s)</text></button>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit" type="primary" class="btn-block" :disabled="loginVisible">登录</button>
				</view>
			</form>
			<view class="cut-off-line row">
				<view class="col-8 line-left"></view>
				<text>其他登录方式</text>
				<view class="col-8 line-right"></view>
			</view>
			<view class="other-login">
				<button open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true"
					class="login-way wechat">
					<image scr="../../static/images/wechat.jpeg"></image>
<!-- 					<svg class="icon login-icon" aria-hidden="true">
						<use xlink:href="#icon-weixin"></use>
					</svg> -->
				</button>
				<!-- </view> -->
				<view class="login-way qq">
					QQ
<!-- 					<svg class="icon login-icon" aria-hidden="true">
						<use xlink:href="#icon-QQ"></use>
					</svg> -->
				</view>
				<view class="login-way weibo">
					微博
<!-- 					<svg class="icon login-icon" aria-hidden="true">
						<use xlink:href="#icon-weibo"></use>
					</svg> -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		sendCode,
		codePhoneLogin
	} from '../../api/user.js'
	import {
		setToken
	} from '../../utils/auth.js'
	export default {
		data() {
			return {
				codeVisible: false,
				loginVisible: true,
				sendCaptchaEnabled: true,
				codeMessage: '获取验证码',
				counterTimer: 30,
				phoneNumber: null
			}
		},
		methods: {
			onInput: function(e) {
				console.log('input e=', e)
				if ((/^1[3456789]\d{9}$/.test(e.detail.value))) {
					this.codeVisible = true
					this.phoneNumber = e.detail.value
				} else {
					this.codeVisible = false
				}
			},
			onInputCode: function(e) {
				console.log('code=', e)
				if (/^\d{6}$/.test(e.detail.value)) {
					this.loginVisible = false
				} else {
					this.loginVisible = true
				}
			},
			sendCaptcha: function(e) {
				console.log('button e=', e)
				if (!this.sendCaptchaEnabled) {
					return
				}
				this.sendCaptchaEnabled = false
				const params = {
					phone: this.phoneNumber
				}
				sendCode(params).then(res => {
					console.log('res=', res)
				})
				this.codeMessage = '重新发送'
				const timer = setInterval(() => {
					if (this.counterTimer <= 0) {
						this.counterTimer = 30
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
				const params = e.detail.value

				console.log('window.navigator=', window.navigator.userAgent)
				window.navigator.__defineGetter__('userAgent', () => 'myBroser')
				setTimeout(() => {
					console.log('window.navigator1=', window.navigator.userAgent)
				}, 200)
				codePhoneLogin(params).then(res => {
					console.log('res========', res)
					const {
						code,
						token
					} = res.data
					if (code === 200) {
						console.log('成功')
						setToken(token)
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				})
				// var formdata = e.detail.value
				// uni.showModal({
				//     content: '表单数据内容：' + JSON.stringify(formdata),
				//     showCancel: false
				// });
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			// 微信登录
			getuserinfo: function(res1) {
				console.log(res1);
				//如果只需要opendid 和非加密数据至此登录完成
				//此处连接数据库利用openid 就可以进行登录环节
				//免费的视频教程 http://www.hcoder.net/tutorials/info_141.html
				wx.login({
					success: function(res2) {
						console.log('res1=', res1)
						console.log('res2=', res2)
						//获取 sessionKey
						// wx.request({
						// 	url: 'https:///hoa.hcoder.net/xcxencode/?c=sk&appid=wxbb7f9f1f2c6f4f33&secret=739b970b832f0df158f54c494a08e440&code=' +
						// 		res2.code,
						// 	success: function(res3) {
						// 		console.log(res3);
						// 		//记录到本地
						// 		try {
						// 			uni.setStorageSync('sk', res3.data.session_key);
						// 			uni.setStorageSync('openid', res3.data.openid);
						// 		} catch (e) {
						// 			//TODO handle the exception
						// 		}
						// 		uni.hideLoading();
						// 		//以下步骤可以获取加密信息，需要授权
						// 		//获取加密信息
						// 		if (!res1.detail.iv) {
						// 			uni.showToast({
						// 				title: "您取消了授权,登录失败",
						// 				icon: "none"
						// 			});
						// 			return false;
						// 		}
						// 		try {
						// 			var sessionKey = uni.getStorageSync('sk');
						// 			console.log(sessionKey);
						// 		} catch (e) {
						// 			//TODO handle the exception
						// 		}
						// 		uni.request({
						// 			/**
						// 			* $appid         = $_POST['appid'];
						// 			 $sessionKey    = $_POST['sessionKey'];
						// 			 $encryptedData = $_POST['encryptedData'];
						// 			 $iv            = $_POST['iv'];
						// 			*/
						// 			method: "POST",
						// 			url: 'https:///hoa.hcoder.net/xcxencode/',
						// 			header: {
						// 				'content-type': 'application/x-www-form-urlencoded'
						// 			},
						// 			data: {
						// 				appid: "wxbb7f9f1f2c6f4f33",
						// 				sessionKey: sessionKey,
						// 				iv: res1.detail.iv,
						// 				encryptedData: res1.detail.encryptedData
						// 			},
						// 			success: function(res4) {
						// 				//"﻿﻿﻿{"openId":"oS6of0V0rdp9nY_BuvCnQUasOHYc","nickName":"深海",
						// 				//"gender":1,"language":"zh_CN","city":"Xi'an","province":"Shaanxi",
						// 				//"country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/7iags6YD4enyU"
						// 				console.log(res4);
						// 				//至此登录完成
						// 			}
						// 		});
						// 	}
						// })
					}
				});
			}
		}
	}
</script>

<style>
	.image {
		height: 600upx;
	}

	.login {
		padding: 20upx;
	}

	.login-in {
		display: flex;
		justify-content: center;
	}

	.uni-form-item .title {
		padding: 20upx 0;
	}

	.code {
		font-size: 14upx;
	}

	.uni-btn-v {
		margin-top: 20upx;
	}

	.cut-off-line {
		padding: 60upx 0;
		display: flex;
		justify-content: center;
	}

	.line-left {
		border: 2upx solid #3F536E
	}

	.line-right {
		border: 2upx solid #3F536E
	}

	.other-login {
		/* padding-top: 40upx; */
		display: flex;
		justify-content: center;
	}

	.wechat,
	.qq {
		margin-right: 100upx;
	}

	.login-way {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}

	.login-icon {
		width: 100upx;
		height: 100upx;
	}
</style>
