import{a2 as o,T as a,S as e,z as s,A as t,Z as l,o as n,D as i,e as d,w as c,J as r,K as u,c as f,M as b,E as p,I as h,a0 as y,ap as m,P as _,O as I,Q as g,Y as v,N as k,n as x,l as w,aw as j,X as C}from"./vendor.34c9d7f1.js";import{b as D}from"./hobby.0b52dda4.js";import{d as E}from"./publish.03113725.js";import{C as P}from"./Comment.9cfa000e.js";import{V}from"./VideoPlayer.a3887504.js";import{f as L}from"./index.d686a517.js";import{_ as T}from"./plugin-vue_export-helper.21dcd24c.js";import"./communication.212f6add.js";var z=T({components:{Comment:P,VideoPlayer:V},onLoad:function(o){console.log("options===",o)},onReady:function(){},setup(l){console.log("props=",l);const n=o(),i=a((()=>n.state.user.userInfo)).value,d=e({poster:"",src:""});let c=s([{content:"https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif"}]);s(0),s("default");let r=s({});let u=s(null),f=s(["编辑","删除"]),b=s(0);return t((()=>{console.log("userInfo===",i),(o=>{const{id:a,hobby:e}=o;D({id:a,hobby:e}).then((o=>{console.log("data===",o),200===o.data.code&&(r.value=o.data.data,u.value=L(o.data.data.create_time),console.log("hobbyInfo.value===",r.value),console.log("data.data.data.url===",o.data.data.url),d.poster=o.data.data.url,d.src=o.data.data.video_url)}))})({id:l.id,hobby:l.hobby})})),{hobbyInfo:r,info:c,publishDate:u,options:d,goBack:()=>{y({url:"/pages/user/index"})},onEdit:o=>{m({itemList:f,success:function(o){var a;console.log("选中了第"+(o.tapIndex+1)+"个按钮"),b.value=o.tapIndex,1===b.value?(a=l,console.log("info==",a),x({title:"删除",content:"确定删除？",success:function(o){if(o.confirm){const o={hobby:l.hobby,id:l.id};E(o).then((o=>{200===o.data.code&&(w({title:"删除成功",duration:2e3}),y({url:"/pages/user/index",success(){let o=j().pop();console.log("page==============",o),o&&o.onLoad()}}))}))}else o.cancel}})):(o=>{console.log("info==",o),k({url:`/pages/user/info/EditDetail?id=${o.id}&hobby=${o.hobby}`})})(l)},fail:function(o){console.log(o.errMsg)}})},operations:f,activeOperationIndex:b}}},[["render",function(o,a,e,s,t,y){const m=_,k=I,x=g,w=C,j=v,D=l("VideoPlayer"),E=l("Comment");return n(),i("div",{class:"hobby-detail"},[d(m,{class:"author-wraper"},{default:c((()=>[d(m,{class:"author"},{default:c((()=>[d(m,{onClick:s.goBack},{default:c((()=>[r("返回")])),_:1},8,["onClick"]),d(m,{class:"author-info"},{default:c((()=>[d(k,{class:"avatar",mode:"aspectFit",src:s.hobbyInfo.avatar||""},null,8,["src"]),d(x,null,{default:c((()=>[r(u(s.hobbyInfo.username||""),1)])),_:1})])),_:1}),d(m,{onClick:s.onEdit},{default:c((()=>[d(x,null,{default:c((()=>[r("...")])),_:1})])),_:1},8,["onClick"])])),_:1})])),_:1}),0===s.hobbyInfo.fileType?(n(),f(m,{key:0,class:"swiper-box"},{default:c((()=>[d(j,{class:"swiper-box","indicator-dots":s.hobbyInfo.photos.length>1},{default:c((()=>[(n(!0),i(b,null,p(s.hobbyInfo.photos,((o,a)=>(n(),f(w,{key:a},{default:c((()=>[d(m,{class:"swiper-item"},{default:c((()=>[d(k,{src:o,class:"image",mode:"aspectFit"},null,8,["src"])])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["indicator-dots"])])),_:1})):h("v-if",!0),1===s.hobbyInfo.fileType?(n(),f(m,{key:1,class:"swiper-box"},{default:c((()=>[d(m,{class:"swiper-item"},{default:c((()=>[(n(),f(D,{options:{src:s.hobbyInfo.video_url,poster:s.hobbyInfo.url},key:s.hobbyInfo.id},null,8,["options"]))])),_:1})])),_:1})):h("v-if",!0),d(m,{class:"content-wraper"},{default:c((()=>[d(m,{class:"content"},{default:c((()=>[d(m,{class:"title"},{default:c((()=>[r(u(s.hobbyInfo.title),1)])),_:1}),d(m,{class:"main"},{default:c((()=>[r(u(s.hobbyInfo.content),1)])),_:1}),d(m,{class:"publish-date"},{default:c((()=>[d(x,null,{default:c((()=>[r("发布于: ")])),_:1}),d(x,null,{default:c((()=>[r(u(s.publishDate),1)])),_:1})])),_:1})])),_:1})])),_:1}),d(m,{class:"comment-wraper"},{default:c((()=>[s.hobbyInfo.id?(n(),f(E,{hobbyInfo:s.hobbyInfo,key:s.hobbyInfo.id},null,8,["hobbyInfo"])):h("v-if",!0)])),_:1})])}],["__scopeId","data-v-674604e3"]]);export{z as default};
//# sourceMappingURL=pages-user-info-PublicDetail.bcea2bb8.js.map
