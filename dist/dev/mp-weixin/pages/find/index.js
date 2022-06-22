"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_util = require("../../utils/util.js");
var api_file = require("../../api/file.js");
var utils_storage = require("../../utils/storage.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const __default__ = {
  onShow: function() {
    if (utils_storage.getTotalIM() > 0) {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: "\xB7\xB7\xB7"
      });
    } else {
      common_vendor.index.removeTabBarBadge({
        index: 2
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    const store = common_vendor.useStore();
    const userInfo = common_vendor.computed$1(() => store.state.user.userInfo).value;
    let src = common_vendor.ref("");
    let progressPercent = common_vendor.ref(0);
    let partListLength = common_vendor.ref(0);
    let cutParts = common_vendor.ref([]);
    let uploadText = common_vendor.ref("\u6682\u505C");
    let uploadFlag = common_vendor.ref(false);
    let uploadBtn = common_vendor.ref(false);
    let abort = common_vendor.ref(false);
    let uploadLoading = common_vendor.ref(false);
    let hash = common_vendor.ref("");
    let partList = common_vendor.ref([]);
    let requestList = common_vendor.ref([]);
    common_vendor.ref(0);
    common_vendor.ref(0);
    const complete = () => {
      console.log("\u53BB\u8C03\u7528\u63A5\u53E3\u5408\u5E76\u6587\u4EF6");
      const { avatar, username } = userInfo;
      const params = {
        hash: hash.value,
        title: formData.title,
        hobby: formData.hobby,
        fileType: formData.fileType,
        content: formData.content,
        avatar,
        username
      };
      api_file.mergeFile(params).then((data) => {
        console.log("data===", data);
        uploadFlag.value = false;
        uploadLoading.value = false;
      });
    };
    const promiseSend = (item, index) => {
      return new Promise((resolve, reject) => {
        const blobUrl = URL.createObjectURL(item.chunk);
        console.log("blobUrl===", blobUrl);
        common_vendor.index.uploadFile({
          url: "/prod/files/uploadLargeFile",
          filePath: blobUrl,
          name: "file",
          fileType: "video",
          formData: {
            filename: item.filename
          },
          success: (uploadFileRes) => {
            console.log("uploadFileRes===", uploadFileRes);
            const { statusCode } = uploadFileRes;
            console.log("index================================", index);
            if (statusCode === 200) {
              let parts = partList.value;
              const part = parts.splice(0, 1);
              cutParts.value.push(part);
              partList.value = [...parts];
              console.log("partList=", partList);
              console.log("cutPartslength=", cutParts.value.length);
              console.log("partListLength=", partListLength.value);
              progressPercent.value = (cutParts.value.length / partListLength.value * 100).toFixed(2);
              resolve(true);
            } else {
              resolve(false);
            }
          },
          fail: (err) => {
            console.log("err=", err);
          }
        });
      });
    };
    const sendRequest = async () => {
      uploadFlag.value = true;
      requestList.value = [];
      console.log("partList.value=", partList.value);
      partList.value.forEach((item, index) => {
        const fn = () => promiseSend(item, index);
        requestList.value.push(fn);
      });
      let i = 0;
      const send = async () => {
        if (abort.value) {
          return;
        }
        console.log("abort", abort.value);
        console.log("requestList.value===", requestList.value);
        if (i >= requestList.value.length) {
          complete();
          return;
        }
        try {
          const isStep = await requestList.value[i]();
          console.log("isStep=", isStep);
          if (isStep) {
            i++;
          }
          send();
        } catch (error) {
          throw new Error("err happened");
        }
      };
      send();
    };
    const sends = async (tempFile) => {
      console.log("tempFiles===", tempFile);
      uploadLoading.value = true;
      const buffer = await utils_util.fileParse(tempFile, "buffer");
      const spark = new common_vendor.SparkMD5.ArrayBuffer();
      let suffix;
      spark.append(buffer);
      hash.value = spark.end();
      suffix = /\.([0-9a-zA-Z]+)$/i.exec(tempFile.name)[1];
      const partSize = 524288;
      let cut = 0;
      partListLength.value = Math.ceil(tempFile.size / partSize);
      console.log("partListLength=", partListLength.value);
      for (let i = 0; i < partListLength.value; i++) {
        let item = {
          chunk: tempFile.slice(cut, cut + partSize),
          filename: `${hash.value}_${i}_.${suffix}`
        };
        cut += partSize;
        partList.value.push(item);
      }
      sendRequest();
    };
    const uploadVideo = () => {
      common_vendor.index.chooseVideo({
        sourceType: ["camera", "album"],
        success: function(res) {
          console.log("res===", res);
          src.value = res.tempFilePath;
          uploadBtn.value = true;
          sends(res.tempFile);
        }
      });
    };
    const onPause = () => {
      if (uploadBtn.value) {
        uploadText.value = "\u7EE7\u7EED";
        uploadBtn.value = false;
        abort.value = true;
      } else {
        uploadText.value = "\u6682\u505C";
        uploadBtn.value = true;
        abort.value = false;
        sendRequest();
      }
    };
    common_vendor.ref("");
    common_vendor.ref(0);
    const onSelectImage = async (e) => {
      console.log("image=", e);
      if (!e)
        return;
      const { tempFilePaths, tempFiles } = e;
      uploadLoading.value = true;
      const files = Object.assign([], tempFiles);
      const fileAll = [];
      for (let item of files) {
        const chunk = await utils_util.fileParse(item, "base64");
        fileAll.push({
          filename: item.name,
          chunk
        });
      }
      const buffer = await utils_util.fileParse(tempFiles[0], "buffer");
      const spark = new common_vendor.SparkMD5.ArrayBuffer();
      spark.append(buffer);
      const hash2 = spark.end();
      const { avatar, username } = userInfo;
      api_file.uploadImage(common_vendor.lib.stringify({
        fileAll,
        hash: hash2,
        title: formData.title,
        hobby: parseInt(formData.hobby),
        fileType: formData.fileType,
        content: formData.content,
        avatar,
        username
      })).then((data) => {
        console.log("data===", data);
        const {
          data: { code }
        } = data;
        if (code === 200) {
          progressPercent.value = 100;
          uploadLoading.value = false;
        }
      });
    };
    const onUploadImage = async () => {
      common_vendor.index.chooseImage({
        count: 6,
        sizeType: ["original", "compressed"],
        sourceType: ["album"],
        success: function(res) {
          onSelectImage(res);
        }
      });
    };
    const form = common_vendor.ref(null);
    let formData = common_vendor.reactive({
      title: "",
      hobby: "",
      fileType: "",
      content: ""
    });
    let rules = {
      title: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u6807\u9898"
          }
        ]
      },
      hobby: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u5174\u8DA3"
          }
        ]
      },
      fileType: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u9009\u62E9\u6587\u4EF6\u7C7B\u578B"
          }
        ]
      },
      content: {
        rules: [
          {
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u6B63\u6587\u5185\u5BB9"
          }
        ]
      }
    };
    let title = common_vendor.ref("");
    let content = common_vendor.ref("");
    let hobby = common_vendor.ref("");
    let fileType = common_vendor.ref("");
    let hobbys = common_vendor.reactive([
      { value: 0, text: "\u72FC\u4EBA\u6740", disable: false },
      { value: 1, text: "\u5267\u672C\u6740", disable: false },
      { value: 2, text: "\u767B\u5C71", disable: false },
      { value: 3, text: "\u65C5\u6E38", disable: false },
      { value: 4, text: "\u89C6\u9891", disable: false }
    ]);
    let fileTypes = common_vendor.ref([
      { value: 0, text: "\u56FE\u7247", disable: false },
      { value: 1, text: "\u89C6\u9891", disable: false }
    ]);
    const hobbyChange = (e) => {
      console.log("e=", e);
      const {
        detail: { value }
      } = e;
      hobby.value = value;
      form.value.setValue("hobby", value);
    };
    const typeChange = (e) => {
      const {
        detail: { value }
      } = e;
      fileType.value = value;
      form.value.setValue("fileType", value);
    };
    const submit = () => {
      form.value.validate().then((res) => {
        console.log("\u8868\u5355\u6570\u636E\u4FE1\u606F\uFF1A", res);
        const { fileType: fileType2, title: title2, content: content2, hobby: hobby2 } = res;
        formData.content = content2;
        formData.title = title2;
        formData.fileType = fileType2;
        formData.hobby = hobby2;
        if (fileType2 === 0) {
          onUploadImage();
        } else {
          uploadVideo();
        }
      }).catch((err) => {
        console.log("\u8868\u5355\u9519\u8BEF\u4FE1\u606F\uFF1A", err);
      });
    };
    common_vendor.watch(() => {
      return hobby.value;
    }, (state) => {
      console.log("state=", state);
      switch (state) {
        case 0:
        case 1:
          fileTypes.value = [{ value: 0, text: "\u56FE\u7247", disable: false }];
          break;
        case 2:
        case 3:
          fileTypes.value = [
            { value: 0, text: "\u56FE\u7247", disable: false },
            { value: 1, text: "\u89C6\u9891", disable: false }
          ];
          break;
        case 4:
          fileTypes.value = [{ value: 1, text: "\u89C6\u9891", disable: false }];
          break;
      }
    }, {
      deep: true
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o$1(($event) => common_vendor.isRef(title) ? title.value = $event : title = $event),
        b: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u6807\u9898",
          modelValue: common_vendor.unref(title)
        }),
        c: common_vendor.p({
          required: true,
          label: "\u6807    \u9898\uFF1A",
          name: "title",
          ["label-width"]: "80"
        }),
        d: common_vendor.f(common_vendor.unref(hobbys), (item, index, i0) => {
          return {
            a: item.value,
            b: item.value,
            c: common_vendor.t(item.text),
            d: item.value,
            e: index
          };
        }),
        e: common_vendor.o$1(hobbyChange),
        f: common_vendor.p({
          required: true,
          label: "\u5174    \u8DA3\uFF1A",
          name: "hobby",
          ["label-width"]: "80"
        }),
        g: common_vendor.f(common_vendor.unref(fileTypes), (item, k0, i0) => {
          return {
            a: item.value,
            b: item.value,
            c: common_vendor.t(item.text),
            d: item.value,
            e: item.value
          };
        }),
        h: common_vendor.o$1(typeChange),
        i: common_vendor.p({
          required: true,
          label: "\u6587\u4EF6\u7C7B\u578B\uFF1A",
          name: "fileType",
          ["label-width"]: "80"
        }),
        j: common_vendor.o$1(($event) => common_vendor.isRef(content) ? content.value = $event : content = $event),
        k: common_vendor.p({
          type: "textarea",
          maxlength: -1,
          autoHeight: true,
          placeholder: "\u8BF7\u8F93\u5165\u6B63\u6587\u5185\u5BB9",
          modelValue: common_vendor.unref(content)
        }),
        l: common_vendor.p({
          required: true,
          label: "\u5185    \u5BB9\uFF1A",
          name: "content",
          ["label-width"]: "80"
        }),
        m: common_vendor.sr(form, "73679080-0", {
          "k": "form"
        }),
        n: common_vendor.p({
          modelValue: common_vendor.unref(formData),
          rules: common_vendor.unref(rules)
        }),
        o: common_vendor.o$1(submit),
        p: common_vendor.unref(uploadLoading)
      }, common_vendor.unref(uploadLoading) ? {
        q: common_vendor.unref(progressPercent)
      } : {}, {
        r: common_vendor.unref(uploadFlag)
      }, common_vendor.unref(uploadFlag) ? {
        s: common_vendor.t(common_vendor.unref(uploadText)),
        t: common_vendor.o$1(onPause)
      } : {});
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73679080"], ["__file", "C:/myself/social/social/src/pages/find/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
