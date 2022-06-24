import{m as e,c as t,d as a,e as r,f as l,q as s,n,p as o,g as i,F as u,H as c,_ as f,U as h,x as p,M as d,l as y,r as m,k as g,W as v,u as b,T as _,h as x,i as w,t as k,B as C,C as I,D as S,E as B,v as A,$ as F,Z as T,a0 as $,a1 as V,a2 as M,a3 as U,a4 as L,a5 as P,a6 as z}from"./index.caabeb3a.js";import{r as j,_ as q}from"./uni-app.es.84be360c.js";import{_ as E}from"./plugin-vue_export-helper.21dcd24c.js";import{_ as H,a as O}from"./uni-forms.6adea248.js";import{l as N}from"./index.0b6b4e02.js";var R=E({name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm"],model:{prop:"modelValue",event:"update:modelValue"},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default:()=>({color:"#333",disableColor:"#F7F6F6",borderColor:"#e5e5e5"})},errorMessage:{type:[String,Boolean],default:""}},data:()=>({focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}),computed:{msg(){return this.errorMessage||this.errMsg},inputMaxlength(){return Number(this.maxlength)}},watch:{value(e){this.errMsg&&(this.errMsg=""),this.val=e,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(e))},modelValue(e){this.errMsg&&(this.errMsg=""),this.val=e,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(e))},focus(e){this.$nextTick((()=>{this.focused=this.focus}))}},created(){this.value||(this.val=this.modelValue),this.modelValue||(this.val=this.value),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.val)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted(){this.$nextTick((()=>{this.focused=this.focus}))},methods:{init(){},onClickIcon(e){this.$emit("iconClick",e)},getForm(e="uniForms"){let t=this.$parent,a=t.$options.name;for(;a!==e;){if(t=t.$parent,!t)return!1;a=t.$options.name}return t},onEyes(){this.showPassword=!this.showPassword},onInput(e){let t=e.detail.value;this.trim&&("boolean"==typeof this.trim&&this.trim&&(t=this.trimStr(t)),"string"==typeof this.trim&&(t=this.trimStr(t,this.trim))),this.errMsg&&(this.errMsg=""),this.val=t,this.$emit("input",t),this.$emit("update:modelValue",t)},onFocus(e){this.$emit("focus",e)},onBlur(e){e.detail.value,this.$emit("blur",e)},onConfirm(e){this.$emit("confirm",e.detail.value)},onClear(e){this.val="",this.$emit("input",""),this.$emit("update:modelValue","")},fieldClick(){this.$emit("click")},trimStr:(e,t="both")=>"both"===t?e.trim():"left"===t?e.trimLeft():"right"===t?e.trimRight():"start"===t?e.trimStart():"end"===t?e.trimEnd():"all"===t?e.replace(/\s+/g,""):e}},[["render",function(d,y,m,g,v,b){const _=j(e("uni-icons"),q),x=f,w=h,k=p;return t(),a(k,{class:n(["uni-easyinput",{"uni-easyinput-error":b.msg}]),style:o({color:m.inputBorder&&b.msg?"#e43d33":m.styles.color})},{default:r((()=>[l(k,{class:n(["uni-easyinput__content",{"is-input-border":m.inputBorder,"is-input-error-border":m.inputBorder&&b.msg,"is-textarea":"textarea"===m.type,"is-disabled":m.disabled}]),style:o({"border-color":m.inputBorder&&b.msg?"#dd524d":m.styles.borderColor,"background-color":m.disabled?m.styles.disableColor:""})},{default:r((()=>[m.prefixIcon?(t(),a(_,{key:0,class:"content-clear-icon",type:m.prefixIcon,color:"#c0c4cc",onClick:y[0]||(y[0]=e=>b.onClickIcon("prefix"))},null,8,["type"])):s("v-if",!0),"textarea"===m.type?(t(),a(x,{key:1,class:n(["uni-easyinput__content-textarea",{"input-padding":m.inputBorder}]),name:m.name,value:v.val,placeholder:m.placeholder,placeholderStyle:m.placeholderStyle,disabled:m.disabled,"placeholder-class":"uni-easyinput__placeholder-class",maxlength:b.inputMaxlength,focus:v.focused,autoHeight:m.autoHeight,onInput:b.onInput,onBlur:b.onBlur,onFocus:b.onFocus,onConfirm:b.onConfirm},null,8,["class","name","value","placeholder","placeholderStyle","disabled","maxlength","focus","autoHeight","onInput","onBlur","onFocus","onConfirm"])):(t(),a(w,{key:2,type:"password"===m.type?"text":m.type,class:"uni-easyinput__content-input",style:o({"padding-right":"password"===m.type||m.clearable||m.prefixIcon?"":"10px","padding-left":m.prefixIcon?"":"10px"}),name:m.name,value:v.val,password:!v.showPassword&&"password"===m.type,placeholder:m.placeholder,placeholderStyle:m.placeholderStyle,"placeholder-class":"uni-easyinput__placeholder-class",disabled:m.disabled,maxlength:b.inputMaxlength,focus:v.focused,confirmType:m.confirmType,onFocus:b.onFocus,onBlur:b.onBlur,onInput:b.onInput,onConfirm:b.onConfirm},null,8,["type","style","name","value","password","placeholder","placeholderStyle","disabled","maxlength","focus","confirmType","onFocus","onBlur","onInput","onConfirm"])),"password"===m.type&&m.passwordIcon?(t(),i(u,{key:3},[""!=v.val?(t(),a(_,{key:0,class:n(["content-clear-icon",{"is-textarea-icon":"textarea"===m.type}]),type:v.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc",onClick:b.onEyes},null,8,["class","type","onClick"])):s("v-if",!0)],2112)):m.suffixIcon?(t(),i(u,{key:4},[m.suffixIcon?(t(),a(_,{key:0,class:"content-clear-icon",type:m.suffixIcon,color:"#c0c4cc",onClick:y[1]||(y[1]=e=>b.onClickIcon("suffix"))},null,8,["type"])):s("v-if",!0)],2112)):(t(),i(u,{key:5},[m.clearable&&v.val&&!m.disabled?(t(),a(_,{key:0,class:n(["content-clear-icon",{"is-textarea-icon":"textarea"===m.type}]),type:"clear",size:m.clearSize,color:"#c0c4cc",onClick:b.onClear},null,8,["class","size","onClick"])):s("v-if",!0)],2112)),c(d.$slots,"right",{},void 0,!0)])),_:3},8,["class","style"])])),_:3},8,["class","style"])}],["__scopeId","data-v-4b395c1e"]]),D={exports:{}},Z=D.exports=function(e){var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function a(e,t){var a=e[0],r=e[1],l=e[2],s=e[3];r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&l|~r&s)+t[0]-680876936|0)<<7|a>>>25)+r|0)&r|~a&l)+t[1]-389564586|0)<<12|s>>>20)+a|0)&a|~s&r)+t[2]+606105819|0)<<17|l>>>15)+s|0)&s|~l&a)+t[3]-1044525330|0)<<22|r>>>10)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&l|~r&s)+t[4]-176418897|0)<<7|a>>>25)+r|0)&r|~a&l)+t[5]+1200080426|0)<<12|s>>>20)+a|0)&a|~s&r)+t[6]-1473231341|0)<<17|l>>>15)+s|0)&s|~l&a)+t[7]-45705983|0)<<22|r>>>10)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&l|~r&s)+t[8]+1770035416|0)<<7|a>>>25)+r|0)&r|~a&l)+t[9]-1958414417|0)<<12|s>>>20)+a|0)&a|~s&r)+t[10]-42063|0)<<17|l>>>15)+s|0)&s|~l&a)+t[11]-1990404162|0)<<22|r>>>10)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&l|~r&s)+t[12]+1804603682|0)<<7|a>>>25)+r|0)&r|~a&l)+t[13]-40341101|0)<<12|s>>>20)+a|0)&a|~s&r)+t[14]-1502002290|0)<<17|l>>>15)+s|0)&s|~l&a)+t[15]+1236535329|0)<<22|r>>>10)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&s|l&~s)+t[1]-165796510|0)<<5|a>>>27)+r|0)&l|r&~l)+t[6]-1069501632|0)<<9|s>>>23)+a|0)&r|a&~r)+t[11]+643717713|0)<<14|l>>>18)+s|0)&a|s&~a)+t[0]-373897302|0)<<20|r>>>12)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&s|l&~s)+t[5]-701558691|0)<<5|a>>>27)+r|0)&l|r&~l)+t[10]+38016083|0)<<9|s>>>23)+a|0)&r|a&~r)+t[15]-660478335|0)<<14|l>>>18)+s|0)&a|s&~a)+t[4]-405537848|0)<<20|r>>>12)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&s|l&~s)+t[9]+568446438|0)<<5|a>>>27)+r|0)&l|r&~l)+t[14]-1019803690|0)<<9|s>>>23)+a|0)&r|a&~r)+t[3]-187363961|0)<<14|l>>>18)+s|0)&a|s&~a)+t[8]+1163531501|0)<<20|r>>>12)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r&s|l&~s)+t[13]-1444681467|0)<<5|a>>>27)+r|0)&l|r&~l)+t[2]-51403784|0)<<9|s>>>23)+a|0)&r|a&~r)+t[7]+1735328473|0)<<14|l>>>18)+s|0)&a|s&~a)+t[12]-1926607734|0)<<20|r>>>12)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r^l^s)+t[5]-378558|0)<<4|a>>>28)+r|0)^r^l)+t[8]-2022574463|0)<<11|s>>>21)+a|0)^a^r)+t[11]+1839030562|0)<<16|l>>>16)+s|0)^s^a)+t[14]-35309556|0)<<23|r>>>9)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r^l^s)+t[1]-1530992060|0)<<4|a>>>28)+r|0)^r^l)+t[4]+1272893353|0)<<11|s>>>21)+a|0)^a^r)+t[7]-155497632|0)<<16|l>>>16)+s|0)^s^a)+t[10]-1094730640|0)<<23|r>>>9)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r^l^s)+t[13]+681279174|0)<<4|a>>>28)+r|0)^r^l)+t[0]-358537222|0)<<11|s>>>21)+a|0)^a^r)+t[3]-722521979|0)<<16|l>>>16)+s|0)^s^a)+t[6]+76029189|0)<<23|r>>>9)+l|0,r=((r+=((l=((l+=((s=((s+=((a=((a+=(r^l^s)+t[9]-640364487|0)<<4|a>>>28)+r|0)^r^l)+t[12]-421815835|0)<<11|s>>>21)+a|0)^a^r)+t[15]+530742520|0)<<16|l>>>16)+s|0)^s^a)+t[2]-995338651|0)<<23|r>>>9)+l|0,r=((r+=((s=((s+=(r^((a=((a+=(l^(r|~s))+t[0]-198630844|0)<<6|a>>>26)+r|0)|~l))+t[7]+1126891415|0)<<10|s>>>22)+a|0)^((l=((l+=(a^(s|~r))+t[14]-1416354905|0)<<15|l>>>17)+s|0)|~a))+t[5]-57434055|0)<<21|r>>>11)+l|0,r=((r+=((s=((s+=(r^((a=((a+=(l^(r|~s))+t[12]+1700485571|0)<<6|a>>>26)+r|0)|~l))+t[3]-1894986606|0)<<10|s>>>22)+a|0)^((l=((l+=(a^(s|~r))+t[10]-1051523|0)<<15|l>>>17)+s|0)|~a))+t[1]-2054922799|0)<<21|r>>>11)+l|0,r=((r+=((s=((s+=(r^((a=((a+=(l^(r|~s))+t[8]+1873313359|0)<<6|a>>>26)+r|0)|~l))+t[15]-30611744|0)<<10|s>>>22)+a|0)^((l=((l+=(a^(s|~r))+t[6]-1560198380|0)<<15|l>>>17)+s|0)|~a))+t[13]+1309151649|0)<<21|r>>>11)+l|0,r=((r+=((s=((s+=(r^((a=((a+=(l^(r|~s))+t[4]-145523070|0)<<6|a>>>26)+r|0)|~l))+t[11]-1120210379|0)<<10|s>>>22)+a|0)^((l=((l+=(a^(s|~r))+t[2]+718787259|0)<<15|l>>>17)+s|0)|~a))+t[9]-343485551|0)<<21|r>>>11)+l|0,e[0]=a+e[0]|0,e[1]=r+e[1]|0,e[2]=l+e[2]|0,e[3]=s+e[3]|0}function r(e){var t,a=[];for(t=0;t<64;t+=4)a[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return a}function l(e){var t,a=[];for(t=0;t<64;t+=4)a[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return a}function s(e){var t,l,s,n,o,i,u=e.length,c=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=u;t+=64)a(c,r(e.substring(t-64,t)));for(l=(e=e.substring(t-64)).length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<l;t+=1)s[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(s[t>>2]|=128<<(t%4<<3),t>55)for(a(c,s),t=0;t<16;t+=1)s[t]=0;return n=(n=8*u).toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(n[2],16),i=parseInt(n[1],16)||0,s[14]=o,s[15]=i,a(c,s),c}function n(e){var t,r,s,n,o,i,u=e.length,c=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=u;t+=64)a(c,l(e.subarray(t-64,t)));for(r=(e=t-64<u?e.subarray(t-64):new Uint8Array(0)).length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<r;t+=1)s[t>>2]|=e[t]<<(t%4<<3);if(s[t>>2]|=128<<(t%4<<3),t>55)for(a(c,s),t=0;t<16;t+=1)s[t]=0;return n=(n=8*u).toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(n[2],16),i=parseInt(n[1],16)||0,s[14]=o,s[15]=i,a(c,s),c}function o(e){var a,r="";for(a=0;a<4;a+=1)r+=t[e>>8*a+4&15]+t[e>>8*a&15];return r}function i(e){var t;for(t=0;t<e.length;t+=1)e[t]=o(e[t]);return e.join("")}function u(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),e}function c(e,t){var a,r=e.length,l=new ArrayBuffer(r),s=new Uint8Array(l);for(a=0;a<r;a+=1)s[a]=e.charCodeAt(a);return t?s:l}function f(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function h(e,t,a){var r=new Uint8Array(e.byteLength+t.byteLength);return r.set(new Uint8Array(e)),r.set(new Uint8Array(t),e.byteLength),a?r:r.buffer}function p(e){var t,a=[],r=e.length;for(t=0;t<r-1;t+=2)a.push(parseInt(e.substr(t,2),16));return String.fromCharCode.apply(String,a)}function d(){this.reset()}return i(s("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function t(e,t){return(e=0|e||0)<0?Math.max(e+t,0):Math.min(e,t)}ArrayBuffer.prototype.slice=function(a,r){var l,s,n,o,i=this.byteLength,u=t(a,i),c=i;return r!==e&&(c=t(r,i)),u>c?new ArrayBuffer(0):(l=c-u,s=new ArrayBuffer(l),n=new Uint8Array(s),o=new Uint8Array(this,u,l),n.set(o),s)}}(),d.prototype.append=function(e){return this.appendBinary(u(e)),this},d.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,l=this._buff.length;for(t=64;t<=l;t+=64)a(this._hash,r(this._buff.substring(t-64,t)));return this._buff=this._buff.substring(t-64),this},d.prototype.end=function(e){var t,a,r=this._buff,l=r.length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<l;t+=1)s[t>>2]|=r.charCodeAt(t)<<(t%4<<3);return this._finish(s,l),a=i(this._hash),e&&(a=p(a)),this.reset(),a},d.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},d.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},d.prototype.setState=function(e){return this._buff=e.buff,this._length=e.length,this._hash=e.hash,this},d.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},d.prototype._finish=function(e,t){var r,l,s,n=t;if(e[n>>2]|=128<<(n%4<<3),n>55)for(a(this._hash,e),n=0;n<16;n+=1)e[n]=0;r=(r=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),l=parseInt(r[2],16),s=parseInt(r[1],16)||0,e[14]=l,e[15]=s,a(this._hash,e)},d.hash=function(e,t){return d.hashBinary(u(e),t)},d.hashBinary=function(e,t){var a=i(s(e));return t?p(a):a},d.ArrayBuffer=function(){this.reset()},d.ArrayBuffer.prototype.append=function(e){var t,r=h(this._buff.buffer,e,!0),s=r.length;for(this._length+=e.byteLength,t=64;t<=s;t+=64)a(this._hash,l(r.subarray(t-64,t)));return this._buff=t-64<s?new Uint8Array(r.buffer.slice(t-64)):new Uint8Array(0),this},d.ArrayBuffer.prototype.end=function(e){var t,a,r=this._buff,l=r.length,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<l;t+=1)s[t>>2]|=r[t]<<(t%4<<3);return this._finish(s,l),a=i(this._hash),e&&(a=p(a)),this.reset(),a},d.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},d.ArrayBuffer.prototype.getState=function(){var e=d.prototype.getState.call(this);return e.buff=f(e.buff),e},d.ArrayBuffer.prototype.setState=function(e){return e.buff=c(e.buff,!0),d.prototype.setState.call(this,e)},d.ArrayBuffer.prototype.destroy=d.prototype.destroy,d.ArrayBuffer.prototype._finish=d.prototype._finish,d.ArrayBuffer.hash=function(e,t){var a=i(n(new Uint8Array(e)));return t?p(a):a},d}();const W={onShow:function(){C()>0?I({index:2,text:"···"}):S({index:2})}};var G=E(Object.assign(W,{setup(n){const o=B(),c=y((()=>o.state.user.userInfo)).value;let f=m(""),h=m(0),C=m(0),I=m([]),S=m("暂停"),q=m(!1),E=m(!1),D=m(!1),W=m(!1),G=m(""),J=m([]),K=m([]);m(0),m(0);const Q=()=>{console.log("去调用接口合并文件");const{avatar:e,username:t}=c;(e=>d("/files/mergeFile","POST",e))({hash:G.value,title:re.title,hobby:re.hobby,fileType:re.fileType,content:re.content,avatar:e,username:t}).then((e=>{console.log("data===",e),q.value=!1,W.value=!1}))},X=async()=>{q.value=!0,K.value=[],console.log("partList.value=",J.value),J.value.forEach(((e,t)=>{K.value.push((()=>((e,t)=>new Promise(((a,r)=>{const l=URL.createObjectURL(e.chunk);console.log("blobUrl===",l),P({url:"/prod/files/uploadLargeFile",filePath:l,name:"file",fileType:"video",formData:{filename:e.filename},success:e=>{console.log("uploadFileRes===",e);const{statusCode:r}=e;if(console.log("index================================",t),200===r){let e=J.value;const t=e.splice(0,1);I.value.push(t),J.value=[...e],console.log("partList=",J),console.log("cutPartslength=",I.value.length),console.log("partListLength=",C.value),h.value=(I.value.length/C.value*100).toFixed(2),a(!0)}else a(!1)},fail:e=>{console.log("err=",e)}})})))(e,t)))}));let e=0;const t=async()=>{if(!D.value)if(console.log("abort",D.value),console.log("requestList.value===",K.value),e>=K.value.length)Q();else try{const a=await K.value[e]();console.log("isStep=",a),a&&e++,t()}catch(a){throw new Error("err happened")}};t()},Y=()=>{V({sourceType:["camera","album"],success:function(e){console.log("res===",e),f.value=e.tempFilePath,E.value=!0,(async e=>{console.log("tempFiles===",e),W.value=!0;const t=await z(e,"buffer"),a=new Z.ArrayBuffer;let r;a.append(t),G.value=a.end(),r=/\.([0-9a-zA-Z]+)$/i.exec(e.name)[1];const l=524288;let s=0;C.value=Math.ceil(e.size/l),console.log("partListLength=",C.value);for(let n=0;n<C.value;n++){let t={chunk:e.slice(s,s+l),filename:`${G.value}_${n}_.${r}`};s+=l,J.value.push(t)}X()})(e.tempFile)}})},ee=()=>{E.value?(S.value="继续",E.value=!1,D.value=!0):(S.value="暂停",E.value=!0,D.value=!1,X())};m(""),m(0);const te=async e=>{if(console.log("image=",e),!e)return;const{tempFilePaths:t,tempFiles:a}=e;W.value=!0;const r=Object.assign([],a),l=[];for(let c of r){const e=await z(c,"base64");l.push({filename:c.name,chunk:e})}const s=await z(a[0],"buffer"),n=new Z.ArrayBuffer;n.append(s);const o=n.end(),{avatar:i,username:u}=c;var f;(f=N.stringify({fileAll:l,hash:o,title:re.title,hobby:parseInt(re.hobby),fileType:re.fileType,content:re.content,avatar:i,username:u}),d("/files/uploadImage","POST",f,"application/x-www-form-urlencoded")).then((e=>{console.log("data===",e);const{data:{code:t}}=e;200===t&&(h.value=100,W.value=!1)}))},ae=m(null);let re=g({title:"",hobby:"",fileType:"",content:""}),le={title:{rules:[{required:!0,errorMessage:"请输入标题"}]},hobby:{rules:[{required:!0,errorMessage:"请选择兴趣"}]},fileType:{rules:[{required:!0,errorMessage:"请选择文件类型"}]},content:{rules:[{required:!0,errorMessage:"请输入正文内容"}]}},se=m(""),ne=m(""),oe=m(""),ie=m(""),ue=g([{value:0,text:"狼人杀",disable:!1},{value:1,text:"剧本杀",disable:!1},{value:2,text:"登山",disable:!1},{value:3,text:"旅游",disable:!1},{value:4,text:"视频",disable:!1}]),ce=m([{value:0,text:"图片",disable:!1},{value:1,text:"视频",disable:!1}]);const fe=e=>{console.log("e=",e);const{detail:{value:t}}=e;oe.value=t,ae.value.setValue("hobby",t)},he=e=>{const{detail:{value:t}}=e;ie.value=t,ae.value.setValue("fileType",t)},pe=()=>{ae.value.validate().then((e=>{console.log("表单数据信息：",e);const{fileType:t,title:a,content:r,hobby:l}=e;re.content=r,re.title=a,re.fileType=t,re.hobby=l,0===t?(async()=>{M({count:6,sizeType:["original","compressed"],sourceType:["album"],success:function(e){te(e)}})})():Y()})).catch((e=>{console.log("表单错误信息：",e)}))};return v((()=>oe.value),(e=>{switch(console.log("state=",e),e){case 0:case 1:ce.value=[{value:0,text:"图片",disable:!1}];break;case 2:case 3:ce.value=[{value:0,text:"图片",disable:!1},{value:1,text:"视频",disable:!1}];break;case 4:ce.value=[{value:1,text:"视频",disable:!1}]}}),{deep:!0}),(n,o)=>{const c=j(e("uni-easyinput"),R),f=j(e("uni-forms-item"),H),d=p,y=U,m=A,g=L,v=F,C=j(e("uni-forms"),O),I=T,B=$;return t(),a(d,{class:"share-wraper"},{default:r((()=>[s(' <uni-file-picker\r\n      file-mediatype="all"\r\n      @select="onSelect"\r\n      @progress="onProgress"\r\n      @success="success"\r\n      @fail="fail"\r\n    >\r\n      <button>选择文件</button>\r\n    </uni-file-picker> '),s(' <view class="progress-large-file"> '),s(" </view> "),s(' <progress :percent="80" active :fontSize="24" activeColor="#00f" show-info stroke-width="3"/> '),s(' <view>\r\n      <button @tap="uploadVideo">上传视频</button>\r\n      <video :src="src"></video>\r\n    </view> '),s(' <view>\r\n      <uni-file-picker\r\n        file-mediatype="image"\r\n        @select="onSelectImage"\r\n        @progress="progressImages"\r\n        @success="successImage"\r\n        @fail="failImage"\r\n      >\r\n        <button>选择图片</button>\r\n      </uni-file-picker>\r\n      <progress\r\n        :percent="progressImage"\r\n        active\r\n        :fontSize="24"\r\n        activeColor="#00f"\r\n        show-info\r\n        stroke-width="3"\r\n      />\r\n    </view> '),l(C,{ref_key:"form",ref:ae,modelValue:b(re),rules:b(le)},{default:r((()=>[l(d,{class:"info-item"},{default:r((()=>[l(f,{required:"",label:"标    题：",name:"title","label-width":"80"},{default:r((()=>[l(c,{modelValue:b(se),"onUpdate:modelValue":o[0]||(o[0]=e=>_(se)?se.value=e:se=e),placeholder:"请输入标题"},null,8,["modelValue"])])),_:1})])),_:1}),l(d,{class:"info-item"},{default:r((()=>[s(' <view class="title-wraper">\r\n          <text class="title">个人签名</text>\r\n        </view> '),l(f,{required:"",label:"兴    趣：",name:"hobby","label-width":"80"},{default:r((()=>[s(' <uni-data-checkbox\r\n            :value="hobby"\r\n            :multiple="false"\r\n            :localdata="hobbys"\r\n            @change="hobbyChange"\r\n          ></uni-data-checkbox> '),l(v,{class:"uni-list",onChange:fe},{default:r((()=>[(t(!0),i(u,null,x(b(ue),((e,s)=>(t(),a(g,{class:"uni-list-cell uni-list-cell-pd",key:s},{default:r((()=>[l(d,null,{default:r((()=>[l(y,{id:e.value,value:e.value},null,8,["id","value"])])),_:2},1024),l(d,null,{default:r((()=>[l(g,{class:"label-2-text",for:e.value},{default:r((()=>[l(m,null,{default:r((()=>[w(k(e.text),1)])),_:2},1024)])),_:2},1032,["for"])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),l(d,{class:"info-item"},{default:r((()=>[l(f,{required:"",label:"文件类型：",name:"fileType","label-width":"80"},{default:r((()=>[s(' <uni-data-checkbox\r\n            :multiple="false"\r\n            :value="fileType"\r\n            :localdata="fileTypes"\r\n            @change="typeChange"\r\n          ></uni-data-checkbox> '),l(v,{class:"uni-list",onChange:he},{default:r((()=>[(t(!0),i(u,null,x(b(ce),(e=>(t(),a(g,{class:"uni-list-cell uni-list-cell-pd",key:e.value},{default:r((()=>[l(d,null,{default:r((()=>[l(y,{id:e.value,value:e.value},null,8,["id","value"])])),_:2},1024),l(d,null,{default:r((()=>[l(g,{class:"label-2-text",for:e.value},{default:r((()=>[l(m,null,{default:r((()=>[w(k(e.text),1)])),_:2},1024)])),_:2},1032,["for"])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),l(d,{class:"info-item"},{default:r((()=>[l(f,{required:"",label:"内    容：",name:"content","label-width":"80"},{default:r((()=>[l(c,{type:"textarea",maxlength:-1,autoHeight:"",modelValue:b(ne),"onUpdate:modelValue":o[1]||(o[1]=e=>_(ne)?ne.value=e:ne=e),placeholder:"请输入正文内容"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["modelValue","rules"]),l(I,{onClick:pe,type:"primary"},{default:r((()=>[w("上传分享")])),_:1}),b(W)?(t(),a(B,{key:0,percent:b(h),fontSize:24,activeColor:"#00f","show-info":"","stroke-width":"12"},null,8,["percent"])):s("v-if",!0),l(d,{class:"upload-text"},{default:r((()=>[b(q)?(t(),a(m,{key:0,onClick:ee},{default:r((()=>[w(k(b(S)),1)])),_:1})):s("v-if",!0)])),_:1})])),_:1})}}}),[["__scopeId","data-v-63719fd3"]]);export{G as default};
//# sourceMappingURL=pages-find-index.dd8c2b9e.js.map