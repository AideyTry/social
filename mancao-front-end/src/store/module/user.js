/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-20 17:46:39
 * @LastEditTime: 2021-12-20 18:00:56
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { getUserInfo } from '../../api/user'

export const user = {
    namespaced: true,
    state: {
        userInfo: null
    },
    motations: {
        setUserInfo(state, userInfo){
            state.userInfo = userInfo
        }
    },
    acitons: {
        async GetUserInfo({commit}) {
            const res = await getUserInfo()
            console.log('res=', res)
            if(res.code === 200){
                commit('setUserInfo', res.data)
            }
        }
    }
}