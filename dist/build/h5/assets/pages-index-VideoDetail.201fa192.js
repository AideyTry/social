import{z as a,S as o,A as s,_ as e,U as t,o as i,D as d,e as n,w as c,J as l,K as r,M as p,E as u,P as m,Q as f,c as v}from"./vendor.99a7c6c2.js";import{a as b,_}from"./uni-list.66e090c7.js";import{r as j}from"./uni-app.es.4451f765.js";import{v as g}from"./hobby.8e14db1d.js";import{V as y}from"./VideoPlayer.d5324a0e.js";import{_ as h}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.e12d4142.js";import"./index.0625ccb3.js";var I=h({components:{VideoPlayer:y},onLoad:function(a){console.log("options===",a)},setup(e,t){let i=a({});const d=o({poster:"//img2.chinadaily.com.cn/images/202201/13/61e00901a310cdd3d826b064.jpeg",src:"https://social-1308251497.cos.ap-guangzhou.myqcloud.com/video/695c8c8a78f7e9a184a17db72e734a63/695c8c8a78f7e9a184a17db72e734a63.m3u8"});return s((()=>{var a;a=e.id,g({id:a}).then((a=>{console.log("data===",a),200===a.data.code&&(i.value=a.data.data)}))})),{videInfo:i,options:d}}},[["render",function(a,o,s,g,y,h){const I=m,P=f,V=e("VideoPlayer"),x=j(t("uni-list-item"),_),z=j(t("uni-list"),b);return i(),d("div",{class:"video-detail"},[n(I,{class:"title"},{default:c((()=>[l(r(g.videInfo.title),1)])),_:1}),n(P,{class:"abstract"},{default:c((()=>[l(r(g.videInfo.abstract),1)])),_:1}),n(V,{options:g.options},null,8,["options"]),n(z,null,{default:c((()=>[(i(!0),d(p,null,u(g.videInfo.sections,(a=>(i(),v(x,{note:a.section,key:a.id},{body:c((()=>[n(I,{class:"description"},{default:c((()=>[l(r(a.section),1)])),_:2},1024)])),_:2},1032,["note"])))),128))])),_:1})])}],["__scopeId","data-v-15e8b752"]]);export{I as default};
//# sourceMappingURL=pages-index-VideoDetail.201fa192.js.map
