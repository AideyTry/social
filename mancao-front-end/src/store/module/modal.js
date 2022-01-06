/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-06 22:26:23
 * @LastEditTime: 2022-01-06 22:28:27
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
export const modal = {
    namespaced: true,
    state: {
        show:false,
        title:"标题",
        content:'内容',
        showCancel:true,
        cancelText:"取消",
        cancelColor:"#000000",
        confirmText:"确定",
        confirmColor:"#576b95",
        success:null,
    },
    mutations: {
        hideModal(state) {
            // 小程序导航条页面控制
            // #ifndef H5
            if(state.hideTabBar){
                wx.showTabBar();
            }
            // #endif
            state.show = false
        },
        showModal(state,data) {
            state = Object.assign(state,data)
            console.log(state);
            state.show = true
        },
        success(state,res) {
            let cb = state.success
            let resObj={
                cancel:false,
                confirm:false
            }
            res=="confirm"?resObj.confirm=true:resObj.cancel=true
            cb && cb(resObj)
        }
    },
    actions: {
    }
}