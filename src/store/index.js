/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-20 17:45:49
 * @LastEditTime: 2022-01-06 22:28:47
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import {createStore} from 'vuex'

import { user } from './module/user'
import { modal } from './module/modal'
export const store = createStore({
    modules: {
        user,
        modal
    }
})