import{r as a,W as e,o as l,c as s,d as t,e as n,q as u,f as o,g as i,h as r,X as c,i as d,t as f,u as m,F as p,s as _,v,x as g,y as h,l as b,w as y,n as k,B as x,C as w,D as C,E as I,Y as $,Z as j}from"./index.caabeb3a.js";import{c as F,e as O}from"./communication.fd523598.js";import{g as D,a as L}from"./publish.bfdf3198.js";import{_ as N}from"./plugin-vue_export-helper.21dcd24c.js";const P={name:"infoList"};var S=N(Object.assign(P,{props:{list:{type:Array,default:[]},activeIndex:{type:Number,default:0}},setup(b){const y=b;let k=a([]);return e((()=>y.list),(a=>{console.log("state=",a),k.value=a}),{deep:!0}),l((()=>{console.log("props=",y)})),(a,e)=>{const l=v,b=g,x=h;return s(),t(b,{class:"info-list"},{default:n((()=>[u(' <uni-list>\r\n      <uni-list-item\r\n        v-for="item in infoList"\r\n        :key="item.id"\r\n        :title="item.username"\r\n        :note="item.title"\r\n        :thumb="item.avatar"\r\n        thumb-size="lg"\r\n      ></uni-list-item>\r\n    </uni-list> '),o(b,{class:"ul"},{default:n((()=>[(s(!0),i(p,null,r(m(k),(e=>(s(),t(b,{class:"li",key:e.id,onClick:a=>(a=>{console.log("item=",a),0===y.activeIndex?_({url:`/pages/user/info/PublicDetail?id=${a.id}&hobby=${a.hobby}`}):_({url:`/pages/user/info/LikeDetail?id=${a.id}&hobby=${a.hobby}`})})(e)},{default:n((()=>[o(b,{class:"comment"},{default:n((()=>[u(' <svg class="replay-icon" aria-hidden="true">\r\n            <use xlink:href="#icon-pinglunhuifu"></use>\r\n          </svg> '),c("span",{class:"iconfont replay-icon"},""),o(b,null,{default:n((()=>[o(l,null,{default:n((()=>[d(f(e.comments||0),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),o(b,{class:"publish-info"},{default:n((()=>[o(b,{class:"title"},{default:n((()=>[d(f(e.title),1)])),_:2},1024),o(b,{class:"userinfo"},{default:n((()=>[o(x,{class:"avatar",mode:"aspectFit",src:e.avatar||""},null,8,["src"]),o(l,{class:"username"},{default:n((()=>[d(f(e.username),1)])),_:2},1024),o(l,{class:"update-time"},{default:n((()=>[d(f(a.$filters.commentTime(e.create_time||""))+" 更新",1)])),_:2},1024)])),_:2},1024)])),_:2},1024),o(b,{class:"img"},{default:n((()=>[o(x,{class:"img-url",mode:"aspectFit",src:e.url||""},null,8,["src"])])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})}}}),[["__scopeId","data-v-503cb038"]]);const J={onShow:function(){x()>0?w({index:2,text:"···"}):C({index:2})}};var R=N(Object.assign(J,{setup(e){const i=I(),r=b((()=>i.state.user.userInfo)).value,c=()=>{new Promise(((a,e)=>{$(),a()})).then((()=>{location.reload()}))},p=()=>{_({url:"/pages/user/info/index"})};let x=a([]),w=a([]);const C=()=>{const a=[];for(let e of x.value)a.push(e.follow_id);_({url:`/pages/user/info/Follow?type=0&userids=${encodeURIComponent(JSON.stringify(a))}`})},N=()=>{const a=[];for(let e of w.value)a.push(e.user_id);_({url:`/pages/user/info/Follow?type=1&userids=${encodeURIComponent(JSON.stringify(a))}`})};let P=a(0),J=a([]);a([]);const R=a=>{P.value=a};return y((()=>{0===P.value?(J.value=[],D().then((a=>{console.log("data getPublish=",a),200===a.data.code&&(J.value=a.data.data)}))):(J.value=[],L().then((a=>{console.log("data likes=",a),200===a.data.code&&(J.value=a.data.data)})))}),P.value),l((()=>{F().then((a=>{console.log("getfollows =",a),200===a.data.code&&(x.value=a.data.follows)})),O().then((a=>{console.log("getfans =",a),200===a.data.code&&(w.value=a.data.fans)}))})),(a,e)=>{const l=h,i=v,_=g,b=j;return s(),t(_,{class:"userinfo-wraper"},{default:n((()=>[o(_,{class:"userinfo"},{default:n((()=>[o(_,{class:"avatar-warper",onClick:p},{default:n((()=>[o(l,{src:m(r).avatar?m(r).avatar:"/static/images/default_avatar.png",class:"avatar"},null,8,["src"]),m(r).avatar?u("v-if",!0):(s(),t(i,{key:0,class:"avatar-title"},{default:n((()=>[d("请上传图片")])),_:1}))])),_:1}),o(_,{class:"userinfo-detail"},{default:n((()=>[o(i,null,{default:n((()=>[d("用户名："+f(m(r).username),1)])),_:1}),o(_,{class:"motto"},{default:n((()=>[o(i,null,{default:n((()=>[d("签   名：")])),_:1}),o(i,null,{default:n((()=>[d(f(m(r).motto),1)])),_:1})])),_:1})])),_:1})])),_:1}),o(_,{class:"fans-wraper"},{default:n((()=>[o(_,{class:"follows",onClick:C},{default:n((()=>[o(i,null,{default:n((()=>[d("关注")])),_:1}),d(" "),o(i,null,{default:n((()=>[d(f(m(x).length),1)])),_:1})])),_:1}),o(_,{class:"fans",onClick:N},{default:n((()=>[o(i,null,{default:n((()=>[d("粉丝")])),_:1}),d(" "),o(i,null,{default:n((()=>[d(f(m(w).length),1)])),_:1})])),_:1})])),_:1}),o(_,{class:"publish-wraper"},{default:n((()=>[o(_,{class:"my-publishs",onClick:e[0]||(e[0]=a=>R(0))},{default:n((()=>[o(i,null,{default:n((()=>[d("我发布的")])),_:1}),o(_,{class:k({active:0===m(P)})},null,8,["class"])])),_:1}),o(_,{class:"my-likes",onClick:e[1]||(e[1]=a=>R(1))},{default:n((()=>[o(i,null,{default:n((()=>[d("我喜欢的")])),_:1}),o(_,{class:k({active:1===m(P)})},null,8,["class"])])),_:1})])),_:1}),o(_,null,{default:n((()=>[o(S,{list:m(J),activeIndex:m(P)},null,8,["list","activeIndex"])])),_:1}),o(b,{onClick:c,style:{"margin-top":"20rpx"}},{default:n((()=>[d("退出")])),_:1}),u("v-if",!0)])),_:1})}}}),[["__scopeId","data-v-b713a6be"]]);export{R as default};
//# sourceMappingURL=pages-user-index.14ad2446.js.map