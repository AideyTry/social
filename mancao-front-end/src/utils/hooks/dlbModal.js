/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-06 21:56:15
 * @LastEditTime: 2022-01-07 12:24:56
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { store } from '@/store/index'
export default function (options){
    console.log('options=', options)
    console.log('store=', store)
    store.commit('modal/showModal', options)
    uni.$emit('onShowModal', options)
}
