"use strict";var t=require("../utils/request.js");const o=e=>t.request("/communications/setFollow","POST",e),n=e=>(console.log("params===",e),t.request("/communications/getFollow","GET",e)),s=e=>t.request("/communications/deleteFollow","POST",e),l=e=>t.request("/communications/getFollows","GET",e),r=e=>t.request("/communications/getFollowsInfo","POST",e),u=e=>t.request("/communications/getFansInfo","POST",e),c=e=>t.request("/communications/getFans","GET",e),m=e=>t.request("/communications/setComment","POST",e),i=e=>(console.log("params=====================",e),t.request("/communications/getComment","GET",e)),F=e=>t.request("/communications/setLike","POST",e);exports.deleteFollow=s;exports.getComment=i;exports.getFans=c;exports.getFansInfo=u;exports.getFollow=n;exports.getFollows=l;exports.getFollowsInfo=r;exports.setComment=m;exports.setFollow=o;exports.setLike=F;
//# sourceMappingURL=communication.js.map
