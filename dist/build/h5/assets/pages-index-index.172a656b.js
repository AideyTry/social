import{z as t,A as e,B as l,C as a,D as s,E as i,F as o,o as n,c,w as d,e as u,G as r,H as f,I as m,J as v,K as p,L as _,M as h,N as y,O as g,P as b,Q as k,S as w,R as x,T as C,U as j,V as T}from"./vendor.c1ce6cb1.js";import{_ as I}from"./uni-icons.dba136d1.js";import{r as S}from"./uni-app.es.efb1dce7.js";import{_ as W,a as D}from"./uni-list.5686abca.js";import{g as E}from"./hobby.5cd5432a.js";import{_ as M}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.f78fe6a4.js";var V=M({components:{McTabs:M({setup(T){t((t=>({"5335898d":e(F)})));const M=l([{title:"英语",content:[]},{title:"狼人杀",content:[]},{title:"剧本杀",content:[]},{title:"登山",content:[]},{title:"旅游",content:[]}]);let V=l(0),$=l(0);const z=a([]),A=t=>{console.log("e=",t)},B=t=>{const{detail:{current:e}}=t;V.value=e,$.value=z[V.value].width,console.log("e=",t),console.log("navItemWidth.value=====",$.value)};s((()=>{const t=document.querySelectorAll(".nav-item");t.length>0&&(t.forEach((t=>{console.log("width=",t.offsetWidth),z.push({width:t.offsetWidth})})),$.value=z[V.value].width,console.log("items===",t),console.log("navItemWidth===",$.value),O())}));const F=i((()=>`${$.value}rpx`));let L=l([]);var O=()=>{E().then((t=>{console.log("data===",t),200===t.data.code&&(L.value=t.data.data)}))};const q=t=>{console.log("item===",t),g({url:`/pages/index/VideoDetail?id=${t.id}`})};return(t,l)=>{const a=b,s=k,i=w,g=x,T=S(o("uni-icons"),I),E=S(o("uni-list-item"),W),z=S(o("uni-list"),D),F=C,O=j;return n(),c(s,{class:"tabs"},{default:d((()=>[u(i,{"scroll-x":"","scroll-with-animaiton":"","enable-flex":!0,onScroll:A},{default:d((()=>[u(s,{class:"nav"},{default:d((()=>[(n(!0),r(y,null,f(M.value,((t,l)=>(n(),c(s,{class:m(["nav-item",e(V)==l?"nav-item-act":""]),key:l,onClick:t=>(t=>{V.value=t})(l)},{default:d((()=>[u(a,null,{default:d((()=>[v(p(t.title),1)])),_:2},1024),e(V)==l?(n(),c(s,{key:0,class:"nav-line",style:_(`{width: ${e($)}rpx}`)},null,8,["style"])):h("v-if",!0)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1}),u(O,{current:e(V),duration:300,class:"swiper",onChange:B},{default:d((()=>[(n(!0),r(y,null,f(M.value,((t,l)=>(n(),c(F,{key:l},{default:d((()=>[u(i,{"scroll-y":"true",class:"swiper-scroll"},{default:d((()=>[0===l?(n(),c(z,{key:0},{default:d((()=>[(n(!0),r(y,null,f(e(L),(t=>(n(),c(E,{title:t.title,ellipsis:t.title,note:t.description,key:t.id,direction:"column",class:"content-item"},{header:d((()=>[u(s,{class:"uni-thumb uni-content list-picture"},{default:d((()=>[t.img?(n(),c(g,{key:0,class:"slot-image",src:t.img,mode:"widthFix",onClick:e=>q(t)},null,8,["src","onClick"])):h("v-if",!0),t.hintTitle||t.dateSrc?(n(),c(s,{key:1,class:"hint"},{default:d((()=>[h(' <text v-if="item.hintTitle">By</text> '),t.hintTitle?(n(),c(a,{key:0,class:"hint-title"},{default:d((()=>[v(p(t.hintTitle),1)])),_:2},1024)):h("v-if",!0),u(a,{class:"hint-date"},{default:d((()=>[v(p(t.dateSrc),1)])),_:2},1024)])),_:2},1024)):h("v-if",!0)])),_:2},1024)])),body:d((()=>[u(s,{class:"content-body"},{default:d((()=>[u(s,{class:"title-wraper",onClick:e=>q(t)},{default:d((()=>[u(a,{class:"title"},{default:d((()=>[v(p(t.title),1)])),_:2},1024),u(s,{class:"video"},{default:d((()=>[u(T,{style:{"vertical-align":"middle"},type:"videocam",size:"20",color:"#999"}),u(a,null,{default:d((()=>[v("VIDEO")])),_:1})])),_:1})])),_:2},1032,["onClick"]),u(s,{class:"description"},{default:d((()=>[v(p(t.description),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["title","ellipsis","note"])))),128))])),_:2},1024)):(n(),c(s,{key:1},{default:d((()=>[v("待上线")])),_:1}))])),_:2},1024),h(" <slot></slot> ")])),_:2},1024)))),128))])),_:1},8,["current"])])),_:1})}}},[["__scopeId","data-v-d6b525f8"]])},data:()=>({title:"蔓草"}),onLoad(){}},[["render",function(t,e,l,a,s,i){const o=T("McTabs"),r=k;return n(),c(r,{class:"content"},{default:d((()=>[u(o),h(' <button @click="open">打开弹窗</button> ')])),_:1})}],["__scopeId","data-v-77f178a5"]]);export{V as default};
