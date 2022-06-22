"use strict";
var utils_request = require("../utils/request.js");
const getPublish = (params) => {
  console.log("params===", params);
  return utils_request.request(`/publishs/getPublish`, "GET", params);
};
const deletePublish = (params) => {
  return utils_request.request(`/publishs/deletePublish`, "POST", params);
};
const updatePublish = (params) => {
  return utils_request.request(`/publishs/updatePublish`, "POST", params, "application/x-www-form-urlencoded");
};
const updateVideoPublish = (params) => {
  return utils_request.request(`/publishs/updateVideoPublish`, "POST", params);
};
const getMylikes = (params) => {
  console.log("params===", params);
  return utils_request.request(`/publishs/getMylikes`, "GET", params);
};
exports.deletePublish = deletePublish;
exports.getMylikes = getMylikes;
exports.getPublish = getPublish;
exports.updatePublish = updatePublish;
exports.updateVideoPublish = updateVideoPublish;
//# sourceMappingURL=publish.js.map
