"use strict";var r=require("../utils/request.js");const u=e=>r.request("/files/uploadImage","POST",e,"application/x-www-form-urlencoded"),s=e=>r.request("/files/mergeFile","POST",e);exports.mergeFile=s;exports.uploadImage=u;
//# sourceMappingURL=file.js.map
