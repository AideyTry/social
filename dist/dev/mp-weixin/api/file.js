"use strict";
var utils_request = require("../utils/request.js");
const uploadImage = (params) => {
  return utils_request.request(`/files/uploadImage`, "POST", params, "application/x-www-form-urlencoded");
};
const mergeFile = (params) => {
  return utils_request.request(`/files/mergeFile`, "POST", params);
};
exports.mergeFile = mergeFile;
exports.uploadImage = uploadImage;
//# sourceMappingURL=file.js.map
