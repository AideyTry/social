import{a2 as o,T as e,S as a,z as t,A as s,Z as l,U as n,o as c,D as i,e as u,w as d,J as r,K as p,c as f,M as m,E as h,I as b,a0 as y,ap as g,ae as v,l as _,aw as I,P as k,O as x,Q as C,W as j,a6 as w,a9 as V,n as T}from"./vendor.34c9d7f1.js";import{_ as F,a as P}from"./uni-forms.425acad1.js";import{r as z}from"./uni-app.es.bcea8a55.js";import{l as L}from"./index.0b6b4e02.js";import{b as D}from"./hobby.0b52dda4.js";import{u as E,b as S}from"./publish.03113725.js";import{C as U}from"./Comment.9cfa000e.js";import{V as q}from"./VideoPlayer.a3887504.js";import{f as B,b as M}from"./index.d686a517.js";import{_ as O}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.d002b874.js";import"./communication.212f6add.js";var A=O({components:{Comment:U,VideoPlayer:q},onLoad:function(o){console.log("options===",o)},onReady:function(){},setup(l){console.log("props=",l);const n=o();e((()=>n.state.user.userInfo)).value;const c=a({poster:"",src:""});let i=t([{content:"https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif"}]);t(0),t("default");let u=t({});let d=t(null),r=t(["编辑","删除"]),p=t(0);const f=t([]),m=t(null);return s((()=>{(o=>{const{id:e,hobby:a}=o;D({id:e,hobby:a}).then((o=>{200===o.data.code&&(u.value=o.data.data,d.value=B(o.data.data.create_time),o.data.data.video_url||(f.value=u.value.photos.map(((o,e)=>({path:o})))),c.poster=o.data.data.url,c.src=o.data.data.video_url)}))})({id:l.id,hobby:l.hobby})})),{hobbyInfo:u,photos:f,info:i,publishDate:d,options:c,goBack:()=>{y({url:"/pages/user/index"})},onEdit:(o,e)=>{console.log("item, index===",o,e),g({itemList:r,success:function(o){console.log("选中了第"+(o.tapIndex+1)+"个按钮"),p.value=o.tapIndex,1===p.value?(o=>{f.value.length<=1?T({content:"至少需要发布一张图片",confirmText:"知道了",showCancel:!1,success:function(o){o.confirm?console.log("用户点击确定"):o.cancel&&console.log("用户点击取消")}}):(f.value.splice(o,1),console.log("photos.value===========",f.value))})(e):(o=>{v({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){const{tempFiles:a}=e;f.value[o]=a[0]}})})(e)},fail:function(o){console.log(o.errMsg)}})},operations:r,activeOperationIndex:p,addImage:()=>{v({count:6,sizeType:["original","compressed"],sourceType:["album"],success:function(o){console.log("res===",o);const{tempFiles:e}=o;f.value=f.value.concat(e),console.log("photos.value====",f.value)}})},form:m,changeTitle:o=>{const{detail:e}=o;u.value.title.value=e},changeContent:o=>{const{detail:e}=o;u.value.content.value=e},submit:()=>{m.value.validate().then((async o=>{console.log("表单数据信息：",o);const{title:e,content:a}=o;if(console.log("photos=====",f.value),f.value.length<=0){const o={title:e,id:parseInt(l.id),hobby:parseInt(l.hobby),content:a};return void E(o).then((o=>{200===o.data.code&&(_({title:o.data.msg,duration:2e3}),y({url:"/pages/user/index",success(){let o=I().pop();console.log("page==============",o),o&&o.onLoad()}}))}))}const t=f.value.map(((o,e)=>({key:o,index:e}))),s=t.filter((o=>o.key.path.includes("social-1308251497"))),n=t.filter((o=>o.key.path.includes("blob:"))),c=[];for(let l of n){const o=await M(l.key,"base64");c.push({index:l.index,filename:l.key.name,chunk:o})}const i=u.value.photos[0].match(/myqcloud.com\/(\S*)/)[1].match(/(\S*)\//)[1],d=s.map((o=>({index:o.index,path:o.key.path}))),r={uploadHash:i,uploadFiles:c.length>0?c:[],remotePhotos:d.length>0?d:[],title:e,id:parseInt(l.id),hobby:parseInt(l.hobby),content:a};S(L.stringify(r)).then((o=>{200===o.data.code&&(_({title:o.data.msg,duration:2e3}),y({url:"/pages/user/index",success(){let o=I().pop();console.log("page==============",o),o&&o.onLoad()}})),console.log("data=",o)}))})).catch((o=>{console.log("表单错误信息：",o)}))}}}},[["render",function(o,e,a,t,s,y){const g=k,v=x,_=C,I=j,T=l("VideoPlayer"),L=w,D=z(n("uni-forms-item"),F),E=l("Comment"),S=z(n("uni-forms"),P),U=V;return c(),i("div",{class:"hobby-detail"},[u(S,{ref:"form",modelValue:t.hobbyInfo},{default:d((()=>[u(g,{class:"author-wraper"},{default:d((()=>[u(g,{class:"author"},{default:d((()=>[u(g,{onClick:t.goBack},{default:d((()=>[r("返回")])),_:1},8,["onClick"]),u(g,{class:"author-info"},{default:d((()=>[u(v,{class:"avatar",mode:"aspectFit",src:t.hobbyInfo.avatar||""},null,8,["src"]),u(_,null,{default:d((()=>[r(p(t.hobbyInfo.username||""),1)])),_:1})])),_:1})])),_:1})])),_:1}),0===t.hobbyInfo.fileType?(c(),f(I,{key:0,"scroll-x":"true",class:"photos"},{default:d((()=>[u(g,{class:"photos"},{default:d((()=>[(c(!0),i(m,null,h(t.photos,((o,e)=>(c(),f(g,{class:"photo-wraper",key:e},{default:d((()=>[u(v,{mode:"aspectFill",src:o.path,class:"photo",onClick:a=>t.onEdit(o,e)},null,8,["src","onClick"])])),_:2},1024)))),128)),u(g,{class:"photo-add-wraper",onClick:t.addImage},{default:d((()=>[u(_,{class:"photo-add"},{default:d((()=>[r("+")])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1})):b("v-if",!0),1===t.hobbyInfo.fileType?(c(),f(g,{key:1,class:"swiper-box"},{default:d((()=>[u(g,{class:"swiper-item"},{default:d((()=>[(c(),f(T,{options:{src:t.hobbyInfo.video_url,poster:t.hobbyInfo.url},key:t.hobbyInfo.id},null,8,["options"]))])),_:1})])),_:1})):b("v-if",!0),u(g,{class:"content-wraper"},{default:d((()=>[u(g,{class:"content"},{default:d((()=>[u(g,{class:"title"},{default:d((()=>[u(D,{name:"title"},{default:d((()=>[u(L,{modelValue:t.hobbyInfo.title,"onUpdate:modelValue":e[0]||(e[0]=o=>t.hobbyInfo.title=o),type:"text",placeholder:"请输入文本",onConfirm:t.changeTitle},null,8,["modelValue","onConfirm"])])),_:1})])),_:1}),u(g,{class:"main"},{default:d((()=>[u(D,{name:"content"},{default:d((()=>[u(L,{modelValue:t.hobbyInfo.content,"onUpdate:modelValue":e[1]||(e[1]=o=>t.hobbyInfo.content=o),type:"text",placeholder:"请输入文本",onConfirm:t.changeContent},null,8,["modelValue","onConfirm"])])),_:1})])),_:1}),u(g,{class:"publish-date"},{default:d((()=>[u(_,null,{default:d((()=>[r("发布于: ")])),_:1}),u(_,null,{default:d((()=>[r(p(t.publishDate),1)])),_:1})])),_:1})])),_:1})])),_:1}),u(g,{class:"comment-wraper"},{default:d((()=>[t.hobbyInfo.id?(c(),f(E,{hobbyInfo:t.hobbyInfo,key:t.hobbyInfo.id},null,8,["hobbyInfo"])):b("v-if",!0)])),_:1})])),_:1},8,["modelValue"]),u(g,{class:"submit-wraper"},{default:d((()=>[u(U,{onClick:t.submit,class:"submit"},{default:d((()=>[r("发 布")])),_:1},8,["onClick"])])),_:1})])}],["__scopeId","data-v-20538578"]]);export{A as default};
//# sourceMappingURL=pages-user-info-EditDetail.90b9afd0.js.map
