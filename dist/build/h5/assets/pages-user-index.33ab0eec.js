import{_ as a,E as s,o as e,c as t,w as r,e as l,A as u,J as o,K as n,O as d,R as c,P as f,Q as i,$ as _}from"./vendor.123e8ae1.js";import{a as p}from"./index.9a3d149a.js";import{_ as v}from"./plugin-vue_export-helper.21dcd24c.js";var m=v({setup(v){const m=a(),g=s((()=>m.state.user.userInfo)).value,w=()=>{new Promise(((a,s)=>{p(),a()})).then((()=>{location.reload()}))},x=()=>{d({url:"/pages/user/info/index"})};return(a,s)=>{const d=c,p=f,v=i,m=_;return e(),t(v,{class:"userinfo-wraper"},{default:r((()=>[l(v,{class:"userinfo"},{default:r((()=>[l(v,{class:"avatar-warper",onClick:x},{default:r((()=>[l(d,{src:u(g).avatar?u(g).avatar:"/static/images/default_avatar.png",class:"avatar"},null,8,["src"]),l(p,{class:"avatar-title"},{default:r((()=>[o("请上传图片")])),_:1})])),_:1}),l(v,{class:"userinfo-detail"},{default:r((()=>[l(p,null,{default:r((()=>[o("用户名："+n(u(g).username),1)])),_:1}),l(p,null,{default:r((()=>[o("签  名: "+n(u(g).motto),1)])),_:1})])),_:1})])),_:1}),l(m,{onClick:w},{default:r((()=>[o("退出")])),_:1})])),_:1})}}},[["__scopeId","data-v-58cdfe98"]]);export{m as default};