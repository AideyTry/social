"use strict";var t=require("../utils/request.js");const s=e=>t.request("/communications/getFollows","GET",e),n=e=>t.request("/communications/getFans","GET",e),o=e=>t.request("/communications/setLike","POST",e);exports.getFans=n;exports.getFollows=s;exports.setLike=o;
//# sourceMappingURL=communication.js.map
