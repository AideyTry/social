import{z as e,A as s,a3 as t,_ as o,o as a,c as n,w as r,e as l,a6 as c,P as u}from"./vendor.99a7c6c2.js";import{C as d,o as g}from"./ChatContent.9f306e63.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";var p=i({components:{ChatContent:d},setup(o){let a=e("");const n=e([]);return s((()=>{t({title:o.title}),(()=>{const e={groupID:"",startClientMsgID:"",count:1e4,userID:o.userID};g.getHistoryMessageList(e).then((({data:e})=>{console.log("历史数据=",JSON.parse(e)),n.value=[...JSON.parse(e).reverse()]})).catch((e=>{}))})(),g.on("OnRecvNewMessage",(e=>{const s=JSON.parse(e.data);101===s.contentType&&n.value.unshift(s)}))})),{inputString:a,messageInfo:n,onConfirm:e=>{console.log("event=",e);const{value:s}=e.detail;a.value=s;const t={title:"you have a new message",desc:"",ex:"",iOSPushSound:"",iOSBadgeCount:!1};console.log("props.userID=",o.userID),g.createTextMessage(s).then((e=>{console.log("res========",e),console.log("message=",JSON.parse(e.data));const s={recvID:o.userID,groupID:"",offlinePushInfo:t,message:e.data};g.sendMessage(s).then((({data:e,errCode:s})=>{console.log("data, errCode ============================",e,s);const t=JSON.parse(e);n.value.unshift(t),a.value=""})).catch((e=>{console.log("err=",e)}))})).catch((e=>{console.log("text err=",e)}))}}}},[["render",function(e,s,t,d,g,i){const p=o("ChatContent"),m=c,f=u;return a(),n(f,{class:"chat-wraper"},{default:r((()=>[(a(),n(p,{key:d.messageInfo,msgList:d.messageInfo},null,8,["msgList"])),l(f,{class:"send-msg"},{default:r((()=>[l(m,{type:"text",placeholder:"请输入消息",modelValue:d.inputString,"onUpdate:modelValue":s[0]||(s[0]=e=>d.inputString=e),class:"send",onConfirm:d.onConfirm},null,8,["modelValue","onConfirm"])])),_:1})])),_:1})}],["__scopeId","data-v-368c6d11"]]);export{p as default};
//# sourceMappingURL=pages-message-Chat.cf539664.js.map