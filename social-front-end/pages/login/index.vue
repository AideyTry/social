<template>
    <view class="login-wraper">
		<view class="image">
			<image style="width: 100%;height: 100%;" src="../../static/images/login-bg.gif" mode=""></image>
		</view>
        <view class="login">
            <form @submit="formSubmit" @reset="formReset" class="login-in">
                <view class="row uni-form-item uni-column">
                    <text class="col-10 title">用户名：</text>
                    <input class="col-12 uni-input" name="username" placeholder="请输入用户名" />
                </view>
                <view class="row uni-form-item uni-column">
                    <text class="col-10 title">密码：</text>
                    <input class="col-12 uni-input" name="password" placeholder="请输入密码" />
                </view>
                <view class="uni-btn-v">
                    <button form-type="submit" type="primary" class="btn-block">登录</button>
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
				<view class="login-way phone">
					<svg class="icon login-icon" aria-hidden="true">
					  <use xlink:href="#icon-yepian"></use>
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
            }
        },
        methods: {
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
	.wechat{
		margin-right: 150upx;
	}
    .login-way{
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}
	.login-icon{
		width: 150upx;
		height: 150upx;
	}
</style>
