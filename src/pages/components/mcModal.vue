<template>
	<view class="_showModal" v-show="show">
		<text>666</text>
		<!-- <view class="_shade"></view>
		<view class="_modalBox" @click="closeModal" @touchmove.stop.prevent="">
			<view class="_modal">
				<slot name="title">
					<view class="title" v-show="title">{{title}}</view>
				</slot>
				<slot name="content">
					<view class="content">
						{{content}}
					</view>
				</slot>
				<slot name="btn">
					<view class="btnbox">
						<view class="cancel btn" v-show="showCancel" :style="cancelColor" @click.stop="clickBtn('cancel')">{{cancelText}}</view>
						<view class="confirm btn" :style="confirmColor" @click.stop="clickBtn('confirm')">{{confirmText}}</view>
					</view>
				</slot>
			</view>
		</view> -->
	</view>
</template>

<script>
import { store } from '@/store/index'
export default {
	onLoad(){
		uni.$on('onShowModal', (options) => {
			console.log('on optine=', options)
		})
	},
	computed: {
		show(){
            console.log('store=====', store)
			return store.state.modal.show;
		},
		title(){
			return store.state.modal.title;
		},
		content(){
			return store.state.modal.content;
		},
		showCancel(){
			return store.state.modal.showCancel;
		},
		cancelText(){
			return store.state.modal.cancelText;
		},
		cancelColor(){
			return "color:"+store.state.modal.cancelColor;
		},
		confirmText(){
			return store.state.modal.confirmText;
		},
		confirmColor(){
			return "color:"+store.state.modal.confirmColor;
		}
	},
	mounted(){
	},
	methods:{
		closeModal(){
			store.commit('modal/hideModal')
		},
		clickBtn(res){
			store.commit('modal/hideModal')
			store.commit('modal/success',res)
		}
	},
	beforeDestroy(){
		store.commit('modal/hideModal')
	}
};
</script>

<style lang="scss" scoped>
	._showModal{
		position: fixed;
		top: 0;
		left:0;
		width: 100vw;
		height: 100vh;
		z-index:10000;
		._shade{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: #000;
			opacity: .6;
			z-index:11000;
		}
		._modalBox{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index:12000;
			display: flex;
			justify-content: center;
			align-items: center;
			._modal{
				flex: none;
				width:70%;
				// min-height:200upx;
				background: #fff;
				border-radius: 10upx;
				.title{
					height: 40upx;
					line-height: 40upx;
					text-align: center;
					font-size: 26upx;
					font-weight: bold;
					padding: 15upx 0 0;
					// border-bottom: 1upx solid #e1e1e1;
				}
				.content{
					padding:30upx;
					font-size: 24upx;
					color: #666;
					line-height: 35upx;
					text-align: center;
				}
				.btnbox{
					display: flex;
					.btn{
						font-size: 30upx;
						text-align: center;
						flex: auto;
						line-height: 80upx;
						border-top: 1upx solid #e1e1e1;
						border-right: 1upx solid #e1e1e1;
					}
					.btn:last-child{
						border-right:none;
					}
					.cancel{
						
					}
				}
			}
		}
		
	}
</style>
