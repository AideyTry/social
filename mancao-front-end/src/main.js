/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2021-12-21 15:59:37
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
	return {
		app,
	};
}
