<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-28 15:48:57
 * @LastEditTime: 2022-01-09 20:11:14
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
    :disabled="isDisabled"
    @columnchange="multiColumn"
    @change="multiChange"
  >
    <view>
      {{
        provinceCode
          ? `${$filters.filterRegion(
              provinceCode,
              province
            )}/${$filters.filterRegion(cityCode, city)}`
          : `${ isDisabled ? '暂未填写' : '请选择省'}`
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
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },
  propsProvinceCode: {
      type: String,
      default: ''
  },
    propsCityCode: {
      type: String,
      default: ''
  },
})

const emit = defineEmits(['change'])

let activeHomeIndex = ref(0);
let provinceCode = ref(props.propsProvinceCode);
let cityCode = ref(props.propsCityCode);
let finalCity = ref(["市辖区"]);
let multiArray = reactive([province, finalCity.value]);
let multiIndex = reactive([0, 0]);
const multiChange = (e) => {
  const {
    detail: { value },
  } = e;
  provinceCode.value = province[value[0]].code;
  cityCode.value = finalCity["value"][value[1]].code;
  emit('change', {provinceCode: provinceCode.value,  cityCode: cityCode.value})
};
const findCity = (p) => {
  return city.filter((element) => element.province === p);
};
const multiColumn = (e) => {
  const {
    detail: { column, value },
  } = e;
  if (column === 0) {
    finalCity.value = findCity(province[value].province);
    if (finalCity["value"].length === 0) {
      finalCity.value = ["市辖区"];
    }
    multiArray[1] = finalCity.value;
  }
};
</script>