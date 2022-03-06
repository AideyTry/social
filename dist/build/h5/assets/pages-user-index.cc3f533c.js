import{D as a,E as l,o as s,c as e,w as t,Z as u,e as n,H as o,I as i,L as r,M as c,K as d,P as f,S as _,T as m,R as p,a8 as v,W as g,G as h,Y as b,Q as k,aa as w}from"./vendor.3b43a146.js";import{r as y,a as j}from"./index.70ed70ad.js";import{f as x,h as C}from"./communication.bc709e32.js";import{_ as I}from"./plugin-vue_export-helper.21dcd24c.js";const L={name:"infoList"};var P=I(Object.assign(L,{props:{list:{type:Array,default:[]}},setup(v){const g=v;let h=a([]);return l((()=>{console.log("props=",g),h.value=g.list,console.log("infoList.value=",h.value)})),(a,l)=>{const v=_,g=m,b=p;return s(),e(v,{class:"info-list"},{default:t((()=>[u(' <uni-list>\r\n      <uni-list-item\r\n        v-for="item in infoList"\r\n        :key="item.id"\r\n        :title="item.username"\r\n        :note="item.title"\r\n        :thumb="item.avatar"\r\n        thumb-size="lg"\r\n      ></uni-list-item>\r\n    </uni-list> '),n(v,{class:"ul"},{default:t((()=>[(s(!0),o(f,null,i(d(h),(l=>(s(),e(v,{class:"li",key:l.id},{default:t((()=>[n(v,{class:"comment"},{default:t((()=>[n(v,null,{default:t((()=>[r("回复")])),_:1}),n(v,null,{default:t((()=>[n(g,null,{default:t((()=>[r("2")])),_:1})])),_:1})])),_:1}),n(v,{class:"publish-info"},{default:t((()=>[n(v,{class:"title"},{default:t((()=>[r(c(l.title),1)])),_:2},1024),n(v,{class:"userinfo"},{default:t((()=>[n(b,{class:"avatar",mode:"aspectFit",src:l.url||""},null,8,["src"]),n(g,{class:"username"},{default:t((()=>[r(c(l.username),1)])),_:2},1024),n(g,{class:"update-time"},{default:t((()=>[r(c(a.$filters.commentTime(l.create_time))+" 更新",1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})}}}),[["__scopeId","data-v-3ead692f"]]);var T=I({setup(o){const i=v(),f=g((()=>i.state.user.userInfo)).value,I=()=>{new Promise(((a,l)=>{j(),a()})).then((()=>{location.reload()}))},L=()=>{k({url:"/pages/user/info/index"})};let T=a(0),E=a(0),G=a(0),M=a([]);const z=()=>{var a;(console.log("params===",a),y("/publishs/getPublish","GET",a)).then((a=>{console.log("data getPublish=",a),200===a.data.code&&(M.value=a.data.data)}))};let A=a([]);const D=()=>{var a;(console.log("params===",a),y("/publishs/getMylikes","GET",a)).then((a=>{console.log("data likes=",a),200===a.data.code&&(A.value=a.data.data)}))},F=a=>{G.value=a};return h((()=>{0===G.value?z():D()}),G.value),l((()=>{x().then((a=>{console.log("getfollows =",a),200===a.data.code&&(T.value=a.data.follows)})),C().then((a=>{console.log("getfans =",a),200===a.data.code&&(E.value=a.data.fans)})),z()})),(a,l)=>{const o=p,i=m,v=_,g=w;return s(),e(v,{class:"userinfo-wraper"},{default:t((()=>[n(v,{class:"userinfo"},{default:t((()=>[n(v,{class:"avatar-warper",onClick:L},{default:t((()=>[n(o,{src:d(f).avatar?d(f).avatar:"/static/images/default_avatar.png",class:"avatar"},null,8,["src"]),n(i,{class:"avatar-title"},{default:t((()=>[r("请上传图片")])),_:1})])),_:1}),n(v,{class:"userinfo-detail"},{default:t((()=>[n(i,null,{default:t((()=>[r("用户名："+c(d(f).username),1)])),_:1}),n(i,null,{default:t((()=>[r("签  名: "+c(d(f).motto),1)])),_:1})])),_:1})])),_:1}),n(v,{class:"fans-wraper"},{default:t((()=>[n(v,{class:"follows"},{default:t((()=>[n(i,null,{default:t((()=>[r("关注")])),_:1}),r(" "),n(i,null,{default:t((()=>[r(c(d(T)),1)])),_:1})])),_:1}),n(v,{class:"fans"},{default:t((()=>[n(i,null,{default:t((()=>[r("粉丝")])),_:1}),r(" "),n(i,null,{default:t((()=>[r(c(d(E)),1)])),_:1})])),_:1})])),_:1}),n(v,{class:"publish-wraper"},{default:t((()=>[n(v,{class:"my-publishs",onClick:l[0]||(l[0]=a=>F(0))},{default:t((()=>[n(i,null,{default:t((()=>[r("我发布的")])),_:1}),n(v,{class:b({active:0===d(G)})},null,8,["class"])])),_:1}),n(v,{class:"my-likes",onClick:l[1]||(l[1]=a=>F(1))},{default:t((()=>[n(i,null,{default:t((()=>[r("我喜欢的")])),_:1}),n(v,{class:b({active:1===d(G)})},null,8,["class"])])),_:1})])),_:1}),n(v,null,{default:t((()=>[d(M).length?(s(),e(P,{key:0,list:d(M)},null,8,["list"])):u("v-if",!0)])),_:1}),n(g,{onClick:I,style:{"margin-top":"20rpx"}},{default:t((()=>[r("退出")])),_:1})])),_:1})}}},[["__scopeId","data-v-39ca1101"]]);export{T as default};
