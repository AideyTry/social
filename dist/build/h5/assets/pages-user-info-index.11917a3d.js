import{a0 as e,W as a,V as s,C as o,z as l,X as t,o as r,c as n,w as i,e as u,J as c,M as d,N as f,L as p,G as v,H as m,P as g,a4 as _,Q as C,R as b,T as h,S as y,ac as k,ap as w}from"./vendor.9ff48645.js";import{_ as P,a as j}from"./uni-forms.51b5b5aa.js";import{r as x}from"./uni-app.es.2e6b1087.js";import{_ as D}from"./PickerRegion.24a3759b.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";const I={onBackPress:e=>"navigateBack"!==e.from&&(_({url:"/pages/user/index"}),!0)};var M=F(Object.assign(I,{setup(_){const F="/static/images/default_avatar.png",I=e();let M=a((()=>I.state.user.userInfo)).value,B=s(M.photos);console.log("images===",B);const E=o(M.avatar),G=o(l().diff(M.birthday,"years")),L=()=>{console.log("why"),C({url:"/pages/user/info/Editor"})};return(e,a)=>{const s=b,o=h,l=y,_=x(t("uni-forms-item"),P),I=x(t("uni-forms"),j),N=k;return r(),n(l,{class:"userinfo-wraper"},{default:i((()=>[u(l,{class:"userinfo"},{default:i((()=>[u(s,{mode:"aspectFill",src:E.value?E.value:F,class:"avatar"},null,8,["src"]),u(l,{class:"basic-info"},{default:i((()=>[u(D,{isDisabled:"",propsProvinceCode:c(M).location&&c(M).location.provinceCode,propsCityCode:c(M).location&&c(M).location.cityCode},null,8,["propsProvinceCode","propsCityCode"]),d("/"+f(e.$filters.filterGender(c(M).gender)||"暂无")+"/",1),G.value||0===G.value?(r(),n(o,{key:0},{default:i((()=>[d(f(G.value)+"岁",1)])),_:1})):p("v-if",!0),G.value||0===G.value?p("v-if",!0):(r(),n(o,{key:1},{default:i((()=>[d("暂无")])),_:1})),p(' <uni-tag\r\n          v-if="!age && age !== 0"\r\n          disabled\r\n          inverted\r\n          text="暂无"\r\n        ></uni-tag> ')])),_:1})])),_:1}),u(l,{class:"photos"},{default:i((()=>[(r(!0),v(g,null,m(c(B),((e,a)=>(r(),n(l,{class:"photo-wraper",onClick:s=>((e,a)=>{if(console.log("item, index===",e,a),e)return void w({urls:B,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}});C({url:"/pages/user/info/Editor"}),(e=>{const a=new Date;let s=a.getFullYear(),o=a.getMonth()+1,l=a.getDate();"start"===e?s-=60:"end"===e&&(s+=2),o=o>9?o:"0"+o,l=l>9?l:"0"+l})({format:!0})})(e,a),key:a},{default:i((()=>[u(s,{mode:"aspectFill",src:e||F,class:"photo"},null,8,["src"]),!e&&c(B)[a-1]||0===a&&!c(B)[0]?(r(),n(o,{key:0,class:"photo-add"},{default:i((()=>[d("+")])),_:1})):p("v-if",!0)])),_:2},1032,["onClick"])))),128))])),_:1}),u(I,null,{default:i((()=>[u(_,{label:"家乡"},{default:i((()=>[u(D,{isDisabled:"",propsProvinceCode:c(M).hometown&&c(M).hometown.provinceCode,propsCityCode:c(M).hometown&&c(M).hometown.cityCode},null,8,["propsProvinceCode","propsCityCode"])])),_:1}),u(_,{label:"学校"},{default:i((()=>[u(l,null,{default:i((()=>[d(f(c(M).schoolName||"暂未填写"),1)])),_:1})])),_:1}),u(_,{label:"职业"},{default:i((()=>[u(l,null,{default:i((()=>[d(f(c(M).job||"暂未填写"),1)])),_:1})])),_:1})])),_:1}),u(N,{onClick:L},{default:i((()=>[d("编辑资料")])),_:1})])),_:1})}}}),[["__scopeId","data-v-8a023c04"]]);export{M as default};
//# sourceMappingURL=pages-user-info-index.11917a3d.js.map
