"use strict";var e=require("../../common/vendor.js"),o=require("../../api/communication.js");require("../../utils/request.js"),require("../../utils/auth.js");const t={name:"comment"},a=Object.assign(t,{props:{hobbyInfo:{type:Object,default:{}}},setup(t){const a=t;let b=e.ref(""),n=e.ref(0),r=e.ref([]);console.log("props=",a);const s=e=>{console.log("e=",e);const{detail:{value:t}}=e;let n={comment:t,detailUserId:a.hobbyInfo.user_id,hobbyId:a.hobbyInfo[`hobby_${a.hobbyInfo.hobby}_id`],hobby:a.hobbyInfo.hobby};o.setComment(n).then((e=>{200===e.statusCode&&(b.value="",u())}))},u=()=>{console.log("props.hobbyInfo=======================",a.hobbyInfo);let e={hobbyId:a.hobbyInfo[`hobby_${a.hobbyInfo.hobby}_id`],hobby:a.hobbyInfo.hobby};o.getComment(e).then((e=>{console.log("data666666===",e),200===e.data.code&&(r.value=e.data.data,n.value=e.data.data.length)}))};return e.onMounted((()=>{e.nextTick((()=>{u()}))})),(o,a)=>({a:e.t(e.unref(n)),b:t.hobbyInfo.avatar||"",c:e.o$1(s),d:e.unref(b),e:e.o$1((o=>e.isRef(b)?b.value=o.detail.value:b=o.detail.value)),f:e.f(e.unref(r),((t,a,b)=>e.e({a:t.avatar||"",b:e.t(t.username),c:t.isAuthor},(t.isAuthor,{}),{d:e.t(t.comment),e:e.t(o.$filters.commentTime(t.create_time)),f:t.id})))})}});var b=e._export_sfc(a,[["__scopeId","data-v-78a9adac"]]);wx.createComponent(b);
//# sourceMappingURL=Comment.js.map