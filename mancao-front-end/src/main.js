/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2021-12-28 16:21:25
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
			console.log('value, array==========', value, array)
		  const proviceObj = array.find(element => element.code === value)
		  console.log('proviceObj===', proviceObj)
		  if(!proviceObj){
			  return ''
		  }
		  if(!proviceObj.name){
			return proviceObj
		  }
		  return proviceObj.name
		}
	  }
	return {
		app,
	};
}
