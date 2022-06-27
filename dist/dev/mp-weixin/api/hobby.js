"use strict";var t=require("../utils/request.js");const s=e=>t.request("/users/getVideoList","GET",e),i=e=>(console.log("params=",e),t.request("/files/getHobbyList","GET",e)),r=e=>t.request("/files/getHobbyDetail","GET",e);exports.getHobbyDetail=r;exports.getHobbyList=i;exports.getVideoList=s;
//# sourceMappingURL=hobby.js.map
