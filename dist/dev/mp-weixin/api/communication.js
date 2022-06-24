"use strict";
var utils_request = require("../utils/request.js");
const setFollow = (params) => {
  return utils_request.request(`/communications/setFollow`, "POST", params);
};
const getFollow = (params) => {
  console.log("params===", params);
  return utils_request.request(`/communications/getFollow`, "GET", params);
};
const deleteFollow = (params) => {
  return utils_request.request(`/communications/deleteFollow`, "POST", params);
};
const getFollows = (params) => {
  return utils_request.request(`/communications/getFollows`, "GET", params);
};
const getFollowsInfo = (params) => {
  return utils_request.request(`/communications/getFollowsInfo`, "POST", params);
};
const getFansInfo = (params) => {
  return utils_request.request(`/communications/getFansInfo`, "POST", params);
};
const getFans = (params) => {
  return utils_request.request(`/communications/getFans`, "GET", params);
};
const setComment = (params) => {
  return utils_request.request(`/communications/setComment`, "POST", params);
};
const getComment = (params) => {
  console.log("params=====================", params);
  return utils_request.request(`/communications/getComment`, "GET", params);
};
const setLike = (params) => {
  return utils_request.request(`/communications/setLike`, "POST", params);
};
exports.deleteFollow = deleteFollow;
exports.getComment = getComment;
exports.getFans = getFans;
exports.getFansInfo = getFansInfo;
exports.getFollow = getFollow;
exports.getFollows = getFollows;
exports.getFollowsInfo = getFollowsInfo;
exports.setComment = setComment;
exports.setFollow = setFollow;
exports.setLike = setLike;
//# sourceMappingURL=communication.js.map
