"use strict";var t=require("../utils/request.js");const s=e=>t.request("/users/getVideoList","GET",e),i=e=>t.request("/users/getVideoDetail","GET",e),r=e=>(console.log("params=",e),t.request("/files/getHobbyList","GET",e)),o=e=>t.request("/files/getHobbyDetail","GET",e);exports.getHobbyDetail=o;exports.getHobbyList=r;exports.getVideoList=s;exports.videoDetail=i;
//# sourceMappingURL=hobby.js.map
