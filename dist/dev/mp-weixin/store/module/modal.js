"use strict";const l={namespaced:!0,state:{show:!1,title:"\u6807\u9898",content:"\u5185\u5BB9",showCancel:!0,cancelText:"\u53D6\u6D88",cancelColor:"#000000",confirmText:"\u786E\u5B9A",confirmColor:"#576b95",success:null},mutations:{hideModal(e){e.hideTabBar&&wx.showTabBar(),e.show=!1},showModal(e,c){e=Object.assign(e,c),console.log("modal state=",e),e.show=!0},success(e,c){let s=e.success,o={cancel:!1,confirm:!1};c=="confirm"?o.confirm=!0:o.cancel=!0,s&&s(o)}},actions:{}};exports.modal=l;
//# sourceMappingURL=modal.js.map
