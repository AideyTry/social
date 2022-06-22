"use strict";
var api_im = require("../api/im.js");
var utils_auth = require("./auth.js");
var utils_storage = require("./storage.js");
var utils_openIM = require("./openIM.js");
const unReadMessage = () => {
  utils_openIM.openIM.getTotalUnreadMsgCount().then(({
    data
  }) => {
    console.log("data==================================================================================", data);
    console.log("Number(data)=", Number(data));
    utils_storage.setTotalIM(Number(data));
  }).catch((err) => {
    console.log("err=", err);
  });
};
const monitorOnRecv = () => {
  utils_openIM.openIM.on("OnRecvNewMessage", (data) => {
    const RecvMessage = JSON.parse(data.data);
    if (RecvMessage.contentType === 101) {
      unReadMessage();
    }
  });
};
const connectIM = (userID, token) => {
  console.log("userID, token=====================", userID, token);
  const config = {
    userID,
    token,
    url: "wss://mancao.social:20038",
    platformID: 5
  };
  utils_openIM.openIM.login(config).then((res) => {
    console.log("login suc...", res);
    if (res.errCode === 0) {
      unReadMessage();
      monitorOnRecv();
    }
  }).catch((err) => {
    console.log("login failed...", err);
  });
};
const register = () => {
  const params = {
    secret: "tuoyun",
    platform: 5,
    operationID: Date.now() + ""
  };
  api_im.imRegister(params).then((res) => {
    console.log("res========", res);
    if (res.statusCode === 200) {
      console.log("res.data.data.token====", res.data.data.token);
      utils_auth.setIMToken(res.data.data.token);
    }
  });
};
const login = () => {
  const params = {
    secret: "tuoyun",
    platform: 5,
    operationID: Date.now() + ""
  };
  api_im.imLogin(params).then((res) => {
    console.log("res========", res);
    if (res.statusCode === 200) {
      if (res.data.errCode !== 0) {
        register();
        return;
      }
      if (res.data.data.token) {
        console.log("res.data.data.token=", res.data);
        utils_auth.setIMToken(res.data.data.token);
        connectIM(res.data.data.userID, res.data.data.token);
      }
    }
  });
};
exports.login = login;
//# sourceMappingURL=im.js.map
