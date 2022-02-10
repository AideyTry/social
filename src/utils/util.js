/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-10 16:27:29
 * @LastEditTime: 2022-02-10 16:29:51
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
export function fileParse(file, type = 'base64') {
    return new Promise(resolve => {
        const fileRead = new FileReader()
        if(type === 'base64'){
            fileRead.readAsDataURL(file)
        } else if(type === 'buffer'){
            fileRead.readAsArrayBuffer(file)
        }
        fileRead.onload = (event) => resolve(event.target.result)
    })
}