"use strict";var o=require("../../../common/vendor.js"),f=require("../../../api/communication.js");require("../../../utils/request.js");require("../../../utils/auth.js");const w={name:"follow",onLoad:function(u){console.log("options===",u),this.propsOptions=u},setup(u){let a=o.ref([]),i=o.ref(null),l=o.ref(!1),c=o.ref("\u5173\u6CE8");const v=s=>{if(l.value){o.index.showModal({content:"\u786E\u8BA4\u4E0D\u518D\u5173\u6CE8\uFF1F",success:function(e){if(e.confirm){let t={followId:s.user_id};f.deleteFollow(t).then(p=>{p.data.code===200&&(c.value="\u5173\u6CE8",l.value=!1,d(JSON.parse(decodeURIComponent(i.value.userids))))})}else e.cancel&&console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88")}});return}let r={followId:s.user_id};f.setFollow(r).then(e=>{console.log("data===",e),e.data.code===200?(c.value="\u5DF2\u5173\u6CE8",l.value=!0):e.data.code===400&&o.index.showToast({title:e.data.msg,icon:"none",duration:2e3})})},n=s=>{let r={followId:s.user_id};console.log("params===",r),f.getFollow(r).then(e=>{console.log("data1===",e),e.data.code===200&&(l.value=e.data.isFollow,e.data.isFollow?c.value="\u5DF2\u5173\u6CE8":c.value="\u5173\u6CE8")})},d=s=>{const r={userids:s};parseInt(i.value.type)===0?(o.index.setNavigationBarTitle({title:"\u5173\u6CE8"}),f.getFollowsInfo(r).then(e=>{e.data.code===200&&(a.value=e.data.followsInfo,a.value=a.value.filter(t=>t),console.log("infoList.value====",a.value),a.value.forEach(t=>{n(t)}))})):parseInt(i.value.type)===1&&(o.index.setNavigationBarTitle({title:"\u7C89\u4E1D"}),f.getFansInfo(r).then(e=>{console.log("getFansInfo===",e),e.data.code===200&&(a.value=e.data.fansInfo,a.value=a.value.filter(t=>t),a.value.forEach(t=>{n(t)}))}))},g=s=>{console.log("info======",s),o.index.navigateTo({url:`/pages/userInfo/User/User?id=${s.user_id}`})};return o.onMounted(()=>{console.log("follow props=====================================================",i),d(JSON.parse(decodeURIComponent(i.value.userids)))}),{propsOptions:i,infoList:a,followText:c,isFlollow:l,following:v,goUserDetail:g}}};function _(u,a,i,l,c,v){return{a:o.f(l.infoList,(n,d,g)=>({a:n.avatar||"",b:o.t(n.title),c:o.t(n.username),d:o.t(n.motto),e:o.o$1(s=>l.following(n)),f:n.id,g:o.o$1(s=>l.goUserDetail(n),n.id)})),b:o.t(l.followText),c:l.isFlollow?"":1,d:l.isFlollow?1:""}}var m=o._export_sfc(w,[["render",_],["__scopeId","data-v-37177592"],["__file","C:/myself/social/social/src/pages/user/info/Follow.vue"]]);wx.createPage(m);
//# sourceMappingURL=Follow.js.map
