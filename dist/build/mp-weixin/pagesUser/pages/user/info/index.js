"use strict";var e=require("../../../../common/vendor.js");const t={setup(t){const o="/static/images/default_avatar.png",r=e.useStore();let n=e.computed$1((()=>r.state.user.userInfo)).value,a=e.reactive(n.photos);console.log("images===",a);const s=e.ref(n.avatar);return(t,r)=>({a:s.value?s.value:o,b:e.t(e.unref(n).location),c:e.t(e.unref(n).gender),d:e.t(t.age),e:e.f(e.unref(a),((t,r,n)=>e.e({a:t||o,b:!t&&e.unref(a)[r-1]||0===r&&!e.unref(a)[0]},(!t&&e.unref(a)[r-1]||0===r&&e.unref(a)[0],{}),{c:e.o$1((o=>((t,o)=>{if(console.log("item, index===",t,o),t)return void e.index.previewImage({urls:a,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}});e.index.navigateTo({url:"/pages/user/info/Editor"}),e.ref(""),(e=>{const t=new Date;let o=t.getFullYear(),r=t.getMonth()+1,n=t.getDate();"start"===e?o-=60:"end"===e&&(o+=2),r=r>9?r:"0"+r,n=n>9?n:"0"+n})({format:!0})})(t,r))),d:r}))),f:e.o$1(((...e)=>t.editor&&t.editor(...e)))})}};var o=e._export_sfc(t,[["__scopeId","data-v-3fbb8a46"]]);wx.createPage(o);
//# sourceMappingURL=index.js.map