"use strict";var e=require("../../../common/vendor.js");if(!Array){(e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-forms"))()}Math||(o+(()=>"../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const o=()=>"./PickerRegion.js",n={onBackPress:o=>"navigateBack"!==o.from&&(e.index.switchTab({url:"/pages/user/index"}),!0)},r=Object.assign(n,{setup(o){const n="/static/images/default_avatar.png",r=e.useStore();let t=e.computed$1((()=>r.state.user.userInfo)).value,s=e.reactive(t.photos);console.log("images===",s);const i=e.ref(t.avatar),a=e.ref(e.hooks().diff(t.birthday,"years")),u=()=>{console.log("why"),e.index.navigateTo({url:"/pages/user/info/Editor"})};return(o,r)=>e.e({a:i.value?i.value:n,b:e.p({isDisabled:!0,propsProvinceCode:e.unref(t).location&&e.unref(t).location.provinceCode,propsCityCode:e.unref(t).location&&e.unref(t).location.cityCode}),c:e.t(o.$filters.filterGender(e.unref(t).gender)||"暂无"),d:a.value||0===a.value},a.value||0===a.value?{e:e.t(a.value)}:{},{f:!a.value&&0!==a.value},(a.value||a.value,{}),{g:e.f(e.unref(s),((o,r,t)=>e.e({a:o||n,b:!o&&e.unref(s)[r-1]||0===r&&!e.unref(s)[0]},(!o&&e.unref(s)[r-1]||0===r&&e.unref(s)[0],{}),{c:e.o$1((n=>((o,n)=>{if(console.log("item, index===",o,n),o)return void e.index.previewImage({urls:s,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}});e.index.navigateTo({url:"/pages/user/info/Editor"}),(e=>{const o=new Date;let n=o.getFullYear(),r=o.getMonth()+1,t=o.getDate();"start"===e?n-=60:"end"===e&&(n+=2),r=r>9?r:"0"+r,t=t>9?t:"0"+t})({format:!0})})(o,r))),d:r}))),h:e.p({isDisabled:!0,propsProvinceCode:e.unref(t).hometown&&e.unref(t).hometown.provinceCode,propsCityCode:e.unref(t).hometown&&e.unref(t).hometown.cityCode}),i:e.p({label:"家乡"}),j:e.t(e.unref(t).schoolName||"暂未填写"),k:e.p({label:"学校"}),l:e.t(e.unref(t).job||"暂未填写"),m:e.p({label:"职业"}),n:e.o$1(u)})}});var t=e._export_sfc(r,[["__scopeId","data-v-8a023c04"]]);wx.createPage(t);
//# sourceMappingURL=index.js.map