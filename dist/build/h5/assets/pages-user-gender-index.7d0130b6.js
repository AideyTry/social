import{a0 as a,W as e,C as s,V as l,F as t,X as o,ax as n,ay as u,J as r,o as d,c as f,w as c,e as m,L as _,M as i,N as p,S as v,ai as g,T as h,aj as b,ae as j,ac as x}from"./vendor.9ff48645.js";import{_ as V,a as k}from"./uni-forms.51b5b5aa.js";import{r as C}from"./uni-app.es.2e6b1087.js";import{k as I}from"./index.e16b3d60.js";import{_ as M}from"./plugin-vue_export-helper.21dcd24c.js";var w=M({setup(M){const w=a();let y=e((()=>w.state.user.userInfo)).value;const q=s(null);let B=s(!0),F=s("选择性别");s(null);let G=l({gender:null});const J={gender:{rules:[{required:!0,errorMessage:"请输入昵称"}]}};t((()=>{y.gender?B.value=!1:B.value=!0}));const L=a=>{const{detail:{value:e}}=a;q.value.setValue("gender",e)},N=()=>{q.value.validate().then((a=>{const e={gender:a.gender};I(e).then((a=>{console.log("data===",a),B.value=!1,w.dispatch("user/GetUserInfo")}))})).catch((a=>{console.log("表单错误信息：",a)}))};return(a,e)=>{const s=v,l=g,t=h,I=b,M=j,w=C(o("uni-forms-item"),V),y=C(o("uni-forms"),k),S=x;return n((d(),f(s,{class:"_showModal"},{default:c((()=>[m(s,{class:"_shade"}),m(s,{class:"_modalBox"},{default:c((()=>[m(s,{class:"_modal"},{default:c((()=>[_(' <slot name="title"> '),n(m(s,{class:"title"},{default:c((()=>[i(p(r(F)),1)])),_:1},512),[[u,r(F)]]),_(" </slot> "),m(s,{class:"content-hint"},{default:c((()=>[i("确定性别后无法修改！")])),_:1}),m(y,{ref_key:"form",ref:q,modelValue:r(G),rules:J},{default:c((()=>[_(' <slot name="content"> '),m(w,{name:"gender"},{default:c((()=>[m(M,{name:"radio",onChange:L},{default:c((()=>[m(I,null,{default:c((()=>[m(l,{value:1}),m(t,null,{default:c((()=>[i("男")])),_:1})])),_:1}),m(I,null,{default:c((()=>[m(l,{value:2}),m(t,null,{default:c((()=>[i("女")])),_:1})])),_:1})])),_:1})])),_:1}),_(" </slot> ")])),_:1},8,["modelValue"]),_(' <slot name="btn"> '),m(s,{class:"btnbox"},{default:c((()=>[m(S,{onClick:N,class:"btn"},{default:c((()=>[i("确定")])),_:1})])),_:1}),_(" </slot> ")])),_:1})])),_:1})])),_:1},512)),[[u,r(B)]])}}},[["__scopeId","data-v-7c56425a"]]);export{w as default};
//# sourceMappingURL=pages-user-gender-index.7d0130b6.js.map
