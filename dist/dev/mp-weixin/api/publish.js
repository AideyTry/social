"use strict";var s=require("../utils/request.js");const t=e=>(console.log("params===",e),s.request("/publishs/getPublish","GET",e)),u=e=>(console.log("params===",e),s.request("/publishs/getMylikes","GET",e));exports.getMylikes=u;exports.getPublish=t;
//# sourceMappingURL=publish.js.map
