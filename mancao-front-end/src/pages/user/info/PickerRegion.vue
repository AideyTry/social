<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-28 15:48:57
 * @LastEditTime: 2021-12-28 16:17:39
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <picker
    mode="multiSelector"
    :range="multiArray"
    range-key="name"
    :value="multiIndex"
    @columnchange="multiColumn"
    @change="multiChange"
  >
    <view>
      {{
        provinceCode
          ? `${$filters.filterRegion(
              provinceCode,
              province
            )}/${$filters.filterRegion(cityCode, finalCity)}`
          : "请选择省"
      }}
    </view>
  </picker>
</template>
<script>
export default {
  name: "picker-region",
};
</script>
<script setup>
import {  ref, reactive } from "vue";
import { province, city } from "province-city-china/data";
/*  区域选择 */
let activeHomeIndex = ref(0);
let provinceCode = ref("");
let cityCode = ref("");
let finalCity = ref(["市辖区"]);
let multiArray = reactive([province, finalCity.value]);
let multiIndex = reactive([0, 0]);
console.log("province, city===", province, city);
console.log("finalCity===", finalCity.value);
const multiChange = (e) => {
  console.log("e==", e);
  const {
    detail: { value },
  } = e;
  provinceCode.value = province[value[0]].code;
  cityCode.value = finalCity["value"][value[1]].code;
  console.log("provinceCode=", provinceCode.value);
  console.log("cityCode=", cityCode.value);
  console.log("finalCity=======", finalCity);
};
const findCity = (p) => {
  return city.filter((element) => element.province === p);
};
const multiColumn = (e) => {
  const {
    detail: { column, value },
  } = e;
  console.log("column, value=", column, value);
  if (column === 0) {
    finalCity.value = findCity(province[value].province);
    console.log("finalCity=", finalCity);
    if (finalCity["value"].length === 0) {
      finalCity.value = ["市辖区"];
    }
    multiArray[1] = finalCity.value;
  }
  console.log("province[value].province===", province[value].province);
};
</script>