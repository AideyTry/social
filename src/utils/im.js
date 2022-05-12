/*
 * @Author: Aiden(戴林波)
 * @Date: 2022-05-11 22:49:17
 * @LastEditTime: 2022-05-12 09:38:09
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
import {
  imRegister,
  imLogin
} from "@/api/im.js";
import {
  setIMToken
} from "@/utils/auth.js";
import openIM from "@/utils/openIM.js";


const unReadMessage = () => {
  openIM
    .getTotalUnreadMsgCount()
    .then(({
      data
    }) => {
      console.log("data===", data);
      console.log('Number(data)=', Number(data))
      if (Number(data) > 0) {
        uni.setTabBarBadge({
          index: 2,
          text: '···'
        });
      } else {
        uni.removeTabBarBadge({
          index: 2
        })
      }
    })
    .catch((err) => {
      console.log("err=", err);
    });
};

const monitorOnRecv = () => {
  openIM.on("OnRecvNewMessage", (data) => {
    const RecvMessage = JSON.parse(data.data);
    if (RecvMessage.contentType === 101) {
      unReadMessage()
    }
  });
};

export const connectIM = (userID, token) => {
  console.log("userID, token=====================", userID, token);
  const config = {
    userID,
    token,
    // url: "ws://42.192.229.151/:10003",
    url: "wss://mancao.social:20038",
    platformID: 5,
  };
  openIM
    .login(config)
    .then((res) => {
      console.log("login suc...", res);
      if (res.errCode === 0) {
        unReadMessage()
        monitorOnRecv()
      }
    })
    .catch((err) => {
      console.log("login failed...", err);
    });
}

export const register = () => {
  const params = {
    secret: "tuoyun",
    platform: 5,
    operationID: Date.now() + "",
  };
  imRegister(params).then((res) => {
    console.log("res========", res);
    if (res.statusCode === 200) {
      console.log('res.data.data.token====', res.data.data.token)
      setIMToken(res.data.data.token);
      // connectIM(res.data.data.userID, res.data.data.token);
    }
  });
};
export const login = () => {
  const params = {
    secret: "tuoyun",
    platform: 5,
    operationID: Date.now() + "",
  };
  imLogin(params).then((res) => {
    console.log("res========", res);
    if (res.statusCode === 200) {
      if (res.data.errCode !== 0) {
        register();
        return;
      }
      if (res.data.data.token) {
        console.log('res.data.data.token=', res.data.data.token)
        setIMToken(res.data.data.token);
        connectIM(res.data.data.userID, res.data.data.token)
      }
      // connectIM(res.data.data.userID, res.data.data.token);
    }
  });
};