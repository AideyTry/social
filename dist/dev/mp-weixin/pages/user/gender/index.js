"use strict";var e=require("../../../common/vendor.js"),d=require("../../../api/user.js");require("../../../utils/request.js");require("../../../utils/auth.js");if(!Array){const u=e.resolveComponent("uni-forms-item"),s=e.resolveComponent("uni-forms");(u+s)()}const v=()=>"../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js",g=()=>"../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";Math||(v+g)();const p={setup(u){const s=e.useStore();let i=e.computed$1(()=>s.state.user.userInfo).value;const t=e.ref(null);let o=e.ref(!0),a=e.ref("\u9009\u62E9\u6027\u522B");e.ref(null);let l=e.reactive({gender:null});const m={gender:{rules:[{required:!0,errorMessage:"\u8BF7\u8F93\u5165\u6635\u79F0"}]}};e.watchEffect(()=>{i.gender?o.value=!1:o.value=!0});const c=r=>{const{detail:{value:n}}=r;t.value.setValue("gender",n)},f=()=>{t.value.validate().then(r=>{const n={gender:r.gender};d.setGender(n).then(_=>{console.log("data===",_),o.value=!1,s.dispatch("user/GetUserInfo")})}).catch(r=>{console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A",r)})};return(r,n)=>({a:e.t(e.unref(a)),b:e.unref(a),c:e.o$1(c),d:e.p({name:"gender"}),e:e.sr(t,"660079f4-0",{k:"form"}),f:e.p({modelValue:e.unref(l),rules:m}),g:e.o$1(f),h:e.unref(o)})}};var h=e._export_sfc(p,[["__scopeId","data-v-660079f4"],["__file","C:/myself/social/social/src/pages/user/gender/index.vue"]]);wx.createPage(h);
//# sourceMappingURL=index.js.map
