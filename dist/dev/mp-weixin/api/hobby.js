"use strict";
var utils_request = require("../utils/request.js");
const getVideoList = (params) => {
  return utils_request.request(`/users/getVideoList`, "GET", params);
};
const videoDetail = (params) => {
  return utils_request.request(`/users/getVideoDetail`, "GET", params);
};
const getHobbyList = (params) => {
  console.log("params=", params);
  return utils_request.request(`/files/getHobbyList`, "GET", params);
};
const getHobbyDetail = (params) => {
  return utils_request.request(`/files/getHobbyDetail`, "GET", params);
};
exports.getHobbyDetail = getHobbyDetail;
exports.getHobbyList = getHobbyList;
exports.getVideoList = getVideoList;
exports.videoDetail = videoDetail;
//# sourceMappingURL=hobby.js.map
