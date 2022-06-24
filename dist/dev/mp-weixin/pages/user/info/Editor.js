"use strict";
var common_vendor = require("../../../common/vendor.js");
var api_user = require("../../../api/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + PickerRegion + _easycom_uni_forms)();
}
const PickerRegion = () => "./PickerRegion.js";
const _sfc_main = {
  setup(__props) {
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    let formData = common_vendor.reactive({
      avatar: userInfo.avatar,
      username: userInfo.username,
      gender: userInfo.gender,
      birthday: common_vendor.hooks(userInfo.birthday).format("YYYY-MM-DD"),
      location: {
        provinceCode: userInfo.location && userInfo.location.provinceCode,
        cityCode: userInfo.location && userInfo.location.cityCode
      },
      hometown: {
        provinceCode: userInfo.hometown && userInfo.hometown.provinceCode,
        cityCode: userInfo.hometown && userInfo.hometown.cityCode
      },
      schoolName: userInfo.schoolName,
      job: userInfo.job,
      motto: userInfo.motto,
      photos: userInfo.photos
    });
    let rules = {
      username: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u6635\u79F0"
          }
        ]
      }
    };
    common_vendor.index.$on("schoolUpdate", function(data) {
      formData.schoolName = data.schoolName;
    });
    const form = common_vendor.ref(null);
    const submit = (e) => {
      console.log("form=e==", e);
      form.value.validate().then((res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
        const params = {
          form: { ...res, photos: images }
        };
        api_user.editUserInfo(params).then((data) => {
          console.log("data======", data);
          store.dispatch("user/GetUserInfo").then(() => {
            common_vendor.index.navigateTo({
              url: "/pages/user/info/index"
            });
          });
        });
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    };
    const defaultAvatar = "/static/images/default_avatar.png";
    let images = common_vendor.reactive(userInfo.photos);
    common_vendor.watch(images, (images2, old) => {
      console.log("images", images2);
      formData.photos = images2;
    });
    const quantity = (images2) => {
      const arr = images2.filter((item) => item);
      return arr.length;
    };
    console.log("images===", images);
    const avatar = common_vendor.ref(userInfo.avatar);
    common_vendor.watch(avatar, (avatar2, old) => {
      formData.avatar = avatar2;
    });
    const onUploadFile = (index, filePath) => {
      common_vendor.index.uploadFile({
        url: `${{ "BASE_URL": "https://mancao.social/prod" }.BASE_URL}/users/uploadFile`,
        filePath,
        name: "file",
        formData: {
          user: "test"
        },
        success: (uploadFileRes) => {
          console.log("uploadFileRes===", uploadFileRes);
          const { data } = uploadFileRes;
          const imgData = JSON.parse(data);
          console.log("imgData=", imgData);
          images[index] = imgData.url;
          console.log("index===", index);
          if (index === 0) {
            avatar.value = imgData.url;
          }
        }
      });
    };
    const chooseImage = (index) => {
      common_vendor.index.chooseImage({
        success: (chooseImageRes) => {
          console.log("chooseImageRes===", chooseImageRes);
          const { tempFilePaths, tempFiles } = chooseImageRes;
          console.log("tempFilePaths[0]===", tempFilePaths[0]);
          onUploadFile(index, tempFilePaths[0]);
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
              return;
            }
            if (res.tapIndex === 1) {
              chooseImage(index);
              return;
            }
            if (res.tapIndex === 2) {
              images.splice(index, 1);
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
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
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
    let startDate = getDate("start");
    let endDate = getDate("end");
    const bindDateChange = (e) => {
      formData.birthday = e.detail.value;
    };
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
    const onChange = (obj) => {
      console.log("obj=====", obj);
      const { provinceCode, cityCode } = obj;
      formData.location.provinceCode = provinceCode;
      formData.location.cityCode = cityCode;
    };
    const onChangeHome = (obj) => {
      console.log("obj.home=====", obj);
      const { provinceCode, cityCode } = obj;
      formData.hometown.provinceCode = provinceCode;
      formData.hometown.cityCode = cityCode;
    };
    const openSchool = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/info/School"
      });
    };
    let professions = common_vendor.ref([
      "IT/\u4E92\u8054\u7F51/\u901A\u4FE1",
      "\u91D1\u878D",
      "\u5DE5\u4E1A\u5236\u9020\u4E1A",
      "\u6559\u80B2/\u79D1\u7814",
      "\u516C\u5171\u4E8B\u4E1A\u5355\u4F4D",
      "\u533B\u836F/\u5065\u5EB7",
      "\u5A92\u4F53/\u516C\u5173",
      "\u5F71\u89C6/\u5A31\u4E50",
      "\u96F6\u552E",
      "\u9910\u996E/\u9152\u5E97",
      "\u5176\u4ED6"
    ]);
    let activeProfessionIndex = common_vendor.ref(0);
    const changeProfession = (e) => {
      const {
        detail: { value }
      } = e;
      activeProfessionIndex.value = value;
      formData.job = professions["value"][value];
    };
    return (_ctx, _cache) => {
      return {
        a: avatar.value ? avatar.value : defaultAvatar,
        b: common_vendor.p({
          name: "avatar"
        }),
        c: common_vendor.t(quantity(common_vendor.unref(images))),
        d: common_vendor.t(common_vendor.unref(images).length),
        e: common_vendor.f(common_vendor.unref(images), (item, index, i0) => {
          return common_vendor.e({
            a: item ? item : defaultAvatar,
            b: !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0]
          }, !item && common_vendor.unref(images)[index - 1] || index === 0 && !common_vendor.unref(images)[0] ? {} : {}, {
            c: common_vendor.o$1(($event) => onUpload(item, index)),
            d: index
          });
        }),
        f: common_vendor.unref(formData).motto,
        g: common_vendor.o$1(($event) => common_vendor.unref(formData).motto = $event.detail.value),
        h: common_vendor.p({
          name: "motto"
        }),
        i: common_vendor.unref(formData).username,
        j: common_vendor.o$1(($event) => common_vendor.unref(formData).username = $event.detail.value),
        k: common_vendor.p({
          label: "\u6635\u79F0",
          name: "username"
        }),
        l: common_vendor.t(_ctx.$filters.filterGender(common_vendor.unref(userInfo).gender)),
        m: common_vendor.o$1(changeGender),
        n: common_vendor.p({
          label: "\u6027\u522B",
          name: "gender"
        }),
        o: common_vendor.t(common_vendor.unref(formData).birthday),
        p: common_vendor.unref(formData).birthday,
        q: common_vendor.unref(startDate),
        r: common_vendor.unref(endDate),
        s: common_vendor.o$1(bindDateChange),
        t: common_vendor.p({
          label: "\u51FA\u751F\u65E5\u671F",
          name: "birthday"
        }),
        v: common_vendor.o$1(onChange),
        w: common_vendor.p({
          propsProvinceCode: common_vendor.unref(formData).location.provinceCode,
          propsCityCode: common_vendor.unref(formData).location.cityCode
        }),
        x: common_vendor.p({
          label: "\u6240\u5728\u5730",
          name: "location"
        }),
        y: common_vendor.o$1(onChangeHome),
        z: common_vendor.p({
          propsProvinceCode: common_vendor.unref(formData).hometown.provinceCode,
          propsCityCode: common_vendor.unref(formData).hometown.cityCode
        }),
        A: common_vendor.p({
          label: "\u5BB6\u4E61",
          name: "hometown"
        }),
        B: common_vendor.t(common_vendor.unref(formData).schoolName ? common_vendor.unref(formData).schoolName : "\u8BF7\u9009\u62E9\u5B66\u6821"),
        C: common_vendor.o$1(openSchool),
        D: common_vendor.p({
          label: "\u5B66\u6821",
          name: "schoolName"
        }),
        E: common_vendor.t(common_vendor.unref(formData).job ? common_vendor.unref(formData).job : `\u8BF7\u9009\u62E9\u804C\u4E1A`),
        F: common_vendor.unref(professions),
        G: common_vendor.unref(activeProfessionIndex),
        H: common_vendor.o$1(changeProfession),
        I: common_vendor.p({
          label: "\u804C\u4E1A",
          name: "job"
        }),
        J: common_vendor.sr(form, "53251d4e-0", {
          "k": "form"
        }),
        K: common_vendor.p({
          modelValue: common_vendor.unref(formData),
          rules: common_vendor.unref(rules)
        }),
        L: common_vendor.o$1(submit)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-53251d4e"], ["__file", "C:/myself/social/social/src/pages/user/info/Editor.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=Editor.js.map