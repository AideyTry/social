import{z as a,a8 as e,A as l,o as s,c as t,w as u,I as n,e as o,D as i,E as r,H as c,J as d,K as f,G as m,M as p,N as _,Q as v,P as g,O as h,Z as b,T as y,C as k,V as w,a9 as C}from"./vendor.99a7c6c2.js";import{a as x}from"./index.9804d0eb.js";import{f as I,h as $}from"./communication.b58664a9.js";import{g as j,a as F}from"./publish.9811b5ac.js";import{_ as N}from"./plugin-vue_export-helper.21dcd24c.js";const O={name:"infoList"};var P=N(Object.assign(O,{props:{list:{type:Array,default:[]},activeIndex:{type:Number,default:0}},setup(b){const y=b;let k=a([]);return e((()=>y.list),(a=>{console.log("state=",a),k.value=a}),{deep:!0}),l((()=>{console.log("props=",y)})),(a,e)=>{const l=v,b=g,w=h;return s(),t(b,{class:"info-list"},{default:u((()=>[n(' <uni-list>\r\n      <uni-list-item\r\n        v-for="item in infoList"\r\n        :key="item.id"\r\n        :title="item.username"\r\n        :note="item.title"\r\n        :thumb="item.avatar"\r\n        thumb-size="lg"\r\n      ></uni-list-item>\r\n    </uni-list> '),o(b,{class:"ul"},{default:u((()=>[(s(!0),i(p,null,r(m(k),(e=>(s(),t(b,{class:"li",key:e.id,onClick:a=>(a=>{console.log("item=",a),0===y.activeIndex?_({url:`/pages/user/info/PublicDetail?id=${a.id}&hobby=${a.hobby}`}):_({url:`/pages/user/info/LikeDetail?id=${a.id}&hobby=${a.hobby}`})})(e)},{default:u((()=>[o(b,{class:"comment"},{default:u((()=>[(s(),i("svg",{class:"replay-icon","aria-hidden":"true"},[c("use",{"xlink:href":"#icon-pinglunhuifu"})])),o(b,null,{default:u((()=>[o(l,null,{default:u((()=>[d(f(e.comments||0),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),o(b,{class:"publish-info"},{default:u((()=>[o(b,{class:"title"},{default:u((()=>[d(f(e.title),1)])),_:2},1024),o(b,{class:"userinfo"},{default:u((()=>[o(w,{class:"avatar",mode:"aspectFit",src:e.avatar||""},null,8,["src"]),o(l,{class:"username"},{default:u((()=>[d(f(e.username),1)])),_:2},1024),o(l,{class:"update-time"},{default:u((()=>[d(f(a.$filters.commentTime(e.create_time||""))+" 更新",1)])),_:2},1024)])),_:2},1024)])),_:2},1024),o(b,{class:"img"},{default:u((()=>[o(w,{class:"img-url",mode:"aspectFit",src:e.url||""},null,8,["src"])])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})}}}),[["__scopeId","data-v-ddeb386a"]]);var D=N({setup(e){const i=b(),r=y((()=>i.state.user.userInfo)).value,c=()=>{new Promise(((a,e)=>{x(),a()})).then((()=>{location.reload()}))},p=()=>{_({url:"/pages/user/info/index"})};let N=a([]),O=a([]);const D=()=>{const a=[];for(let e of N.value)a.push(e.follow_id);_({url:`/pages/user/info/Follow?type=0&userids=${encodeURIComponent(JSON.stringify(a))}`})},J=()=>{const a=[];for(let e of O.value)a.push(e.user_id);_({url:`/pages/user/info/Follow?type=1&userids=${encodeURIComponent(JSON.stringify(a))}`})};let L=a(0),z=a([]);a([]);const A=a=>{L.value=a};return k((()=>{0===L.value?(z.value=[],j().then((a=>{console.log("data getPublish=",a),200===a.data.code&&(z.value=a.data.data)}))):(z.value=[],F().then((a=>{console.log("data likes=",a),200===a.data.code&&(z.value=a.data.data)})))}),L.value),l((()=>{I().then((a=>{console.log("getfollows =",a),200===a.data.code&&(N.value=a.data.follows)})),$().then((a=>{console.log("getfans =",a),200===a.data.code&&(O.value=a.data.fans)}))})),(a,e)=>{const l=h,i=v,_=g,b=C;return s(),t(_,{class:"userinfo-wraper"},{default:u((()=>[o(_,{class:"userinfo"},{default:u((()=>[o(_,{class:"avatar-warper",onClick:p},{default:u((()=>[o(l,{src:m(r).avatar?m(r).avatar:"/static/images/default_avatar.png",class:"avatar"},null,8,["src"]),m(r).avatar?n("v-if",!0):(s(),t(i,{key:0,class:"avatar-title"},{default:u((()=>[d("请上传图片")])),_:1}))])),_:1}),o(_,{class:"userinfo-detail"},{default:u((()=>[o(i,null,{default:u((()=>[d("用户名："+f(m(r).username),1)])),_:1}),o(i,null,{default:u((()=>[d("签  名: "+f(m(r).motto),1)])),_:1})])),_:1})])),_:1}),o(_,{class:"fans-wraper"},{default:u((()=>[o(_,{class:"follows",onClick:D},{default:u((()=>[o(i,null,{default:u((()=>[d("关注")])),_:1}),d(" "),o(i,null,{default:u((()=>[d(f(m(N).length),1)])),_:1})])),_:1}),o(_,{class:"fans",onClick:J},{default:u((()=>[o(i,null,{default:u((()=>[d("粉丝")])),_:1}),d(" "),o(i,null,{default:u((()=>[d(f(m(O).length),1)])),_:1})])),_:1})])),_:1}),o(_,{class:"publish-wraper"},{default:u((()=>[o(_,{class:"my-publishs",onClick:e[0]||(e[0]=a=>A(0))},{default:u((()=>[o(i,null,{default:u((()=>[d("我发布的")])),_:1}),o(_,{class:w({active:0===m(L)})},null,8,["class"])])),_:1}),o(_,{class:"my-likes",onClick:e[1]||(e[1]=a=>A(1))},{default:u((()=>[o(i,null,{default:u((()=>[d("我喜欢的")])),_:1}),o(_,{class:w({active:1===m(L)})},null,8,["class"])])),_:1})])),_:1}),o(_,null,{default:u((()=>[o(P,{list:m(z),activeIndex:m(L)},null,8,["list","activeIndex"])])),_:1}),o(b,{onClick:c,style:{"margin-top":"20rpx"}},{default:u((()=>[d("退出")])),_:1})])),_:1})}}},[["__scopeId","data-v-f87355ec"]]);export{D as default};
//# sourceMappingURL=pages-user-index.75ab6fd1.js.map