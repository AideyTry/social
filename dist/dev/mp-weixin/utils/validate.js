"use strict";const l=e=>{console.log("obj=====",e);const o=Object.keys(e).map(r=>e[r]);return console.log("arr===",o),o.every(r=>r||r===0)},t=e=>(console.log("obj===",e),console.log("obj['gender']=",e.gender),e.gender?(console.log("true"),!0):(console.log("false"),!1));exports.validataGender=t;exports.validateObjAttr=l;
//# sourceMappingURL=validate.js.map
