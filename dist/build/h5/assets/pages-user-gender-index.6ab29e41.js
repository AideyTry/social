import{_ as e,E as a,B as s,C as l,ap as t,F as o,aq as n,ar as u,A as r,o as d,c,w as f,e as m,M as i,J as _,K as p,Q as v,as as g,P as b,at as h,au as j,$ as x}from"./vendor.c1ce6cb1.js";import{_ as y,a as C}from"./uni-forms.c3e75b44.js";import{r as I}from"./uni-app.es.efb1dce7.js";import{d as M}from"./index.e582ec7f.js";import{_ as V}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.dba136d1.js";var k=V({setup(V){const k=e();let q=a((()=>k.state.user.userInfo)).value;const w=s(null);let B=s(!0),A=s("选择性别");s(null);let E=l({gender:null});const F={gender:{rules:[{required:!0,errorMessage:"请输入昵称"}]}};t((()=>{q.gender?B.value=!1:B.value=!0}));const G=e=>{const{detail:{value:a}}=e;w.value.setValue("gender",a)},J=()=>{w.value.validate().then((e=>{const a={gender:e.gender};M(a).then((e=>{console.log("data===",e),B.value=!1,k.dispatch("user/GetUserInfo")}))})).catch((e=>{console.log("表单错误信息：",e)}))};return(e,a)=>{const s=v,l=g,t=b,M=h,V=j,k=I(o("uni-forms-item"),y),q=I(o("uni-forms"),C),K=x;return n((d(),c(s,{class:"_showModal"},{default:f((()=>[m(s,{class:"_shade"}),m(s,{class:"_modalBox"},{default:f((()=>[m(s,{class:"_modal"},{default:f((()=>[i(' <slot name="title"> '),n(m(s,{class:"title"},{default:f((()=>[_(p(r(A)),1)])),_:1},512),[[u,r(A)]]),i(" </slot> "),m(s,{class:"content-hint"},{default:f((()=>[_("请按实际情况认真选择性别，确认后性别无法修改！")])),_:1}),m(q,{ref_key:"form",ref:w,modelValue:r(E),rules:F},{default:f((()=>[i(' <slot name="content"> '),m(k,{name:"gender"},{default:f((()=>[m(V,{name:"radio",onChange:G},{default:f((()=>[m(M,null,{default:f((()=>[m(l,{value:1}),m(t,null,{default:f((()=>[_("男")])),_:1})])),_:1}),m(M,null,{default:f((()=>[m(l,{value:2}),m(t,null,{default:f((()=>[_("女")])),_:1})])),_:1})])),_:1})])),_:1}),i(" </slot> ")])),_:1},8,["modelValue"]),i(' <slot name="btn"> '),m(s,{class:"btnbox"},{default:f((()=>[m(K,{type:"primary",onClick:J,class:"btn"},{default:f((()=>[_("确定")])),_:1})])),_:1}),i(" </slot> ")])),_:1})])),_:1})])),_:1},512)),[[u,r(B)]])}}},[["__scopeId","data-v-b08938e6"]]);export{k as default};