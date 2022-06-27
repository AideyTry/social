"use strict";var e=require("../../../common/vendor.js"),o=require("../../../api/user.js");if(require("../../../utils/request.js"),require("../../../utils/auth.js"),!Array){(e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+n+(()=>"../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const n=()=>"../../components/PickerRegion.js",t={setup(n){const t=e.useStore();let r=e.computed$1((()=>t.state.user.userInfo)).value,a=e.reactive({avatar:r.avatar,username:r.username,gender:r.gender,birthday:e.hooks(r.birthday).format("YYYY-MM-DD"),location:{provinceCode:r.location&&r.location.provinceCode,cityCode:r.location&&r.location.cityCode},hometown:{provinceCode:r.hometown&&r.hometown.provinceCode,cityCode:r.hometown&&r.hometown.cityCode},schoolName:r.schoolName,job:r.job,motto:r.motto,photos:r.photos}),s={username:{rules:[{required:!0,errorMessage:"请输入昵称"}]}};e.index.$on("schoolUpdate",(function(e){a.schoolName=e.schoolName}));const l=e.ref(null),i=n=>{console.log("form=e==",n),l.value.validate().then((n=>{console.log("表单数据信息：",n);const r={form:{...n,photos:u}};o.editUserInfo(r).then((o=>{console.log("data======",o),t.dispatch("user/GetUserInfo").then((()=>{e.index.navigateTo({url:"/pages/user/info/index"})}))}))})).catch((e=>{console.log("表单错误信息：",e)}))},c="/static/images/default_avatar.png";let u=e.reactive(r.photos);e.watch(u,((e,o)=>{console.log("images",e),a.photos=e}));console.log("images===",u);const m=e.ref(r.avatar);e.watch(m,((e,o)=>{a.avatar=e}));const d=o=>{e.index.chooseImage({success:n=>{console.log("chooseImageRes===",n);const{tempFilePaths:t,tempFiles:r}=n;console.log("tempFilePaths[0]===",t[0]),((o,n)=>{e.index.uploadFile({url:"https://mancao.social/prod/users/uploadFile",filePath:n,name:"file",formData:{user:"test"},success:e=>{console.log("uploadFileRes===",e);const{data:n}=e,t=JSON.parse(n);console.log("imgData=",t),u[o]=t.url,console.log("index===",o),0===o&&(m.value=t.url)}})})(o,t[0])}})},f=e=>{const o=new Date;let n=o.getFullYear(),t=o.getMonth()+1,r=o.getDate();return"start"===e?n-=60:"end"===e&&(n+=2),t=t>9?t:"0"+t,r=r>9?r:"0"+r,`${n}-${t}-${r}`},p=f({format:!0});console.log("currentDate===",p);let h=f("start"),g=f("end");const v=e=>{a.birthday=e.detail.value},C=()=>{e.index.showActionSheet({itemList:["男","女"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮")},fail:function(e){console.log(e.errMsg)}})},b=e=>{console.log("obj=====",e);const{provinceCode:o,cityCode:n}=e;a.location.provinceCode=o,a.location.cityCode=n},y=e=>{console.log("obj.home=====",e);const{provinceCode:o,cityCode:n}=e;a.hometown.provinceCode=o,a.hometown.cityCode=n},x=()=>{e.index.navigateTo({url:"/pages/userInfo/School/School"})};let w=e.ref(["IT/互联网/通信","金融","工业制造业","教育/科研","公共事业单位","医药/健康","媒体/公关","影视/娱乐","零售","餐饮/酒店","其他"]),j=e.ref(0);const $=e=>{const{detail:{value:o}}=e;j.value=o,a.job=w.value[o]};return(o,n)=>{return{a:m.value?m.value:c,b:e.p({name:"avatar"}),c:e.t((t=e.unref(u),t.filter((e=>e)).length)),d:e.t(e.unref(u).length),e:e.f(e.unref(u),((o,n,t)=>e.e({a:o||c,b:!o&&e.unref(u)[n-1]||0===n&&!e.unref(u)[0]},(!o&&e.unref(u)[n-1]||0===n&&e.unref(u)[0],{}),{c:e.o$1((t=>((o,n)=>{if(console.log("item, index===",o,n),o){let t=["编辑"];return n>0&&(t=["设为头像","编辑","删除"]),void e.index.showActionSheet({itemList:t,success:function(e){if(console.log("选中了第"+(e.tapIndex+1)+"个按钮"),0===e.tapIndex)return u[n]=u[0],u[0]=o,void(m.value=o);1!==e.tapIndex?2===e.tapIndex&&u.splice(n,1):d(n)},fail:function(e){console.log(e.errMsg)}})}d(n)})(o,n))),d:n}))),f:e.unref(a).motto,g:e.o$1((o=>e.unref(a).motto=o.detail.value)),h:e.p({name:"motto"}),i:e.unref(a).username,j:e.o$1((o=>e.unref(a).username=o.detail.value)),k:e.p({label:"昵称",name:"username"}),l:e.t(o.$filters.filterGender(e.unref(r).gender)),m:e.o$1(C),n:e.p({label:"性别",name:"gender"}),o:e.t(e.unref(a).birthday),p:e.unref(a).birthday,q:e.unref(h),r:e.unref(g),s:e.o$1(v),t:e.p({label:"出生日期",name:"birthday"}),v:e.o$1(b),w:e.p({propsProvinceCode:e.unref(a).location.provinceCode,propsCityCode:e.unref(a).location.cityCode}),x:e.p({label:"所在地",name:"location"}),y:e.o$1(y),z:e.p({propsProvinceCode:e.unref(a).hometown.provinceCode,propsCityCode:e.unref(a).hometown.cityCode}),A:e.p({label:"家乡",name:"hometown"}),B:e.t(e.unref(a).schoolName?e.unref(a).schoolName:"请选择学校"),C:e.o$1(x),D:e.p({label:"学校",name:"schoolName"}),E:e.t(e.unref(a).job?e.unref(a).job:"请选择职业"),F:e.unref(w),G:e.unref(j),H:e.o$1($),I:e.p({label:"职业",name:"job"}),J:e.sr(l,"6fc97ef7-0",{k:"form"}),K:e.p({modelValue:e.unref(a),rules:e.unref(s)}),L:e.o$1(i)};var t}}};var r=e._export_sfc(t,[["__scopeId","data-v-6fc97ef7"]]);wx.createPage(r);
//# sourceMappingURL=Editor.js.map
