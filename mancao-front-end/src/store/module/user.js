/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-20 17:46:39
 * @LastEditTime: 2021-12-21 15:45:37
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { getUserInfo } from '../../api/user'
import { validateObjAttr } from '../../utils/validate'

export const user = {
    namespaced: true,
    state: {
        userInfo: null || uni.getStorageSync('userInfo')
    },
    mutations: {
        setUserInfo(state, userInfo){
            if(!validateObjAttr(userInfo)){
                uni.showModal({
                    title: '提示',
                    content: '请完善个人信息资料',
                    success: function (res) {
                        if (res.confirm) {
                            uni.reLaunch({
                                url: '/pages/user/index'
                            });
                        } else if (res.cancel) {
                            
                        }
                    }
                });
            }
            state.userInfo = userInfo
            uni.setStorageSync('userInfo', userInfo)
        }
    },
    actions: {
        async GetUserInfo({commit}) {
            const { data: {
                code, data
            } } = await getUserInfo()
            console.log('data=', data)
            if(code === 200){
                commit('setUserInfo', data)
            }
        }
    }
}