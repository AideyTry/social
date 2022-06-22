"use strict";
var common_vendor = require("../../common/vendor.js");
var api_communication = require("../../api/communication.js");
require("../../utils/request.js");
require("../../utils/auth.js");
const __default__ = {
  name: "comment"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    hobbyInfo: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    let inputString = common_vendor.ref("");
    let total = common_vendor.ref(0);
    let comments = common_vendor.ref([]);
    console.log("props=", props);
    const confirm = (e) => {
      console.log("e=", e);
      const { detail: { value } } = e;
      let params = {
        comment: value,
        detailUserId: props.hobbyInfo.user_id,
        hobbyId: props.hobbyInfo[`hobby_${props.hobbyInfo.hobby}_id`],
        hobby: props.hobbyInfo.hobby
      };
      api_communication.setComment(params).then((data) => {
        if (data.statusCode === 200) {
          inputString.value = "";
          getCommentData();
        }
      });
    };
    const getCommentData = () => {
      console.log("props.hobbyInfo=======================", props.hobbyInfo);
      let params = {
        hobbyId: props.hobbyInfo[`hobby_${props.hobbyInfo.hobby}_id`],
        hobby: props.hobbyInfo.hobby
      };
      api_communication.getComment(params).then((data) => {
        console.log("data666666===", data);
        if (data.data.code === 200) {
          comments.value = data.data.data;
          total.value = data.data.data.length;
        }
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.nextTick(() => {
        getCommentData();
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(total)),
        b: __props.hobbyInfo.avatar || "",
        c: common_vendor.o$1(confirm),
        d: common_vendor.unref(inputString),
        e: common_vendor.o$1(($event) => common_vendor.isRef(inputString) ? inputString.value = $event.detail.value : inputString = $event.detail.value),
        f: common_vendor.f(common_vendor.unref(comments), (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar || "",
            b: common_vendor.t(item.username),
            c: item.isAuthor
          }, item.isAuthor ? {} : {}, {
            d: common_vendor.t(item.comment),
            e: common_vendor.t(_ctx.$filters.commentTime(item.create_time)),
            f: item.id
          });
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-338a0aca"], ["__file", "C:/myself/social/social/src/pages/components/Comment.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=Comment.js.map
