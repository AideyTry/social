import{C as a,V as o,D as s,a1 as e,X as t,o as i,G as n,e as d,w as c,M as l,N as r,P as p,H as f,S as u,T as m,c as b}from"./vendor.9ff48645.js";import{a as v,_}from"./uni-list.2b59ecfb.js";import{r as g}from"./uni-app.es.2e6b1087.js";import{v as j}from"./hobby.f03e1bd4.js";import{V as y}from"./VideoPlayer.86f23a77.js";import{_ as h}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.50eaf64b.js";var I=h({components:{VideoPlayer:y},onLoad:function(a){console.log("options===",a)},setup(e,t){let i=a({});const n=o({poster:"//img2.chinadaily.com.cn/images/202201/13/61e00901a310cdd3d826b064.jpeg",src:"https://social-1308251497.cos.ap-guangzhou.myqcloud.com/video/695c8c8a78f7e9a184a17db72e734a63/695c8c8a78f7e9a184a17db72e734a63.m3u8"});return s((()=>{var a;a=e.id,j({id:a}).then((a=>{console.log("data===",a),200===a.data.code&&(i.value=a.data.data)}))})),{videInfo:i,options:n}}},[["render",function(a,o,s,j,y,h){const I=u,V=m,P=e("VideoPlayer"),x=g(t("uni-list-item"),_),k=g(t("uni-list"),v);return i(),n("div",{class:"video-detail"},[d(I,{class:"title"},{default:c((()=>[l(r(j.videInfo.title),1)])),_:1}),d(V,{class:"abstract"},{default:c((()=>[l(r(j.videInfo.abstract),1)])),_:1}),d(P,{options:j.options},null,8,["options"]),d(k,null,{default:c((()=>[(i(!0),n(p,null,f(j.videInfo.sections,(a=>(i(),b(x,{note:a.section,key:a.id},{body:c((()=>[d(I,{class:"description"},{default:c((()=>[l(r(a.section),1)])),_:2},1024)])),_:2},1032,["note"])))),128))])),_:1})])}],["__scopeId","data-v-15e8b752"]]);export{I as default};
//# sourceMappingURL=pages-index-VideoDetail.02baa152.js.map