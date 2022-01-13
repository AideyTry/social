/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-21 14:59:25
 * @LastEditTime: 2022-01-10 09:30:35
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
export const validateObjAttr = (obj) => {
    console.log('obj=====', obj)
    const arr = Object.keys(obj).map(key => obj[key])
    console.log('arr===', arr)
    return arr.every(element => element || (element === 0))
}

export const validataGender = (obj) => {
    console.log('obj===', obj)
    console.log("obj['gender']=", obj['gender'])
    if(obj['gender']){
        console.log('true')
        return true
    } else {
        console.log('false')
        return false
    }
}