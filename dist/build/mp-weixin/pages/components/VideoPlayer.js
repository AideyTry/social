"use strict";var o=require("../../common/vendor.js");const e={props:{options:{type:Object,default:{}}},setup(e){const s=e,t=o.reactive({src:"",poster:""});return o.onMounted((()=>{console.log("props.options=",s.options),t.src=s.options.src||"",t.poster=s.options.poster||""})),(e,s)=>({a:o.unref(t).src,b:o.unref(t).poster})}};var s=o._export_sfc(e,[["__scopeId","data-v-facd1866"]]);wx.createComponent(s);
//# sourceMappingURL=VideoPlayer.js.map
