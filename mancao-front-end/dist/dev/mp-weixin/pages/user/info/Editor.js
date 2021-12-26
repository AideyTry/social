"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  setup(__props) {
    const defaultAvatar = "/static/images/default_avatar.png";
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed(() => store.state.user.userInfo).value;
    let images = common_vendor.reactive(userInfo.photos);
    const quantity = (images2) => {
      const arr = images2.filter((item) => item);
      return arr.length;
    };
    console.log("images===", images);
    const avatar = common_vendor.ref(userInfo.avatar);
    const chooseImage = (index) => {
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          console.log("chooseImageRes===", chooseImageRes);
          const { tempFilePaths, tempFiles } = chooseImageRes;
          console.log("tempFilePaths[0]===", tempFilePaths[0]);
          images[index] = tempFilePaths[0];
          console.log("images===", images);
        }
      });
    };
    const onUpload = (item, index) => {
      console.log("item, index===", item, index);
      if (item) {
        let itemList = ["\u7F16\u8F91"];
        if (index > 0) {
          itemList = ["\u8BBE\u4E3A\u5934\u50CF", "\u7F16\u8F91", "\u5220\u9664"];
        }
        common_vendor.index.showActionSheet({
          itemList,
          success: function(res) {
            console.log("\u9009\u4E2D\u4E86\u7B2C" + (res.tapIndex + 1) + "\u4E2A\u6309\u94AE");
            if (res.tapIndex === 0) {
              images[index] = images[0];
              images[0] = item;
              avatar.value = item;
            }
            if (res.tapIndex === 1) {
              chooseImage(index);
            }
          },
          fail: function(res) {
            console.log(res.errMsg);
          }
        });
        return;
      }
      chooseImage(index);
    };
    const getDate = (type) => {
      const date2 = new Date();
      let year = date2.getFullYear();
      let month = date2.getMonth() + 1;
      let day = date2.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    };
    const currentDate = getDate({
      format: true
    });
    console.log("currentDate===", currentDate);
    let date = common_vendor.ref(currentDate);
    let startDate = getDate("start");
    let endDate = getDate("end");
    const bindDateChange = (e) => {
      date.value = e.detail.value;
      console.log("date======", date.value);
    };
    const onLocation = () => {
      common_vendor.index.chooseLocation({
        success: function(res) {
          console.log("\u4F4D\u7F6E\u540D\u79F0\uFF1A" + res.name);
          console.log("\u8BE6\u7EC6\u5730\u5740\uFF1A" + res.address);
          console.log("\u7EAC\u5EA6\uFF1A" + res.latitude);
          console.log("\u7ECF\u5EA6\uFF1A" + res.longitude);
        }
      });
    };
    const gender = common_vendor.ref("1");
    const changeGender = () => {
      common_vendor.index.showActionSheet({
        itemList: ["\u7537", "\u5973"],
        success: function(res) {
          console.log("\u9009\u4E2D\u4E86\u7B2C" + (res.tapIndex + 1) + "\u4E2A\u6309\u94AE");
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: avatar.value ? avatar.value : defaultAvatar,
        b: common_vendor.t(quantity(common_vendor.unref(images))),
        c: common_vendor.t(common_vendor.unref(images).length),
        d: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return common_vendor.e({
            a: item ? item : defaultAvatar,
            b: !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0]
          }, !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0] ? {} : {}, {
            c: common_vendor.o(($event) => onUpload(item, index)),
            d: index
          });
        }),
        e: common_vendor.t(gender.value),
        f: common_vendor.o(changeGender),
        g: common_vendor.t(common_vendor.unref(date)),
        h: common_vendor.unref(date),
        i: common_vendor.unref(startDate),
        j: common_vendor.unref(endDate),
        k: common_vendor.o(bindDateChange),
        l: common_vendor.o(onLocation)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-53251d4e"]]);
wx.createPage(MiniProgramPage);
