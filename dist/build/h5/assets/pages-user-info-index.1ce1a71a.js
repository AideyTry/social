import{y as e,x as s,r as a,as as o,b as t,c as l,d as r,g as i,u as n,i as u,t as d,h as c,e as f,f as p,F as m,L as v,H as g,k as _,m as C,q as h,p as y,z as b,Y as k,at as x}from"./index.369cd46f.js";import{_ as j,a as w}from"./uni-forms.d9664355.js";import{r as P}from"./uni-app.es.f32ed5fc.js";import{_ as D}from"./PickerRegion.414ba885.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";import"./uni-icons.5e3493f9.js";const I={onBackPress:e=>"navigateBack"!==e.from&&(v({url:"/pages/user/index"}),!0)};var B=F(Object.assign(I,{setup(v){const F="/static/images/default_avatar.png",I=g();let B=e((()=>I.state.user.userInfo)).value,E=s(B.photos);console.log("images===",E);const L=a(B.avatar),M=a(o().diff(B.birthday,"years")),Y=()=>{console.log("why"),_({url:"/pages/user/info/Editor"})};return(e,s)=>{const a=C,o=h,v=y,g=P(b("uni-forms-item"),j),I=P(b("uni-forms"),w),q=k;return t(),l(v,{class:"userinfo-wraper"},{default:r((()=>[i(v,{class:"userinfo"},{default:r((()=>[i(a,{mode:"aspectFill",src:L.value?L.value:F,class:"avatar"},null,8,["src"]),i(v,{class:"basic-info"},{default:r((()=>[i(D,{isDisabled:"",propsProvinceCode:n(B).location&&n(B).location.provinceCode,propsCityCode:n(B).location&&n(B).location.cityCode},null,8,["propsProvinceCode","propsCityCode"]),u("/"+d(e.$filters.filterGender(n(B).gender)||"暂无")+"/",1),M.value||0===M.value?(t(),l(o,{key:0},{default:r((()=>[u(d(M.value)+"岁",1)])),_:1})):c("v-if",!0),M.value||0===M.value?c("v-if",!0):(t(),l(o,{key:1},{default:r((()=>[u("暂无")])),_:1})),c(' <uni-tag\r\n          v-if="!age && age !== 0"\r\n          disabled\r\n          inverted\r\n          text="暂无"\r\n        ></uni-tag> ')])),_:1})])),_:1}),i(v,{class:"photos"},{default:r((()=>[(t(!0),f(m,null,p(n(E),((e,s)=>(t(),l(v,{class:"photo-wraper",onClick:a=>((e,s)=>{if(console.log("item, index===",e,s),e)return void x({urls:E,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}});_({url:"/pages/user/info/Editor"}),(e=>{const s=new Date;let a=s.getFullYear(),o=s.getMonth()+1,t=s.getDate();"start"===e?a-=60:"end"===e&&(a+=2),o=o>9?o:"0"+o,t=t>9?t:"0"+t})({format:!0})})(e,s),key:s},{default:r((()=>[i(a,{mode:"aspectFill",src:e||F,class:"photo"},null,8,["src"]),!e&&n(E)[s-1]||0===s&&!n(E)[0]?(t(),l(o,{key:0,class:"photo-add"},{default:r((()=>[u("+")])),_:1})):c("v-if",!0)])),_:2},1032,["onClick"])))),128))])),_:1}),i(I,null,{default:r((()=>[i(g,{label:"家乡"},{default:r((()=>[i(D,{isDisabled:"",propsProvinceCode:n(B).hometown&&n(B).hometown.provinceCode,propsCityCode:n(B).hometown&&n(B).hometown.cityCode},null,8,["propsProvinceCode","propsCityCode"])])),_:1}),i(g,{label:"学校"},{default:r((()=>[i(v,null,{default:r((()=>[u(d(n(B).schoolName||"暂未填写"),1)])),_:1})])),_:1}),i(g,{label:"职业"},{default:r((()=>[i(v,null,{default:r((()=>[u(d(n(B).job||"暂未填写"),1)])),_:1})])),_:1})])),_:1}),i(q,{onClick:Y},{default:r((()=>[u("编辑资料")])),_:1})])),_:1})}}}),[["__scopeId","data-v-6edd5b40"]]);export{B as default};
//# sourceMappingURL=pages-user-info-index.1ce1a71a.js.map