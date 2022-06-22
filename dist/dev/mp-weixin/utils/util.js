"use strict";
var common_vendor = require("../common/vendor.js");
common_vendor.hooks.updateLocale("en", {
  relativeTime: {
    s: "%d\u79D2\u524D",
    m: "1\u5206\u949F\u524D",
    mm: "%d\u5206\u949F\u524D",
    h: "1\u5C0F\u65F6\u524D",
    hh: "%d\u5C0F\u65F6\u524D",
    d: "1\u5929\u524D",
    dd: "%d\u5929\u524D",
    M: "1\u4E2A\u6708\u524D",
    MM: "%d\u4E2A\u6708\u524D",
    y: "1\u5E74\u524D",
    yy: "%d\u5E74\u524D"
  }
});
function fileParse(file, type = "base64") {
  return new Promise((resolve) => {
    const fileRead = new FileReader();
    if (type === "base64") {
      fileRead.readAsDataURL(file);
    } else if (type === "buffer") {
      fileRead.readAsArrayBuffer(file);
    }
    fileRead.onload = (event) => resolve(event.target.result);
  });
}
function formatDate(createTime) {
  return common_vendor.hooks(createTime).toNow(true);
}
const formatMsgDate = (timestamp) => {
  const week = (w) => {
    switch (w) {
      case "1":
        return "\u4E00";
      case "2":
        return "\u4E8C";
      case "3":
        return "\u4E09";
      case "4":
        return "\u56DB";
      case "5":
        return "\u4E94";
      case "6":
        return "\u516D";
      case "7":
        return "\u65E5";
    }
  };
  if (common_vendor.hooks(timestamp).isSameOrAfter(common_vendor.hooks(), "day")) {
    return common_vendor.hooks(timestamp).format("H:mm");
  } else if (common_vendor.hooks(timestamp).isSameOrAfter(common_vendor.hooks().subtract(1, "day"), "day")) {
    return `\u6628\u5929${common_vendor.hooks(timestamp).format("H:mm")}`;
  } else if (common_vendor.hooks(timestamp).isSameOrAfter(common_vendor.hooks().subtract(7, "day"), "day")) {
    return `\u661F\u671F${week(common_vendor.hooks(timestamp).format("E"))} ${common_vendor.hooks(timestamp).format("H:mm")}`;
  } else {
    return common_vendor.hooks(timestamp).format("YYYY\u5E74M\u6708D\u65E5 H:mm");
  }
};
exports.fileParse = fileParse;
exports.formatDate = formatDate;
exports.formatMsgDate = formatMsgDate;
//# sourceMappingURL=util.js.map
