import{o as e,c as t,w as s,e as n,J as i,K as o,I as a,L as l,P as c,Q as r,p as u,a3 as d,F as f,M as p,R as h,a4 as g,$ as m,a5 as b}from"./vendor.123e8ae1.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";import{r as w}from"./uni-app.es.c3f400c9.js";import{s as y,c as v,b as S}from"./index.9a3d149a.js";var I=_({name:"UniTitle",props:{type:{type:String,default:""},title:{type:String,default:""},align:{type:String,default:"left"},color:{type:String,default:"#333333"},stat:{type:[Boolean,String],default:""}},data:()=>({}),computed:{textAlign(){let e="center";switch(this.align){case"left":e="flex-start";break;case"center":e="center";break;case"right":e="flex-end"}return e}},watch:{title(e){this.isOpenStat()&&uni.report&&uni.report("title",this.title)}},mounted(){this.isOpenStat()&&uni.report&&uni.report("title",this.title)},methods:{isOpenStat(){""===this.stat&&(this.isStat=!1);let e="boolean"==typeof this.stat&&this.stat||"string"==typeof this.stat&&""!==this.stat;return""===this.type&&(this.isStat=!0,"false"===this.stat.toString()&&(this.isStat=!1)),""!==this.type&&(this.isStat=!0,this.isStat=!!e),this.isStat}}},[["render",function(u,d,f,p,h,g){const m=c,b=r;return e(),t(b,{class:"uni-title__box",style:l({"align-items":g.textAlign})},{default:s((()=>[n(m,{class:a(["uni-title__base",["uni-"+f.type]]),style:l({color:f.color})},{default:s((()=>[i(o(f.title),1)])),_:1},8,["class","style"])])),_:1},8,["style"])}],["__scopeId","data-v-78f6f244"]]);var C=_({data:()=>({codeVisible:!1,loginVisible:!0,sendCaptchaEnabled:!0,codeMessage:"获取验证码",counterTimer:30,phoneNumber:null}),methods:{onInput:function(e){console.log("input e=",e),/^1[3456789]\d{9}$/.test(e.detail.value)?(this.codeVisible=!0,this.phoneNumber=e.detail.value):this.codeVisible=!1},onInputCode:function(e){console.log("code=",e),/^\d{6}$/.test(e.detail.value)?this.loginVisible=!1:this.loginVisible=!0},sendCaptcha:function(e){if(console.log("button e=",e),!this.sendCaptchaEnabled)return;this.sendCaptchaEnabled=!1;const t={phone:this.phoneNumber};console.log("params===",t),y(t).then((e=>{console.log("res=",e)})),this.codeMessage="重新发送";const s=setInterval((()=>{if(this.counterTimer<=0)return this.counterTimer=30,this.sendCaptchaEnabled=!0,clearInterval(s),void(this.codeMessage="获取验证码");this.counterTimer--}),1e3)},formSubmit:function(e){console.log("e=",e),console.log("form发生了submit事件，携带数据为："+JSON.stringify(e.detail.value));const t=e.detail.value,s=this;console.log("window.navigator=",window.navigator.userAgent),window.navigator.__defineGetter__("userAgent",(()=>"myBroser")),setTimeout((()=>{console.log("window.navigator1=",window.navigator.userAgent)}),200),v(t).then((e=>{console.log("res========",e);const{code:t,token:n}=e.data;200===t&&(console.log("成功"),S(n),s.$store.dispatch("user/GetUserInfo"),u({url:"/pages/index/index"}))}))},miniProLogin:function(e){console.log("e===",e),d({provider:"weixin",success:function(e){console.log("loginRes=",e.authResult)}})},getInfo:function(e){console.log("登录e=",e),d({provider:"weixin",success:function(e){console.log("loginRes====",e);const{code:t}=e;loginWechat({code:t}).then("res===",res)}})}}},[["render",function(a,l,u,d,_,y){const v=w(f("uni-title"),I),S=h,C=r,x=c,k=g,G=m,V=b;return e(),t(C,{class:"login-wraper"},{default:s((()=>[n(v,{type:"h1",align:"center",title:"蔓草"}),n(C,{class:"image"},{default:s((()=>[n(S,{style:{width:"100%",height:"100%"},src:"/assets/login-bg.66dcff35.gif",mode:""})])),_:1}),n(C,{class:"login"},{default:s((()=>[n(V,{onSubmit:y.formSubmit,onReset:a.formReset,class:"login-in"},{default:s((()=>[n(C,{class:"row uni-form-item uni-column"},{default:s((()=>[n(x,{class:"col-8 title"},{default:s((()=>[i("手机号：")])),_:1}),n(k,{class:"col-16 uni-input",name:"phone",placeholder:"请输入手机号",onInput:y.onInput},null,8,["onInput"])])),_:1}),n(C,{class:"row uni-form-item uni-column"},{default:s((()=>[n(x,{class:"col-8 title"},{default:s((()=>[i("验证码：")])),_:1}),n(k,{class:"col-8 uni-input",name:"code",placeholder:"请输入验证码",onInput:y.onInputCode},null,8,["onInput"]),_.codeVisible?(e(),t(G,{key:0,class:"col-8 code",disabled:!_.sendCaptchaEnabled,onClick:y.sendCaptcha},{default:s((()=>[i(o(_.codeMessage),1),_.sendCaptchaEnabled?p("v-if",!0):(e(),t(x,{key:0},{default:s((()=>[i("("+o(_.counterTimer)+"s)",1)])),_:1}))])),_:1},8,["disabled","onClick"])):p("v-if",!0)])),_:1}),n(C,{class:"uni-btn-v"},{default:s((()=>[n(G,{"form-type":"submit",type:"primary",class:"btn-block",disabled:_.loginVisible},{default:s((()=>[i(" 登录 ")])),_:1},8,["disabled"])])),_:1})])),_:1},8,["onSubmit","onReset"]),n(C,{class:"cut-off-line row"},{default:s((()=>[n(C,{class:"col-8 line-left"}),n(x,null,{default:s((()=>[i("其他登录方式")])),_:1}),n(C,{class:"col-8 line-right"})])),_:1}),n(C,{class:"other-login"},{default:s((()=>[n(G,{"open-type":"getUserInfo",onGetuserinfo:a.getuserinfo,withCredentials:"true",class:"login-way wechat"},{default:s((()=>[n(C,{class:"m-icon m-icon-weixin"})])),_:1},8,["onGetuserinfo"]),p(" </view> "),n(G,{"open-type":"getUserInfo",onGetuserinfo:a.getuserinfo,withCredentials:"true",class:"login-way wechat"},{default:s((()=>[n(C,{class:"m-icon m-icon-QQ"})])),_:1},8,["onGetuserinfo"]),n(G,{"open-type":"getUserInfo",onGetuserinfo:a.getuserinfo,withCredentials:"true",class:"login-way wechat"},{default:s((()=>[n(C,{class:"m-icon m-icon-weibo"})])),_:1},8,["onGetuserinfo"])])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-1a232f72"]]);export{C as default};