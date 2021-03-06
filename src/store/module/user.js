/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-20 17:46:39
 * @LastEditTime: 2022-05-15 14:24:42
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import { getUserInfo } from '../../api/user'
import { validataGender, validateObjAttr } from '../../utils/validate'
import { login } from '@/utils/im.js'
import {
    getStoreUserInfo,
    setStoreUserInfo
  } from "@/utils/storage.js";

export const user = {
    namespaced: true,
    state: {
        userInfo: null || getStoreUserInfo()
    },
    getters: {
        getUserInfo: (state) => {
            return state.userInfo || getStoreUserInfo()
        }
    },
    mutations: {
        setUserInfo(state, userInfo){
            if(!validataGender(userInfo)){
                console.log('不应该=', userInfo)
                // uni.reLaunch({
                //     url: '/pages/index/index'
                // });
                // console.log('uni.dlbModal===', uni.dlbModal)
                // uni.dlbModal({
                //     title: '提示',
                //     showCancel: false,
                //     content: '还未选性别1',
                //     success: function (res) {
                //         if (res.confirm) {
                //             uni.reLaunch({
                //                 url: '/pages/user/index'
                //             });
                //         }
                //     }
                // })
                uni.redirectTo({
                    url: '/pages/user/gender/index'
                });
                // uni.reLaunch({
                //     url: "/pages/user/RegGender",
                //   });
                // uni.showModal({
                //     title: '提示',
                //     showCancel: false,
                //     content: '还未选性别',
                //     success: function (res) {
                //         if (res.confirm) {
                //             uni.reLaunch({
                //                 url: '/pages/user/index'
                //             });
                //         }
                //     }
                // });
            }else if(!validateObjAttr(userInfo)){
                uni.showModal({
                    title: '提示',
                    content: '请完善头像、昵称等个人信息资料',
                    success: function (res) {
                        if (res.confirm) {
                            uni.reLaunch({
                                url: '/pages/user/index'
                            });
                        }
                    }
                });
            }
            state.userInfo = userInfo
            setStoreUserInfo(userInfo)
        }
    },
    actions: {
        async GetUserInfo({commit}) {
            const { data: {
                code, data
            } } = await getUserInfo()
            console.log('data=', data)
            if(code === 200){
                login()
                commit('setUserInfo', data)
            }
        },
        async IMLogin ({commit}){
            login()
        }
    }
}