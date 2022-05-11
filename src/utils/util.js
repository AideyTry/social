/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-10 16:27:29
 * @LastEditTime: 2022-05-11 16:26:32
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import moment from 'moment'
moment.updateLocale('en', {
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
    return moment(createTime).toNow(true)
}

export const formatMsgDate = (timestamp) => {
    const now = new Date(timestamp);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    let minute= now.getMinutes();
    if (minute.toString().length === 1) minute = "0" + minute;
    let second = now.getSeconds();
    if (second.toString().length === 1) second = "0" + second;
    const str1 = year + "-" + month + "-" + date;
    // const str2 = hour + ":" + minute + ":" + second
    const str2 = hour + ":" + minute;
    return [year, month, date, str1, str2];
  };