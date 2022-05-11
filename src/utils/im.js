import { imRegister, imLogin } from "@/api/im.js";
import { setIMToken } from "@/utils/auth.js";
export const register = () => {
    const params = {
      secret: "tuoyun",
      platform: 5,
      operationID: Date.now() + "",
    };
    imRegister(params).then((res) => {
      console.log("res========", res);
      if (res.statusCode === 200) {
        console.log('res.data.token====', res.data.token)
        setIMToken(res.data.token);
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
          console.log('res.data.token=', res.data.token)
          setIMToken(res.data.data.token);
        }
        // connectIM(res.data.data.userID, res.data.data.token);
      }
    });
  };