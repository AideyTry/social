<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2022-07-01 16:57:21
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="content">
    <McTabs> </McTabs>
    <!-- <button @click="open">打开弹窗</button> -->
  </view>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { imRegister, imLogin } from "@/api/im.js";
import { setIMToken } from "../../utils/auth.js";
import McTabs from "./McTabs.vue";
import { getTotalIM } from "@/utils/storage.js";
export default {
  onShow: function() {
    if (getTotalIM() > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: "···",
      });
    } else {
      //#ifdef APP-PLUS || H5
      // uni.removeTabBarBadge({
      //   index: 2,
      // });
      //#endif
      uni.removeTabBarBadge({
        index: 2,
      });
    }
  },
  components: {
    McTabs,
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo).value;
    const register = () => {
      const params = {
        secret: "tuoyun",
        platform: 5,
        operationID: Date.now() + "",
      };
      imRegister(params).then((res) => {
        console.log("res========", res);
        if (res.statusCode === 200) {
          console.log("res.data.token====", res.data.token);
          setIMToken(res.data.token);
          // connectIM(res.data.data.userID, res.data.data.token);
        }
      });
    };
    const login = () => {
      const params = {
        userID: userInfo.phone,
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
            console.log("res.data.token=", res.data.token);
            setIMToken(res.data.data.token);
          }
          // connectIM(res.data.data.userID, res.data.data.token);
        }
      });
    };
    onMounted(() => {
      // connectIM(userID, token);
      // login();
      // resiger()
      // console.log('userInfo=========================', userInfo.phone)
    });
    return {
      title: "蔓草",
    };
  },
};
</script>

<style>
.content {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  /* background: #fdfdfd; */
  /* padding: 0 32rpx; */
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.change-gender {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
