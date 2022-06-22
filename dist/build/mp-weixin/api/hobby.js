"use strict";var e=require("../utils/request.js");exports.getHobbyDetail=t=>e.request("/files/getHobbyDetail","GET",t),exports.getHobbyList=t=>(console.log("params=",t),e.request("/files/getHobbyList","GET",t)),exports.getVideoList=t=>e.request("/users/getVideoList","GET",t),exports.videoDetail=t=>e.request("/users/getVideoDetail","GET",t);
//# sourceMappingURL=hobby.js.map
