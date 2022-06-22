"use strict";exports.validataGender=e=>(console.log("obj===",e),console.log("obj['gender']=",e.gender),e.gender?(console.log("true"),!0):(console.log("false"),!1)),exports.validateObjAttr=e=>{console.log("obj=====",e);const o=Object.keys(e).map((o=>e[o]));return console.log("arr===",o),o.every((e=>e||0===e))};
//# sourceMappingURL=validate.js.map
