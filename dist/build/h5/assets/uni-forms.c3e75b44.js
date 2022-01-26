import{l as e,n as t,F as r,o as i,c as a,w as s,e as l,I as n,L as o,X as h,J as u,M as m,K as d,P as f,Q as g,ag as c,aa as b,af as p}from"./vendor.c1ce6cb1.js";import{_ as y}from"./uni-icons.dba136d1.js";import{r as v}from"./uni-app.es.efb1dce7.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";var x=_({name:"uniFormsItem",props:{custom:{type:Boolean,default:!1},showMessage:{type:Boolean,default:!0},name:String,required:Boolean,validateTrigger:{type:String,default:""},leftIcon:String,iconColor:{type:String,default:"#606266"},label:String,labelWidth:{type:[Number,String],default:""},labelAlign:{type:String,default:""},labelPosition:{type:String,default:""},errorMessage:{type:[String,Boolean],default:""},rules:{type:Array,default:()=>[]}},data:()=>({errorTop:!1,errorBottom:!1,labelMarginBottom:"",errorWidth:"",errMsg:"",val:"",labelPos:"",labelWid:"",labelAli:"",showMsg:"undertext",border:!1,isFirstBorder:!1,isArray:!1,arrayField:""}),computed:{msg(){return this.errorMessage||this.errMsg},fieldStyle(){let e={};return"top"==this.labelPos&&(e.padding="0 0",this.labelMarginBottom="6px"),"left"==this.labelPos&&!1!==this.msg&&""!=this.msg?(e.paddingBottom="0px",this.errorBottom=!0,this.errorTop=!1):"top"==this.labelPos&&!1!==this.msg&&""!=this.msg?(this.errorBottom=!1,this.errorTop=!0):(this.errorTop=!1,this.errorBottom=!1),e},justifyContent(){return"left"===this.labelAli?"flex-start":"center"===this.labelAli?"center":"right"===this.labelAli?"flex-end":void 0},labelLeft(){return("left"===this.labelPos?parseInt(this.labelWid):0)+"px"}},watch:{validateTrigger(e){this.formTrigger=e}},created(){this.form=this.getForm(),this.group=this.getForm("uniGroup"),this.formRules=[],this.formTrigger=this.validateTrigger,this.name&&-1!==this.name.indexOf("[")&&-1!==this.name.indexOf("]")&&(this.isArray=!0,this.arrayField=this.name,this.form.formData[this.name]=this.form._getValue(this.name,""))},mounted(){this.form&&this.form.childrens.push(this),this.init()},unmounted(){this.__isUnmounted=!0,this.unInit()},methods:{init(){if(this.form){let{formRules:e,validator:t,formData:r,value:i,labelPosition:a,labelWidth:s,labelAlign:l,errShowType:n}=this.form;this.labelPos=this.labelPosition?this.labelPosition:a,this.label?this.labelWid=this.labelWidth?this.labelWidth:s||70:this.labelWid=this.labelWidth?this.labelWidth:s||"auto",this.labelWid&&"auto"!==this.labelWid&&(this.labelWid+="px"),this.labelAli=this.labelAlign?this.labelAlign:l,this.form.isFirstBorder||(this.form.isFirstBorder=!0,this.isFirstBorder=!0),this.group&&(this.group.isFirstBorder||(this.group.isFirstBorder=!0,this.isFirstBorder=!0)),this.border=this.form.border,this.showMsg=n;let o=this.isArray?this.arrayField:this.name;if(!o)return;e&&this.rules.length>0&&(e[o]||(e[o]={rules:this.rules}),t.updateSchema(e)),this.formRules=e[o]||{},this.validator=t}else this.labelPos=this.labelPosition||"left",this.labelWid=this.labelWidth||65,this.labelAli=this.labelAlign||"left"},unInit(){this.form&&this.form.childrens.forEach(((e,t)=>{e===this&&(this.form.childrens.splice(t,1),delete this.form.formData[e.name])}))},getForm(e="uniForms"){let t=this.$parent,r=t.$options.name;for(;r!==e;){if(t=t.$parent,!t)return!1;r=t.$options.name}return t},clearValidate(){this.errMsg=""},setValue(e){let t=this.isArray?this.arrayField:this.name;if(t){if(this.errMsg&&(this.errMsg=""),this.form.formData[t]=this.form._getValue(t,e),!this.formRules||(this.formRules,"{}"===JSON.stringify(this.formRules)))return;this.triggerCheck(this.form._getValue(this.name,e))}},async triggerCheck(r,i){if(this.errMsg="",!this.validator||0===Object.keys(this.formRules).length)return;const a=this.isRequired(this.formRules.rules||[]);let s=this.isTrigger(this.formRules.validateTrigger,this.validateTrigger,this.form.validateTrigger),l=null;if(s||i){let e=this.isArray?this.arrayField:this.name;l=await this.validator.validateUpdate({[e]:r},this.form.formData)}a||void 0!==r&&""!==r||(l=null);const n=this.form.inputChildrens.find((e=>e.rename===this.name));return(s||i)&&l&&l.errorMessage?(n&&(n.errMsg=l.errorMessage),"toast"===this.form.errShowType&&e({title:l.errorMessage||"校验错误",icon:"none"}),"modal"===this.form.errShowType&&t({title:"提示",content:l.errorMessage||"校验错误"})):n&&(n.errMsg=""),this.errMsg=l?l.errorMessage:"",this.form.validateCheck(l||null),l||null},isTrigger:(e,t,r)=>!("submit"===e||!e)||void 0===e&&("bind"===t||!t&&"bind"===r),isRequired(e){let t=!1;for(let r=0;r<e.length;r++){if(e[r].required){t=!0;break}}return t}}},[["render",function(e,t,c,b,p,_){const x=f,M=v(r("uni-icons"),y),F=g;return i(),a(F,{class:n(["uni-forms-item",{"uni-forms-item--border":p.border,"is-first-border":p.border&&p.isFirstBorder,"uni-forms-item-error":_.msg}])},{default:s((()=>[l(F,{class:"uni-forms-item__box"},{default:s((()=>[l(F,{class:n(["uni-forms-item__inner",["is-direction-"+p.labelPos]])},{default:s((()=>[l(F,{class:"uni-forms-item__label",style:o({width:p.labelWid,justifyContent:_.justifyContent})},{default:s((()=>[h(e.$slots,"label",{},(()=>[c.required?(i(),a(x,{key:0,class:"is-required"},{default:s((()=>[u("*")])),_:1})):m("v-if",!0),c.leftIcon?(i(),a(M,{key:1,class:"label-icon",size:"16",type:c.leftIcon,color:c.iconColor},null,8,["type","color"])):m("v-if",!0),l(x,{class:"label-text"},{default:s((()=>[u(d(c.label),1)])),_:1}),c.label?(i(),a(F,{key:2,class:"label-seat"})):m("v-if",!0)]),!0)])),_:3},8,["style"]),l(F,{class:n(["uni-forms-item__content",{"is-input-error-border":_.msg}])},{default:s((()=>[h(e.$slots,"default",{},void 0,!0)])),_:3},8,["class"])])),_:3},8,["class"]),_.msg?(i(),a(F,{key:0,class:n(["uni-error-message",{"uni-error-msg--boeder":p.border}]),style:o({paddingLeft:_.labelLeft})},{default:s((()=>[l(x,{class:"uni-error-message-text"},{default:s((()=>[u(d("undertext"===p.showMsg?_.msg:""),1)])),_:1})])),_:1},8,["class","style"])):m("v-if",!0)])),_:3})])),_:3},8,["class"])}],["__scopeId","data-v-3c2b5017"]]),M={email:/^\S+?@\S+?\.\S+?$/,idcard:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,url:new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i")};const F={int:"integer",bool:"boolean",double:"number",long:"number",password:"string"};function w(e,t=""){["label"].forEach((t=>{void 0===e[t]&&(e[t]="")}));let r=t;for(let i in e){let t=new RegExp("{"+i+"}");r=r.replace(t,e[i])}return r}const S={integer:e=>S.number(e)&&parseInt(e,10)===e,string:e=>"string"==typeof e,number:e=>!isNaN(e)&&"number"==typeof e,boolean:function(e){return"boolean"==typeof e},float:function(e){return S.number(e)&&!S.integer(e)},array:e=>Array.isArray(e),object:e=>"object"==typeof e&&!S.array(e),date:e=>e instanceof Date,timestamp(e){return!(!this.integer(e)||Math.abs(e).toString().length>16)},file:e=>"string"==typeof e.url,email:e=>"string"==typeof e&&!!e.match(M.email)&&e.length<255,url:e=>"string"==typeof e&&!!e.match(M.url),pattern(e,t){try{return new RegExp(e).test(t)}catch(r){return!1}},method:e=>"function"==typeof e,idcard:e=>"string"==typeof e&&!!e.match(M.idcard),"url-https"(e){return this.url(e)&&e.startsWith("https://")},"url-scheme":e=>e.startsWith("://"),"url-web":e=>!1};const A={required:(e,t,r)=>e.required&&function(e,t){return null==e||"string"==typeof e&&!e||!(!Array.isArray(e)||e.length)||"object"===t&&!Object.keys(e).length}(t,e.format||typeof t)?w(e,e.errorMessage||r.required):null,range(e,t,r){const{range:i,errorMessage:a}=e;let s=new Array(i.length);for(let n=0;n<i.length;n++){const e=i[n];S.object(e)&&void 0!==e.value?s[n]=e.value:s[n]=e}let l=!1;return Array.isArray(t)?l=new Set(t.concat(s)).size===s.length:s.indexOf(t)>-1&&(l=!0),l?null:w(e,a||r.enum)},rangeNumber(e,t,r){if(!S.number(t))return w(e,e.errorMessage||r.pattern.mismatch);let{minimum:i,maximum:a,exclusiveMinimum:s,exclusiveMaximum:l}=e,n=s?t<=i:t<i,o=l?t>=a:t>a;return void 0!==i&&n?w(e,e.errorMessage||r.number[s?"exclusiveMinimum":"minimum"]):void 0!==a&&o?w(e,e.errorMessage||r.number[l?"exclusiveMaximum":"maximum"]):void 0!==i&&void 0!==a&&(n||o)?w(e,e.errorMessage||r.number.range):null},rangeLength(e,t,r){if(!S.string(t)&&!S.array(t))return w(e,e.errorMessage||r.pattern.mismatch);let i=e.minLength,a=e.maxLength,s=t.length;return void 0!==i&&s<i?w(e,e.errorMessage||r.length.minLength):void 0!==a&&s>a?w(e,e.errorMessage||r.length.maxLength):void 0!==i&&void 0!==a&&(s<i||s>a)?w(e,e.errorMessage||r.length.range):null},pattern:(e,t,r)=>S.pattern(e.pattern,t)?null:w(e,e.errorMessage||r.pattern.mismatch),format(e,t,r){var i=Object.keys(S),a=F[e.format]?F[e.format]:e.format||e.arrayType;return i.indexOf(a)>-1&&!S[a](t)?w(e,e.errorMessage||r.typeError):null},arrayTypeFormat(e,t,r){if(!Array.isArray(t))return w(e,e.errorMessage||r.typeError);for(let i=0;i<t.length;i++){const a=t[i];let s=this.format(e,a,r);if(null!==s)return s}return null}};class k extends class{constructor(e){this._message=e}async validateRule(e,t,r,i,a){var s=null;let l=t.rules;if(l.findIndex((e=>e.required))<0){if(null==r)return s;if("string"==typeof r&&!r.length)return s}var n=this._message;if(void 0===l)return n.default;for(var o=0;o<l.length;o++){let h=l[o],u=this._getValidateType(h);if(Object.assign(h,{label:t.label||`["${e}"]`}),A[u]&&null!=(s=A[u](h,r,n)))break;if(h.validateExpr){let e=Date.now();if(!1===h.validateExpr(r,a,e)){s=this._getMessage(h,h.errorMessage||this._message.default);break}}if(h.validateFunction&&null!==(s=await this.validateFunction(h,r,i,a,u)))break}return null!==s&&(s=n.TAG+s),s}async validateFunction(e,t,r,i,a){let s=null;try{let l=null;const n=await e.validateFunction(e,t,i||r,(e=>{l=e}));(l||"string"==typeof n&&n||!1===n)&&(s=this._getMessage(e,l||n,a))}catch(l){s=this._getMessage(e,l.message,a)}return s}_getMessage(e,t,r){return w(e,t||e.errorMessage||this._message[r]||t.default)}_getValidateType(e){var t="";return e.required?t="required":e.format?t="format":e.arrayType?t="arrayTypeFormat":e.range?t="range":void 0!==e.maximum||void 0!==e.minimum?t="rangeNumber":void 0!==e.maxLength||void 0!==e.minLength?t="rangeLength":e.pattern?t="pattern":e.validateFunction&&(t="validateFunction"),t}}{constructor(e,t){super(k.message),this._schema=e,this._options=t||null}updateSchema(e){this._schema=e}async validate(e,t){let r=this._checkFieldInSchema(e);return r||(r=await this.invokeValidate(e,!1,t)),r.length?r[0]:null}async validateAll(e,t){let r=this._checkFieldInSchema(e);return r||(r=await this.invokeValidate(e,!0,t)),r}async validateUpdate(e,t){let r=this._checkFieldInSchema(e);return r||(r=await this.invokeValidateUpdate(e,!1,t)),r.length?r[0]:null}async invokeValidate(e,t,r){let i=[],a=this._schema;for(let s in a){let l=a[s],n=await this.validateRule(s,l,e[s],e,r);if(null!=n&&(i.push({key:s,errorMessage:n}),!t))break}return i}async invokeValidateUpdate(e,t,r){let i=[];for(let a in e){let s=await this.validateRule(a,this._schema[a],e[a],e,r);if(null!=s&&(i.push({key:a,errorMessage:s}),!t))break}return i}_checkFieldInSchema(e){var t=Object.keys(e),r=Object.keys(this._schema);if(new Set(t.concat(r)).size===r.length)return"";var i=t.filter((e=>r.indexOf(e)<0));return[{key:"invalid",errorMessage:w({field:JSON.stringify(i)},k.message.TAG+k.message.defaultInvalid)}]}}k.message=new function(){return{TAG:"",default:"验证错误",defaultInvalid:"提交的字段{field}在数据库中并不存在",validateFunction:"验证无效",required:"{label}必填",enum:"{label}超出范围",timestamp:"{label}格式无效",whitespace:"{label}不能为空",typeError:"{label}类型无效",date:{format:"{label}日期{value}格式无效",parse:"{label}日期无法解析,{value}无效",invalid:"{label}日期{value}无效"},length:{minLength:"{label}长度不能少于{minLength}",maxLength:"{label}长度不能超过{maxLength}",range:"{label}必须介于{minLength}和{maxLength}之间"},number:{minimum:"{label}不能小于{minimum}",maximum:"{label}不能大于{maximum}",exclusiveMinimum:"{label}不能小于等于{minimum}",exclusiveMaximum:"{label}不能大于等于{maximum}",range:"{label}必须介于{minimum}and{maximum}之间"},pattern:{mismatch:"{label}格式不匹配"}}};var V=_({name:"uniForms",components:{},emits:["input","reset","validate","submit"],props:{value:{type:Object,default:()=>({})},modelValue:{type:Object,default:()=>({})},rules:{type:Object,default:()=>({})},validateTrigger:{type:String,default:""},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:"left"},errShowType:{type:String,default:"undertext"},border:{type:Boolean,default:!1}},data:()=>({formData:{}}),computed:{dataValue(){return"{}"===JSON.stringify(this.modelValue)?this.value:this.modelValue}},watch:{rules(e){this.init(e)},labelPosition(){this.childrens.forEach((e=>{e.init()}))}},created(){c().$vm.$.appContext.config.globalProperties.binddata||(c().$vm.$.appContext.config.globalProperties.binddata=function(e,t,r){if(r)this.$refs[r].setValue(e,t);else{let r;for(let e in this.$refs){const t=this.$refs[e];if(t&&t.$options&&"uniForms"===t.$options.name){r=t;break}}if(!r)return console.error("当前 uni-froms 组件缺少 ref 属性");r.setValue(e,t)}}),this.unwatchs=[],this.childrens=[],this.inputChildrens=[],this.checkboxChildrens=[],this.formRules=[],this.init(this.rules)},methods:{init(e){0!==Object.keys(e).length?(this.formRules=e,this.validator=new k(e),this.registerWatch()):this.formData=this.dataValue},registerWatch(){this.unwatchs.forEach((e=>e())),this.childrens.forEach((e=>{e.init()})),Object.keys(this.dataValue).forEach((e=>{let t=this.$watch("dataValue."+e,(t=>{if(t)if("[object Object]"===t.toString())for(let r in t){let i=`${e}[${r}]`;this.formData[i]=this._getValue(i,t[r])}else this.formData[e]=this._getValue(e,t)}),{deep:!0,immediate:!0});this.unwatchs.push(t)}))},setRules(e){this.init(e)},setValue(e,t,r){let i=this.childrens.find((t=>t.name===e));return i?(t=this._getValue(i.name,t),this.formData[e]=t,i.val=t,i.triggerCheck(t,r)):null},resetForm(e){this.childrens.forEach((e=>{e.errMsg="";const t=this.inputChildrens.find((t=>t.rename===e.name));t&&(t.errMsg="",t.is_reset=!0,t.$emit("input",t.multiple?[]:""),t.$emit("update:modelValue",t.multiple?[]:""))})),this.childrens.forEach((e=>{e.name&&(this.formData[e.name]=this._getValue(e.name,""))})),this.$emit("reset",e)},validateCheck(e){null===e&&(e=null),this.$emit("validate",e)},async validateAll(e,t,r,i){let a,s=[];for(let o in e){const e=this.childrens.find((e=>e.name===o));e&&s.push(e)}i||"function"!=typeof r||(i=r),!i&&"function"!=typeof i&&Promise&&(a=new Promise(((e,t)=>{i=function(r,i){r?t(r):e(i)}})));let l=[],n={};if(this.validator)for(let o in s){const t=s[o];let r=t.isArray?t.arrayField:t.name;if(t.isArray){if(-1!==t.name.indexOf("[")&&-1!==t.name.indexOf("]")){const i=t.name.split("["),a=i[0],s=i[1].replace("]","");n[a]||(n[a]={}),n[a][s]=this._getValue(r,e[r])}}else n[r]=this._getValue(r,e[r]);const i=await t.triggerCheck(e[r],!0);if(i&&(l.push(i),"toast"===this.errShowType||"modal"===this.errShowType))break}else n=e;return Array.isArray(l)&&0===l.length&&(l=null),Array.isArray(r)&&r.forEach((e=>{n[e]=this.dataValue[e]})),"submit"===t?this.$emit("submit",{detail:{value:n,errors:l}}):this.$emit("validate",l),i&&"function"==typeof i&&i(l,n),a&&i?a:null},submitForm(){},submit(e,t,r){for(let i in this.dataValue){this.childrens.find((e=>e.name===i))&&void 0===this.formData[i]&&(this.formData[i]=this._getValue(i,this.dataValue[i]))}return r||console.warn("submit 方法即将废弃，请使用validate方法代替！"),this.validateAll(this.formData,"submit",e,t)},validate(e,t){return this.submit(e,t,!0)},validateField(e,t){e=[].concat(e);let r={};return this.childrens.forEach((t=>{-1!==e.indexOf(t.name)&&(r=Object.assign({},r,{[t.name]:this.formData[t.name]}))})),this.validateAll(r,"submit",[],t)},resetFields(){this.resetForm()},clearValidate(e){e=[].concat(e),this.childrens.forEach((t=>{const r=this.inputChildrens.find((e=>e.rename===t.name));(0===e.length||-1!==e.indexOf(t.name))&&(t.errMsg="",r&&(r.errMsg=""))}))},_getValue(e,t){const r=this.formRules[e]&&this.formRules[e].rules||[],i=r.find((e=>e.format&&this.type_filter(e.format))),a=r.find((e=>e.format&&"boolean"===e.format||"bool"===e.format));return i&&(t=isNaN(t)?t:""===t||null===t?null:Number(t)),a&&(t=!!t),t},type_filter:e=>"int"===e||"double"===e||"number"===e||"timestamp"===e}},[["render",function(e,t,r,o,u,m){const d=p,f=g;return i(),a(f,{class:n(["uni-forms",{"uni-forms--top":!r.border}])},{default:s((()=>[l(d,{onSubmit:b(m.submitForm,["stop"]),onReset:m.resetForm},{default:s((()=>[h(e.$slots,"default",{},void 0,!0)])),_:3},8,["onSubmit","onReset"])])),_:3},8,["class"])}],["__scopeId","data-v-5a2f2c76"]]);export{x as _,V as a};