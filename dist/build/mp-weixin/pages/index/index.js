"use strict";var e=require("../../common/vendor.js"),t=require("../../utils/storage.js");const r={onShow:function(){t.getTotalIM()>0&&e.index.setTabBarBadge({index:2,text:"···"})},components:{McTabs:()=>"./McTabs.js"},setup(){const t=e.useStore();return e.computed$1((()=>t.state.user.userInfo)).value,e.onMounted((()=>{})),{title:"蔓草"}}};if(!Array){e.resolveComponent("McTabs")()}var o=e._export_sfc(r,[["render",function(e,t,r,o,n,s){return{}}]]);wx.createPage(o);
//# sourceMappingURL=index.js.map