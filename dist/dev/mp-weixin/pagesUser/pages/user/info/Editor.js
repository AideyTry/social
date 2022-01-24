"use strict";
var common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  Math.max.call(null, _easycom_uni_forms_item2, _easycom_uni_forms2);
}
const _easycom_uni_forms_item = () => "../../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  Math.max.call(null, _easycom_uni_forms_item, PickerRegion, _easycom_uni_forms);
}
const PickerRegion = () => "./PickerRegion.js";
const _sfc_main = {
  setup(__props) {
    const store = common_vendor.useStore();
    let userInfo = common_vendor.computed(() => store.state.user.userInfo).value;
    let formData = common_vendor.reactive({
      avatar: userInfo.avatar,
      nickname: "",
      gender: "1",
      birthday: "",
      location: {
        provinceCode: "",
        cityCode: ""
      },
      hometown: {
        provinceCode: "",
        cityCode: ""
      },
      schoolName: "",
      job: "",
      motto: "",
      photos: null
    });
    let rules = {
      nickname: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u6635\u79F0"
          }
        ]
      }
    };
    const form = common_vendor.ref(null);
    const submit = (e) => {
      console.log("form=e==", e);
      form.value.validate().then((res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    };
    const defaultAvatar = "/static/images/default_avatar.png";
    let images = common_vendor.reactive(userInfo.photos);
    common_vendor.watch(images, (images2, old) => {
      console.log("images.value===", images2.value);
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
    formData.birthday = currentDate;
    let startDate = getDate("start");
    let endDate = getDate("end");
    const bindDateChange = (e) => {
      formData.birthday = e.detail.value;
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
    const { hash } = location;
    const ops = hash.split("?")[1];
    if (ops) {
      const opsSchoolName = ops.split("=")[1];
      if (opsSchoolName) {
        formData.schoolName = decodeURI(opsSchoolName);
      }
    }
    console.log("ops==", ops);
    const openSchool = () => {
      common_vendor.index.navigateTo({
        url: "/pages/user/info/School"
      });
    };
    const onChangeSchool = (name) => {
      formData.schoolName = name;
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
            c: common_vendor.o(($event) => onUpload(item, index)),
            d: index
          });
        }),
        f: common_vendor.p({
          name: "photos"
        }),
        g: common_vendor.unref(formData).motto,
        h: common_vendor.o(($event) => common_vendor.unref(formData).motto = $event.detail.value),
        i: common_vendor.p({
          name: "motto"
        }),
        j: common_vendor.unref(formData).nickname,
        k: common_vendor.o(($event) => common_vendor.unref(formData).nickname = $event.detail.value),
        l: common_vendor.p({
          label: "\u6635\u79F0",
          name: "nickname"
        }),
        m: common_vendor.t(gender.value),
        n: common_vendor.o(changeGender),
        o: common_vendor.p({
          label: "\u6027\u522B",
          name: "gender"
        }),
        p: common_vendor.t(common_vendor.unref(formData).birthday),
        q: common_vendor.unref(formData).birthday,
        r: common_vendor.unref(startDate),
        s: common_vendor.unref(endDate),
        t: common_vendor.o(bindDateChange),
        v: common_vendor.p({
          label: "\u51FA\u751F\u65E5\u671F",
          name: "birthday"
        }),
        w: common_vendor.o(onChange),
        x: common_vendor.p({
          propsProvinceCode: "440000",
          propsCityCode: "440300"
        }),
        y: common_vendor.p({
          label: "\u6240\u5728\u5730",
          name: "location"
        }),
        z: common_vendor.o(onChangeHome),
        A: common_vendor.p({
          propsProvinceCode: "430000",
          propsCityCode: "430700"
        }),
        B: common_vendor.p({
          label: "\u5BB6\u4E61",
          name: "hometown"
        }),
        C: common_vendor.t(common_vendor.unref(formData).schoolName ? common_vendor.unref(formData).schoolName : "\u8BF7\u9009\u62E9\u5B66\u6821"),
        D: common_vendor.o(openSchool),
        E: common_vendor.o(onChangeSchool),
        F: common_vendor.p({
          label: "\u5B66\u6821",
          name: "schoolName"
        }),
        G: common_vendor.t(common_vendor.unref(formData).job ? common_vendor.unref(formData).job : `\u8BF7\u9009\u62E9\u804C\u4E1A`),
        H: common_vendor.unref(professions),
        I: common_vendor.unref(activeProfessionIndex),
        J: common_vendor.o(changeProfession),
        K: common_vendor.p({
          label: "\u804C\u4E1A",
          name: "job"
        }),
        L: common_vendor.sr(form, "4ff6606e-0", {
          "k": "form"
        }),
        M: common_vendor.p({
          modelValue: common_vendor.unref(formData),
          rules: common_vendor.unref(rules)
        }),
        N: common_vendor.o(submit)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ff6606e"]]);
wx.createPage(MiniProgramPage);
