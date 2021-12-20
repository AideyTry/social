"use strict";
var common_vendor = require("../common/vendor.js");
var utils_auth = require("./auth.js");
function showLoading(title) {
  common_vendor.index.showLoading({
    title: title || "\u52A0\u8F7D\u4E2D..."
  });
}
function hideLoading() {
  common_vendor.index.hideLoading();
}
function showToast(title) {
  common_vendor.index.showToast({
    title,
    icon: "none",
    duration: 2e3
  });
}
const request = (url, method, data = {}) => {
  return new Promise((resolve, reject) => {
    showLoading();
    common_vendor.index.request({
      url,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        "token": utils_auth.getToken()
      },
      success: (res) => {
        resolve(res);
        showToast("\u6210\u529F");
      },
      fail: (err) => {
        showToast("\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25");
        reject(err);
      },
      complete: () => {
        hideLoading();
      }
    });
  });
};
exports.request = request;
