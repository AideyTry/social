/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-10 16:27:29
 * @LastEditTime: 2022-05-17 17:46:58
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
    const week = (w) => {
        switch(w){
            case '1': return '一';
            case '2': return '二';
            case '3': return '三';
            case '4': return '四';
            case '5': return '五';
            case '6': return '六';
            case '7': return '日';
        }
    }
    if(moment(timestamp).isSameOrAfter(moment(), "day")){
       return moment(timestamp).format('H:mm');
    } else if(moment(timestamp).isSameOrAfter(moment().subtract(1, 'day'), "day")){
        return `昨天${moment(timestamp).format('H:mm')}`;
    } else if(moment(timestamp).isSameOrAfter(moment().subtract(7, 'day'), "day")){
        return `星期${week(moment(timestamp).format('E'))} ${moment(timestamp).format('H:mm')}`;
    }else {
        return moment(timestamp).format('YYYY年M月D日 H:mm');
    }
  };