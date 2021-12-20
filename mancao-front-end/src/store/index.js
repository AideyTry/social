/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-20 17:45:49
 * @LastEditTime: 2021-12-20 17:47:04
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import {createStore} from 'vuex'

import { user } from './module/user'
export const store = createStore({
    modules: {
        user
    }
})