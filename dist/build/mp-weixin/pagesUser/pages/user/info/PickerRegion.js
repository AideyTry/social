"use strict";var e=require("../../../../common/vendor.js");const r={name:"picker-region"},t=Object.assign(r,{props:{propsProvinceCode:{type:String,default:""},propsCityCode:{type:String,default:""}},emits:["change"],setup(r,{emit:t}){const a=r;e.ref(0);let o=e.ref(a.propsProvinceCode),n=e.ref(a.propsCityCode),i=e.ref(["市辖区"]),c=e.reactive([e.data.province,i.value]),u=e.reactive([0,0]);const v=r=>{const{detail:{value:a}}=r;o.value=e.data.province[a[0]].code,n.value=i.value[a[1]].code,t("change",{provinceCode:o.value,cityCode:n.value})},l=r=>{const{detail:{column:t,value:a}}=r;var o;0===t&&(i.value=(o=e.data.province[a].province,e.data.city.filter((e=>e.province===o))),0===i.value.length&&(i.value=["市辖区"]),c[1]=i.value)};return(r,t)=>({a:e.t(e.unref(o)?`${r.$filters.filterRegion(e.unref(o),e.unref(e.data.province))}/${r.$filters.filterRegion(e.unref(n),e.unref(e.data.city))}`:"请选择省"),b:e.unref(c),c:e.unref(u),d:e.o$1(l),e:e.o$1(v)})}});wx.createComponent(t);
//# sourceMappingURL=PickerRegion.js.map
