<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2022-01-05 22:14:28
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        :duration="2000"
        :before-close="true"
        @confirm="confirm"
      >
        <view class="change-gender">
          <text>请按实际情况认真选择性别，确认后性别无法修改</text>
          <uni-data-checkbox
            v-model="value"
            :localdata="range"
            @change="change"
          ></uni-data-checkbox>
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getToken } from "./utils/auth.js";
import { setGender } from "./api/user";
export default {
  data() {
    return {
      value: 0,
      range: [
        { value: 1, text: "男" },
        { value: 2, text: "女" },
      ],
      gender: null,
    };
  },
  onLaunch: function () {
    console.log("App Launch");
    if (!getToken()) {
      // uni.navigateTo({
      // 	url: "pages/login/index"
      // });
      uni.reLaunch({
        url: "pages/login/index",
      });
    } else {
      this.$store.dispatch("user/GetUserInfo");
    }
  },
  onShow: function () {
    console.log("App Show");
    console.log("userInfo=1==", this.userInfo);
    console.log('this.$refs.popup===', this.$refs)
    // this.$refs.popup.open()

  },
  onHide: function () {
    console.log("App Hide");
  },
  computed: mapState({
    userInfo: (state) => {
      return state.user.userInfo;
    },
  }),
  mounted() {
    console.log('mounted')
    console.log('range===', this.range)
    // console.log('this.$refs.popup=', this.$refs.popup)
    this.$nextTick(() => {
      // console.log('this.$refs.popup=', this.$refs.popup)
      // this.$refs.popup.open()
    })
  },
  updated(){
      console.log('this.$refs.popup=', this.$refs.popup)
      // this.$refs.popup.open()
  },
  methods: {
    // open() {
    //     this.$refs.popup.open()
    // },
    /**
     * 点击确认按钮触发
     * @param {Object} done
     * @param {Object} value
     */
    confirm(value) {
      // 输入框的值
      console.log(value);
      // TODO 做一些其他的事情，手动执行 close 才会关闭对话框
      // ...
      if (!this.gender) {
        uni.showToast({
          title: "请选择性别",
          icon: "error",
          duration: 2000,
        });
        return;
      }
      const params = {
        gender: this.gender,
      };
      setGender(params).then((data) => {
        console.log("data===", data);
        this.$refs.popup.close();
      });
    },
    change(e) {
      console.log("e:", e);
      const {
        detail: { value },
      } = e;
      this.gender = value;
    },
  },
};
</script>

<style>
/*每个页面公共css */
@import url("static/css/common.css");
</style>
