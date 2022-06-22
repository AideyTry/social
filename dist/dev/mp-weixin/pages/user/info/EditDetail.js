"use strict";
var common_vendor = require("../../../common/vendor.js");
var api_hobby = require("../../../api/hobby.js");
var api_publish = require("../../../api/publish.js");
var utils_util = require("../../../utils/util.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
const Comment = () => "../../components/Comment.js";
const VideoPlayer = () => "../../components/VideoPlayer.js";
const _sfc_main = {
  components: {
    Comment,
    VideoPlayer
  },
  onLoad: function(options) {
    console.log("options===", options);
  },
  onReady: function() {
  },
  setup(props) {
    console.log("props=", props);
    const store = common_vendor.useStore();
    common_vendor.computed$1(() => store.state.user.userInfo).value;
    const options = common_vendor.reactive({
      poster: "",
      src: ""
    });
    let info = common_vendor.ref([
      {
        content: "https://social-1308251497.cos.ap-guangzhou.myqcloud.com/images/4.jfif"
      }
    ]);
    common_vendor.ref(0);
    common_vendor.ref("default");
    let hobbyInfo = common_vendor.ref({});
    const initGetHobbyDetail = (obj) => {
      const { id, hobby } = obj;
      const params = { id, hobby };
      api_hobby.getHobbyDetail(params).then((data) => {
        if (data.data.code === 200) {
          hobbyInfo.value = data.data.data;
          publishDate.value = utils_util.formatDate(data.data.data.create_time);
          if (!data.data.data.video_url) {
            photos.value = hobbyInfo.value.photos.map((element, index) => ({
              path: element
            }));
          }
          options.poster = data.data.data.url;
          options.src = data.data.data.video_url;
        }
      });
    };
    const goBack = () => {
      common_vendor.index.switchTab({
        url: "/pages/user/index"
      });
    };
    let publishDate = common_vendor.ref(null);
    let operations = common_vendor.ref(["\u7F16\u8F91", "\u5220\u9664"]);
    let activeOperationIndex = common_vendor.ref(0);
    const onUpdate = (index) => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: function(res) {
          const { tempFiles } = res;
          photos.value[index] = tempFiles[0];
        }
      });
    };
    const onDelete = (index) => {
      if (photos.value.length <= 1) {
        common_vendor.index.showModal({
          content: "\u81F3\u5C11\u9700\u8981\u53D1\u5E03\u4E00\u5F20\u56FE\u7247",
          confirmText: "\u77E5\u9053\u4E86",
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
            } else if (res.cancel) {
              console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
            }
          }
        });
        return;
      }
      photos.value.splice(index, 1);
      console.log("photos.value===========", photos.value);
    };
    const onEdit = (item, index) => {
      console.log("item, index===", item, index);
      common_vendor.index.showActionSheet({
        itemList: operations,
        success: function(res) {
          console.log("\u9009\u4E2D\u4E86\u7B2C" + (res.tapIndex + 1) + "\u4E2A\u6309\u94AE");
          activeOperationIndex.value = res.tapIndex;
          if (activeOperationIndex.value === 1) {
            onDelete(index);
          } else {
            onUpdate(index);
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    };
    const photos = common_vendor.ref([]);
    const addImage = () => {
      common_vendor.index.chooseImage({
        count: 6,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: function(res) {
          console.log("res===", res);
          const { tempFiles } = res;
          photos.value = photos.value.concat(tempFiles);
          console.log("photos.value====", photos.value);
        }
      });
    };
    const form = common_vendor.ref(null);
    const changeTitle = (e) => {
      const { detail: value } = e;
      hobbyInfo.value.title.value = value;
    };
    const changeContent = (e) => {
      const { detail: value } = e;
      hobbyInfo.value.content.value = value;
    };
    const submit = () => {
      form.value.validate().then(async (res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
        const { title, content } = res;
        console.log("photos=====", photos.value);
        if (photos.value.length <= 0) {
          const params2 = {
            title,
            id: parseInt(props.id),
            hobby: parseInt(props.hobby),
            content
          };
          api_publish.updateVideoPublish(params2).then((data) => {
            if (data.data.code === 200) {
              common_vendor.index.showToast({
                title: data.data.msg,
                duration: 2e3
              });
              common_vendor.index.switchTab({
                url: "/pages/user/index",
                success() {
                  let page = getCurrentPages().pop();
                  console.log("page==============", page);
                  if (!page)
                    return;
                  page.onLoad();
                }
              });
            }
          });
          return;
        }
        const tempPhotos = photos.value.map((item, index) => ({
          key: item,
          index
        }));
        const remoteUrls = tempPhotos.filter((item) => item.key.path.includes("social-1308251497"));
        const blobUrls = tempPhotos.filter((item) => item.key.path.includes("blob:"));
        const fileAll = [];
        for (let item of blobUrls) {
          const chunk = await utils_util.fileParse(item.key, "base64");
          fileAll.push({
            index: item.index,
            filename: item.key.name,
            chunk
          });
        }
        const urls = hobbyInfo.value.photos[0].match(/myqcloud.com\/(\S*)/)[1];
        const uploadHash = urls.match(/(\S*)\//)[1];
        const remotePhotos = remoteUrls.map((item) => ({ index: item.index, path: item.key.path }));
        const params = {
          uploadHash,
          uploadFiles: fileAll.length > 0 ? fileAll : [],
          remotePhotos: remotePhotos.length > 0 ? remotePhotos : [],
          title,
          id: parseInt(props.id),
          hobby: parseInt(props.hobby),
          content
        };
        api_publish.updatePublish(common_vendor.lib.stringify(params)).then((data) => {
          if (data.data.code === 200) {
            common_vendor.index.showToast({
              title: data.data.msg,
              duration: 2e3
            });
            common_vendor.index.switchTab({
              url: "/pages/user/index",
              success() {
                let page = getCurrentPages().pop();
                console.log("page==============", page);
                if (!page)
                  return;
                page.onLoad();
              }
            });
          }
          console.log("data=", data);
        });
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    };
    common_vendor.onMounted(() => {
      initGetHobbyDetail({ id: props.id, hobby: props.hobby });
    });
    return {
      hobbyInfo,
      photos,
      info,
      publishDate,
      options,
      goBack,
      onEdit,
      operations,
      activeOperationIndex,
      addImage,
      form,
      changeTitle,
      changeContent,
      submit
    };
  }
};
if (!Array) {
  const _component_VideoPlayer = common_vendor.resolveComponent("VideoPlayer");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _component_Comment = common_vendor.resolveComponent("Comment");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_component_VideoPlayer + _easycom_uni_forms_item2 + _component_Comment + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o$1((...args) => $setup.goBack && $setup.goBack(...args)),
    b: $setup.hobbyInfo.avatar || "",
    c: common_vendor.t($setup.hobbyInfo.username || ""),
    d: $setup.hobbyInfo.fileType === 0
  }, $setup.hobbyInfo.fileType === 0 ? {
    e: common_vendor.f($setup.photos, (item, index, i0) => {
      return {
        a: item.path,
        b: common_vendor.o$1(($event) => $setup.onEdit(item, index)),
        c: index
      };
    }),
    f: common_vendor.o$1((...args) => $setup.addImage && $setup.addImage(...args))
  } : {}, {
    g: $setup.hobbyInfo.fileType === 1
  }, $setup.hobbyInfo.fileType === 1 ? {
    h: $setup.hobbyInfo.id,
    i: common_vendor.p({
      options: {
        src: $setup.hobbyInfo.video_url,
        poster: $setup.hobbyInfo.url
      }
    })
  } : {}, {
    j: common_vendor.o$1((...args) => $setup.changeTitle && $setup.changeTitle(...args)),
    k: $setup.hobbyInfo.title,
    l: common_vendor.o$1(($event) => $setup.hobbyInfo.title = $event.detail.value),
    m: common_vendor.p({
      name: "title"
    }),
    n: common_vendor.o$1((...args) => $setup.changeContent && $setup.changeContent(...args)),
    o: $setup.hobbyInfo.content,
    p: common_vendor.o$1(($event) => $setup.hobbyInfo.content = $event.detail.value),
    q: common_vendor.p({
      name: "content"
    }),
    r: common_vendor.t($setup.publishDate),
    s: $setup.hobbyInfo.id
  }, $setup.hobbyInfo.id ? {
    t: $setup.hobbyInfo.id,
    v: common_vendor.p({
      hobbyInfo: $setup.hobbyInfo
    })
  } : {}, {
    w: common_vendor.sr("form", "4278bb5c-0"),
    x: common_vendor.p({
      modelValue: $setup.hobbyInfo
    }),
    y: common_vendor.o$1((...args) => $setup.submit && $setup.submit(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4278bb5c"], ["__file", "C:/myself/social/social/src/pages/user/info/EditDetail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=EditDetail.js.map
