"use strict";var e=require("../../common/vendor.js"),o=require("../../api/hobby.js");require("../../utils/request.js"),require("../../utils/auth.js");const t={components:{VideoPlayer:()=>"../components/VideoPlayer.js"},onLoad:function(e){console.log("options===",e)},setup(t,i){let n=e.ref({});const s=e.reactive({poster:"//img2.chinadaily.com.cn/images/202201/13/61e00901a310cdd3d826b064.jpeg",src:"https://social-1308251497.cos.ap-guangzhou.myqcloud.com/video/695c8c8a78f7e9a184a17db72e734a63/695c8c8a78f7e9a184a17db72e734a63.m3u8"});return e.onMounted((()=>{(e=>{const t={id:e};o.videoDetail(t).then((e=>{console.log("data===",e),200===e.data.code&&(n.value=e.data.data)}))})(t.id)})),{videInfo:n,options:s}}};if(!Array){(e.resolveComponent("VideoPlayer")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list"))()}Math||((()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js"))();var i=e._export_sfc(t,[["render",function(o,t,i,n,s,a){return{a:e.t(n.videInfo.title),b:e.t(n.videInfo.abstract),c:e.p({options:n.options}),d:e.f(n.videInfo.sections,((o,t,i)=>({a:e.t(o.section),b:o.id,c:"15e8b752-2-"+i+",15e8b752-1",d:e.p({note:o.section})})))}}],["__scopeId","data-v-15e8b752"]]);wx.createPage(i);
//# sourceMappingURL=VideoDetail.js.map