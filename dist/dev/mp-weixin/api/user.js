"use strict";var s=require("../utils/request.js");const r=e=>(console.log("send params=",e),s.request("/users/sendCodeTencent","POST",e)),n=e=>s.request("/users/codePhoneLogin","POST",e),o=e=>s.request("/users/setGender","POST",e),t=()=>s.request("/users/userInfo","GET"),u=e=>s.request("/users/frendInfo","GET",e),d=e=>s.request("/users/getSchool","GET",e),c=e=>(console.log("params=e==",e),s.request("/users/editUserInfo","POST",JSON.stringify(e.form))),g=e=>s.request("/users/exampleLogin","POST",e);exports.codePhoneLogin=n;exports.editUserInfo=c;exports.exampleLogin=g;exports.getFrendInfo=u;exports.getSchool=d;exports.getUserInfo=t;exports.sendCode=r;exports.setGender=o;
//# sourceMappingURL=user.js.map
