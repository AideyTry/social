/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2022-01-05 21:28:36
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import {
	createSSRApp
} from "vue";
import { store } from '@/store/index'
// import './static/iconfont/iconfont.js'
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(store)
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
	return {
		app,
	};
}
