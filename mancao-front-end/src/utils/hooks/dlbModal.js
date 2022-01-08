/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-06 21:56:15
 * @LastEditTime: 2022-01-08 23:56:53
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { store } from '@/store/index'
import prompt from '@system.prompt'

export default function (options){
    console.log('options=', options)
    console.log('store=', store)
    store.commit('modal/showModal', options)
    console.log('prompt===', prompt)
    uni.$emit('onShowModal', options)
}
