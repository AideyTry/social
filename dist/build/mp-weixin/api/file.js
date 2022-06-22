"use strict";var e=require("../utils/request.js");exports.mergeFile=r=>e.request("/files/mergeFile","POST",r),exports.uploadImage=r=>e.request("/files/uploadImage","POST",r,"application/x-www-form-urlencoded");
//# sourceMappingURL=file.js.map
