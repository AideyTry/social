"use strict";
var common_vendor = require("../../../common/vendor.js");
const __default__ = {
  name: "picker-region"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    propsProvinceCode: {
      type: String,
      default: ""
    },
    propsCityCode: {
      type: String,
      default: ""
    }
  },
  emits: ["change"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.ref(0);
    let provinceCode = common_vendor.ref(props.propsProvinceCode);
    let cityCode = common_vendor.ref(props.propsCityCode);
    let finalCity = common_vendor.ref(["\u5E02\u8F96\u533A"]);
    let multiArray = common_vendor.reactive([common_vendor.data.province, finalCity.value]);
    let multiIndex = common_vendor.reactive([0, 0]);
    const multiChange = (e) => {
      const {
        detail: { value }
      } = e;
      provinceCode.value = common_vendor.data.province[value[0]].code;
      cityCode.value = finalCity["value"][value[1]].code;
      emit("change", { provinceCode: provinceCode.value, cityCode: cityCode.value });
    };
    const findCity = (p) => {
      return common_vendor.data.city.filter((element) => element.province === p);
    };
    const multiColumn = (e) => {
      const {
        detail: { column, value }
      } = e;
      if (column === 0) {
        finalCity.value = findCity(common_vendor.data.province[value].province);
        if (finalCity["value"].length === 0) {
          finalCity.value = ["\u5E02\u8F96\u533A"];
        }
        multiArray[1] = finalCity.value;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(provinceCode) ? `${_ctx.$filters.filterRegion(common_vendor.unref(provinceCode), common_vendor.unref(common_vendor.data.province))}/${_ctx.$filters.filterRegion(common_vendor.unref(cityCode), common_vendor.unref(common_vendor.data.city))}` : `${__props.isDisabled ? "\u6682\u672A\u586B\u5199" : "\u8BF7\u9009\u62E9\u7701"}`),
        b: common_vendor.unref(multiArray),
        c: common_vendor.unref(multiIndex),
        d: __props.isDisabled,
        e: common_vendor.o$1(multiColumn),
        f: common_vendor.o$1(multiChange)
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/myself/social/social/src/pages/user/info/PickerRegion.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=PickerRegion.js.map
