import{D as a,E as e,o,H as l,e as t,w as s,N as n,O as c,K as d,a6 as u,Q as r,I as i,c as f,M as b,U as m,T as p,S as h,a7 as _,a8 as y,X as v,W as I,a1 as w,Z as g,n as x}from"./vendor.8708ba27.js";import{b as j}from"./hobby.0953262b.js";import{a as k,b as F,d as V,c as C,e as T}from"./communication.490d5b12.js";import{_ as D}from"./plugin-vue_export-helper.21dcd24c.js";import{V as O}from"./VideoPlayer.eebce0eb.js";import{f as P}from"./index.ceb77c50.js";const U={name:"comment"};var q=D({components:{Comment:D(Object.assign(U,{props:{hobbyInfo:{type:Object,default:{}}},setup(y){const v=y;let I=a(""),w=a(0),g=a([]);console.log("props=",v);const x=a=>{console.log("e=",a);const{detail:{value:e}}=a;let o={comment:e,detailUserId:v.hobbyInfo.user_id,hobbyId:v.hobbyInfo.hobby_4_id};k(o).then((a=>{200===a.statusCode&&(I.value="",j())}))},j=()=>{let a={hobbyId:v.hobbyInfo.hobby_4_id};F(a).then((a=>{console.log("data666666===",a),200===a.data.code&&(g.value=a.data.data,w.value=a.data.data.length)}))};return e((()=>{j()})),(a,e)=>{const v=m,j=p,k=h,F=_;return o(),l("div",{class:"comment"},[t(j,{class:"total"},{default:s((()=>[t(v,null,{default:s((()=>[n("共")])),_:1}),t(v,null,{default:s((()=>[n(c(d(w)),1)])),_:1}),t(v,null,{default:s((()=>[n("条评论")])),_:1})])),_:1}),t(j,{class:"my-comment"},{default:s((()=>[t(k,{class:"avatar",mode:"aspectFit",src:y.hobbyInfo.avatar||""},null,8,["src"]),t(F,{modelValue:d(I),"onUpdate:modelValue":e[0]||(e[0]=a=>u(I)?I.value=a:I=a),type:"text",class:"comment-input",placeholder:"喜欢就给个评论支持一下呗~",onConfirm:x},null,8,["modelValue"])])),_:1}),(o(!0),l(r,null,i(d(g),(e=>(o(),f(j,{class:"other-comment",key:e.id},{default:s((()=>[t(j,null,{default:s((()=>[t(k,{class:"avatar",mode:"aspectFit",src:e.avatar||""},null,8,["src"])])),_:2},1024),t(j,{class:"comment-info"},{default:s((()=>[t(j,{class:"userinfo"},{default:s((()=>[t(v,null,{default:s((()=>[n(c(e.username),1)])),_:2},1024),e.isAuthor?(o(),f(v,{key:0,class:"is-author"},{default:s((()=>[n("作者")])),_:1})):b("v-if",!0)])),_:2},1024),t(j,{class:"comment-content"},{default:s((()=>[t(v,null,{default:s((()=>[n(c(e.comment),1)])),_:2},1024)])),_:2},1024),t(j,null,{default:s((()=>[t(v,null,{default:s((()=>[n(c(a.$filters.commentTime(e.create_time)),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])}}}),[["__scopeId","data-v-0b10064a"]]),VideoPlayer:O},onLoad:function(a){console.log("options===",a)},setup(o){console.log("props=",o);const l=y(),t=v((()=>l.state.user.userInfo)).value,s=I({poster:"",src:""});let n=a([{content:"https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif"}]);a(0),a("default");let c=a({});let d=a(!1),u=a("关注");let r=a(null);const i=()=>{let a={followId:c.value.user_id};console.log("params===",a),T(a).then((a=>{console.log("data1===",a),200===a.data.code&&(d.value=a.data.isFollow,a.data.isFollow?u.value="已关注":u.value="关注")}))};return e((()=>{console.log("userInfo===",t),(a=>{const{id:e,hobby:o}=a;j({id:e,hobby:o}).then((a=>{console.log("data===",a),200===a.data.code&&(c.value=a.data.data,r.value=P(a.data.data.create_time),console.log("hobbyInfo.value===",c.value),console.log("data.data.data.url===",a.data.data.url),s.poster=a.data.data.url,s.src=a.data.data.video_url,i())}))})({id:o.id,hobby:o.hobby})})),{followText:u,isFlollow:d,following:()=>{if(d.value)return void x({content:"确认不再关注？",success:function(a){if(a.confirm){let a={followId:c.value.user_id};V(a).then((a=>{200===a.data.code&&(u.value="关注",d.value=!1)}))}else a.cancel&&console.log("用户点击取消")}});console.log("userInfo===",t);let a={followId:c.value.user_id};C(a).then((a=>{console.log("data===",a),200===a.data.code&&(u.value="已关注",d.value=!0)}))},hobbyInfo:c,info:n,publishDate:r,options:s}}},[["render",function(a,e,d,u,r,i){const _=h,y=w("VideoPlayer"),v=p,I=m,x=w("Comment");return o(),l("div",{class:"hobby-detail"},[b(' <uni-swiper-dot\r\n      :info="info"\r\n      :current="current"\r\n      field="content"\r\n      :mode="mode"\r\n    >\r\n      <swiper class="swiper-box" @change="change">\r\n        <swiper-item v-for="(item, index) in info" :key="index">\r\n          <view class="swiper-item">\r\n            <image :src="item.content" class="image"></image>\r\n          </view>\r\n        </swiper-item>\r\n      </swiper>\r\n    </uni-swiper-dot> '),t(v,{class:"swiper-box"},{default:s((()=>[t(v,{class:"swiper-item"},{default:s((()=>[0===u.hobbyInfo.fileType?(o(),f(_,{key:0,src:u.hobbyInfo.url,class:"image"},null,8,["src"])):b("v-if",!0),1===u.hobbyInfo.fileType?(o(),f(y,{options:{src:u.hobbyInfo.video_url,poster:u.hobbyInfo.url},key:u.hobbyInfo.id},null,8,["options"])):b("v-if",!0)])),_:1})])),_:1}),t(v,{class:"author-wraper"},{default:s((()=>[t(v,{class:"author"},{default:s((()=>[t(v,{class:"author-info"},{default:s((()=>[t(_,{class:"avatar",mode:"aspectFit",src:u.hobbyInfo.avatar||""},null,8,["src"]),t(I,null,{default:s((()=>[n(c(u.hobbyInfo.username||""),1)])),_:1})])),_:1}),t(v,{class:g({follow:!u.isFlollow,active:u.isFlollow}),onClick:u.following},{default:s((()=>[t(I,null,{default:s((()=>[n(c(u.followText),1)])),_:1})])),_:1},8,["class","onClick"])])),_:1})])),_:1}),t(v,{class:"content-wraper"},{default:s((()=>[t(v,{class:"content"},{default:s((()=>[t(v,{class:"title"},{default:s((()=>[n(c(u.hobbyInfo.title),1)])),_:1}),t(v,{class:"main"},{default:s((()=>[n(c(u.hobbyInfo.content),1)])),_:1}),t(v,{class:"publish-date"},{default:s((()=>[t(I,null,{default:s((()=>[n("发布于: ")])),_:1}),t(I,null,{default:s((()=>[n(c(u.publishDate),1)])),_:1})])),_:1})])),_:1})])),_:1}),t(v,{class:"comment-wraper"},{default:s((()=>[u.hobbyInfo.hobby_4_id?(o(),f(x,{key:0,hobbyInfo:u.hobbyInfo},null,8,["hobbyInfo"])):b("v-if",!0)])),_:1})])}],["__scopeId","data-v-4d0a1792"]]);export{q as default};
