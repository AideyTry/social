"use strict";
var common_vendor = require("../../../../common/vendor.js");
var api_user = require("../../../../api/user.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_search_bar = () => "../../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list)();
}
const __default__ = {
  name: "school"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    let schools = common_vendor.ref([]);
    let pageNum = common_vendor.ref(1);
    let queryString = common_vendor.ref("");
    let schoolName = common_vendor.ref("");
    let isShowMore = common_vendor.ref(false);
    const searchSchool = (query, page) => {
      const params = {
        name: query,
        page: String(page)
      };
      api_user.getSchool(params).then((data) => {
        console.log("data===", data);
        schools.value = [...schools.value, ...data.data.data];
        console.log("schools.value=====", schools.value);
        isShowMore.value = true;
        if (data.data.data.length < 10) {
          isShowMore.value = false;
        }
        if (page === 1 && schools.value.length === 0) {
          schools.value = [{ name: "\u5176\u4ED6\u5B66\u6821" }];
        }
        console.log("schools=", schools);
      });
    };
    const search = (e) => {
      console.log("e===", e);
      const { value } = e;
      queryString.value = value;
      schools.value = [];
      searchSchool(value, 1);
    };
    const onLoadMore = () => {
      pageNum.value++;
      console.log("pageNum.value===", pageNum.value);
      searchSchool(queryString.value, pageNum.value);
    };
    const onChecked = (item) => {
      schoolName.value = item.name;
      schools.value = [];
      common_vendor.index.navigateTo({
        url: `/pages/user/info/Editor?schoolName=${schoolName.value}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o$1(search),
        b: common_vendor.o$1(($event) => common_vendor.isRef(schoolName) ? schoolName.value = $event : schoolName = $event),
        c: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u5B66\u6821\u540D\u79F0",
          modelValue: common_vendor.unref(schoolName)
        }),
        d: common_vendor.unref(schools).length
      }, common_vendor.unref(schools).length ? common_vendor.e({
        e: common_vendor.f(common_vendor.unref(schools), (item, k0, i0) => {
          return {
            a: item.code,
            b: common_vendor.o$1(($event) => onChecked(item), item.code),
            c: "03d26bf4-2-" + i0 + ",03d26bf4-1",
            d: common_vendor.p({
              title: item.name,
              clickable: true
            })
          };
        }),
        f: common_vendor.unref(isShowMore)
      }, common_vendor.unref(isShowMore) ? {
        g: common_vendor.o$1(onLoadMore),
        h: common_vendor.p({
          clickable: true,
          title: "\u52A0\u8F7D\u66F4\u591A..."
        })
      } : {}) : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/myself/social/social/src/pagesUser/pages/user/info/School.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=School.js.map
