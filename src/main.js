/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2022-01-20 11:18:25
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import {
	createSSRApp
} from "vue";
import { store } from '@/store/index'
// import './static/iconfont/iconfont.js'

import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css

import App from "./App.vue";
// import dlbModal from './utils/hooks/dlbModal'

export function createApp() {
	const app = createSSRApp(App);
	app.use(store)
	app.use(vue3videoPlay)
	app.config.globalProperties.$filters = {
		filterRegion(value, array) {
		  const proviceObj = array.find(element => element.code === value)
		  if(!proviceObj){
			  return '市辖区'
		  }
		  if(!proviceObj.name){
			return proviceObj
		  }
		  return proviceObj.name
		},
		filterGender(value){
			const genderStatusMap = {
				'1': '男',
				'2': '女'
			  }
			  return (genderStatusMap[value] || '')
		}
	  }
	// uni.dlbModal = dlbModal
	return {
		app,
	};
}