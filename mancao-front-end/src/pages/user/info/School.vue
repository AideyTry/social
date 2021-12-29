<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-29 14:06:11
 * @LastEditTime: 2021-12-29 16:36:44
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="school">
    <uni-search-bar placeholder="请输入学校" @confirm="search"></uni-search-bar>
    <uni-list>
      <uni-list-item v-for="item in schools" :key="item.code" :title="item.name"></uni-list-item>
    </uni-list>
  </div>
</template>

<script>
export default {
  name: "school",
};
</script>

<script setup>
import { ref } from "vue";
import { getSchool } from "../../../api/user";

let schools = ref([]);
const search = (e) => {
  console.log("e===", e);
  const { value } = e;
  const params = {
    name: value,
  };
  getSchool(params).then((data) => {
    console.log("data===", data);
    schools.value = data.data.data;
    console.log('schools=', schools)
  });
};
</script>

<style lang="scss" scoped>
</style>