import{y as a,r as e,x as s,w as l,ap as t,aq as n,u as o,b as u,c as r,d,g as c,h as f,i,t as _,H as m,ar as p,p as g,a0 as v,q as h,a1 as b,X as x,z as j,Y as q}from"./index.4f21874d.js";import{_ as I,a as V}from"./uni-forms.24d536c2.js";import{r as k}from"./uni-app.es.186d8cb4.js";import{_ as w}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.770916ad.js";var y=w({setup(w){const y=m();let C=a((()=>y.state.user.userInfo)).value;const M=e(null);let z=e(!0),B=e("选择性别");e(null);let G=s({gender:null});const H={gender:{rules:[{required:!0,errorMessage:"请输入昵称"}]}};l((()=>{C.gender?z.value=!1:z.value=!0}));const U=a=>{const{detail:{value:e}}=a;M.value.setValue("gender",e)},X=()=>{M.value.validate().then((a=>{const e={gender:a.gender};p(e).then((a=>{console.log("data===",a),z.value=!1,y.dispatch("user/GetUserInfo")}))})).catch((a=>{console.log("表单错误信息：",a)}))};return(a,e)=>{const s=g,l=v,m=h,p=b,w=x,y=k(j("uni-forms-item"),I),C=k(j("uni-forms"),V),Y=q;return t((u(),r(s,{class:"_showModal"},{default:d((()=>[c(s,{class:"_shade"}),c(s,{class:"_modalBox"},{default:d((()=>[c(s,{class:"_modal"},{default:d((()=>[f(' <slot name="title"> '),t(c(s,{class:"title"},{default:d((()=>[i(_(o(B)),1)])),_:1},512),[[n,o(B)]]),f(" </slot> "),c(s,{class:"content-hint"},{default:d((()=>[i("确定性别后无法修改！")])),_:1}),c(C,{ref_key:"form",ref:M,modelValue:o(G),rules:H},{default:d((()=>[f(' <slot name="content"> '),c(y,{name:"gender"},{default:d((()=>[c(w,{name:"radio",onChange:U},{default:d((()=>[c(p,null,{default:d((()=>[c(l,{value:1}),c(m,null,{default:d((()=>[i("男")])),_:1})])),_:1}),c(p,null,{default:d((()=>[c(l,{value:2}),c(m,null,{default:d((()=>[i("女")])),_:1})])),_:1})])),_:1})])),_:1}),f(" </slot> ")])),_:1},8,["modelValue"]),f(' <slot name="btn"> '),c(s,{class:"btnbox"},{default:d((()=>[c(Y,{onClick:X,class:"btn"},{default:d((()=>[i("确定")])),_:1})])),_:1}),f(" </slot> ")])),_:1})])),_:1})])),_:1},512)),[[n,o(z)]])}}},[["__scopeId","data-v-7c56425a"]]);export{y as default};
//# sourceMappingURL=pages-user-gender-index.b071ac71.js.map