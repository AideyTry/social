/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-10 16:27:29
 * @LastEditTime: 2022-02-28 22:18:41
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    s: '%d秒前',
    m: "1分钟前",
    mm: "%d分钟前",
    h: "1小时前",
    hh: "%d小时前",
    d: "1天前",
    dd: "%d天前",
    M: "1个月前",
    MM: "%d个月前",
    y: "1年前",
    yy: "%d年前"
  }
})

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

export function formatDate(createTime){
    console.log('createTime===', createTime)
    return dayjs(createTime).toNow(true)
}