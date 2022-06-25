"use strict";var r=require("../../../../common/vendor.js");const s={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm"],model:{prop:"modelValue",event:"update:modelValue"},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default(){return{color:"#333",disableColor:"#F7F6F6",borderColor:"#e5e5e5"}}},errorMessage:{type:[String,Boolean],default:""}},data(){return{focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}},computed:{msg(){return this.errorMessage||this.errMsg},inputMaxlength(){return Number(this.maxlength)}},watch:{value(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},modelValue(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},focus(t){this.$nextTick(()=>{this.focused=this.focus})}},created(){this.value||(this.val=this.modelValue),this.modelValue||(this.val=this.value),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.val)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted(){this.$nextTick(()=>{this.focused=this.focus})},methods:{init(){},onClickIcon(t){this.$emit("iconClick",t)},getForm(t="uniForms"){let l=this.$parent,e=l.$options.name;for(;e!==t;){if(l=l.$parent,!l)return!1;e=l.$options.name}return l},onEyes(){this.showPassword=!this.showPassword},onInput(t){let l=t.detail.value;this.trim&&(typeof this.trim=="boolean"&&this.trim&&(l=this.trimStr(l)),typeof this.trim=="string"&&(l=this.trimStr(l,this.trim))),this.errMsg&&(this.errMsg=""),this.val=l,this.$emit("input",l),this.$emit("update:modelValue",l)},onFocus(t){this.$emit("focus",t)},onBlur(t){t.detail.value,this.$emit("blur",t)},onConfirm(t){this.$emit("confirm",t.detail.value)},onClear(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue","")},fieldClick(){this.$emit("click")},trimStr(t,l="both"){return l==="both"?t.trim():l==="left"?t.trimLeft():l==="right"?t.trimRight():l==="start"?t.trimStart():l==="end"?t.trimEnd():l==="all"?t.replace(/\s+/g,""):t}}};Array||r.resolveComponent("uni-icons")();const o=()=>"../../../uni-icons/components/uni-icons/uni-icons.js";Math||o();function u(t,l,e,f,a,i){return r.e({a:e.prefixIcon},e.prefixIcon?{b:r.o$1(n=>i.onClickIcon("prefix")),c:r.p({type:e.prefixIcon,color:"#c0c4cc"})}:{},{d:e.type==="textarea"},e.type==="textarea"?{e:e.inputBorder?1:"",f:e.name,g:a.val,h:e.placeholder,i:e.placeholderStyle,j:e.disabled,k:i.inputMaxlength,l:a.focused,m:e.autoHeight,n:r.o$1((...n)=>i.onInput&&i.onInput(...n)),o:r.o$1((...n)=>i.onBlur&&i.onBlur(...n)),p:r.o$1((...n)=>i.onFocus&&i.onFocus(...n)),q:r.o$1((...n)=>i.onConfirm&&i.onConfirm(...n))}:{r:e.type==="password"?"text":e.type,s:e.type==="password"||e.clearable||e.prefixIcon?"":"10px",t:e.prefixIcon?"":"10px",v:e.name,w:a.val,x:!a.showPassword&&e.type==="password",y:e.placeholder,z:e.placeholderStyle,A:e.disabled,B:i.inputMaxlength,C:a.focused,D:e.confirmType,E:r.o$1((...n)=>i.onFocus&&i.onFocus(...n)),F:r.o$1((...n)=>i.onBlur&&i.onBlur(...n)),G:r.o$1((...n)=>i.onInput&&i.onInput(...n)),H:r.o$1((...n)=>i.onConfirm&&i.onConfirm(...n))},{I:e.type==="password"&&e.passwordIcon},e.type==="password"&&e.passwordIcon?r.e({J:a.val!=""},a.val!=""?{K:e.type==="textarea"?1:"",L:r.o$1(i.onEyes),M:r.p({type:a.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc"})}:{}):e.suffixIcon?r.e({O:e.suffixIcon},e.suffixIcon?{P:r.o$1(n=>i.onClickIcon("suffix")),Q:r.p({type:e.suffixIcon,color:"#c0c4cc"})}:{}):r.e({R:e.clearable&&a.val&&!e.disabled},e.clearable&&a.val&&!e.disabled?{S:e.type==="textarea"?1:"",T:r.o$1(i.onClear),U:r.p({type:"clear",size:e.clearSize,color:"#c0c4cc"})}:{}),{N:e.suffixIcon,V:e.inputBorder?1:"",W:e.inputBorder&&i.msg?1:"",X:e.type==="textarea"?1:"",Y:e.disabled?1:"",Z:e.inputBorder&&i.msg?"#dd524d":e.styles.borderColor,aa:e.disabled?e.styles.disableColor:"",ab:i.msg?1:"",ac:e.inputBorder&&i.msg?"#e43d33":e.styles.color})}var c=r._export_sfc(s,[["render",u],["__scopeId","data-v-7365cc42"],["__file","C:/myself/social/social/src/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);wx.createComponent(c);
//# sourceMappingURL=uni-easyinput.js.map
