import{a8 as a,X as e,D as s,W as l,G as t,Y as o,ax as n,ay as u,K as r,o as d,c,w as f,e as m,M as i,N as _,O as p,T as v,ad as g,U as h,ae as b,af as j,aa as x}from"./vendor.8708ba27.js";import{_ as y,a as I}from"./uni-forms.036ab59f.js";import{r as M}from"./uni-app.es.01a3a053.js";import{h as V}from"./index.ceb77c50.js";import{_ as k}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.57b70d06.js";var w=k({setup(k){const w=a();let C=e((()=>w.state.user.userInfo)).value;const G=s(null);let U=s(!0),q=s("选择性别");s(null);let B=l({gender:null});const D={gender:{rules:[{required:!0,errorMessage:"请输入昵称"}]}};t((()=>{C.gender?U.value=!1:U.value=!0}));const K=a=>{const{detail:{value:e}}=a;G.value.setValue("gender",e)},N=()=>{G.value.validate().then((a=>{const e={gender:a.gender};V(e).then((a=>{console.log("data===",a),U.value=!1,w.dispatch("user/GetUserInfo")}))})).catch((a=>{console.log("表单错误信息：",a)}))};return(a,e)=>{const s=v,l=g,t=h,V=b,k=j,w=M(o("uni-forms-item"),y),C=M(o("uni-forms"),I),O=x;return n((d(),c(s,{class:"_showModal"},{default:f((()=>[m(s,{class:"_shade"}),m(s,{class:"_modalBox"},{default:f((()=>[m(s,{class:"_modal"},{default:f((()=>[i(' <slot name="title"> '),n(m(s,{class:"title"},{default:f((()=>[_(p(r(q)),1)])),_:1},512),[[u,r(q)]]),i(" </slot> "),m(s,{class:"content-hint"},{default:f((()=>[_("请按实际情况认真选择性别，确认后性别无法修改！")])),_:1}),m(C,{ref_key:"form",ref:G,modelValue:r(B),rules:D},{default:f((()=>[i(' <slot name="content"> '),m(w,{name:"gender"},{default:f((()=>[m(k,{name:"radio",onChange:K},{default:f((()=>[m(V,null,{default:f((()=>[m(l,{value:1}),m(t,null,{default:f((()=>[_("男")])),_:1})])),_:1}),m(V,null,{default:f((()=>[m(l,{value:2}),m(t,null,{default:f((()=>[_("女")])),_:1})])),_:1})])),_:1})])),_:1}),i(" </slot> ")])),_:1},8,["modelValue"]),i(' <slot name="btn"> '),m(s,{class:"btnbox"},{default:f((()=>[m(O,{type:"primary",onClick:N,class:"btn"},{default:f((()=>[_("确定")])),_:1})])),_:1}),i(" </slot> ")])),_:1})])),_:1})])),_:1},512)),[[u,r(U)]])}}},[["__scopeId","data-v-b08938e6"]]);export{w as default};
