/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-21 14:59:25
 * @LastEditTime: 2022-01-09 19:40:10
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
export const validateObjAttr = (obj) => {
    const arr = Object.keys(obj).map(key => obj[key])
    return arr.every(element => element || (element === 0))
}

export const validataGender = (obj) => {
    console.log('obj===', obj)
    if(obj['gender']){
        console.log('scss')
        return true
    } else {
        return false
    }
}