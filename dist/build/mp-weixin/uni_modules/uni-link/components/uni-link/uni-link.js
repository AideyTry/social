"use strict";var e=require("../../../../common/vendor.js");const t={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA(){return!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created(){this._isH5=null},methods:{isMail(){return this.href.startsWith("mailto:")},isTel(){return this.href.startsWith("tel:")},openURL(){e.index.setClipboardData({data:this.href}),e.index.showModal({content:this.copyTips,showCancel:!1})},makePhoneCall(t){e.index.makePhoneCall({phoneNumber:t})}}};var n=e._export_sfc(t,[["render",function(t,n,i,o,r,s){return e.e({a:s.isShowA},s.isShowA?{b:e.t(i.text),c:i.href,d:!0===i.showUnderLine||"true"===i.showUnderLine?1:"",e:i.color,f:i.fontSize+"px",g:i.download}:{h:e.t(i.text),i:!0===i.showUnderLine||"true"===i.showUnderLine?1:"",j:i.color,k:i.fontSize+"px",l:e.o$1(((...e)=>s.openURL&&s.openURL(...e)))})}]]);wx.createComponent(n);
//# sourceMappingURL=uni-link.js.map
