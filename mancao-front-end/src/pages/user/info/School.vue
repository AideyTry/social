<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-29 14:06:11
 * @LastEditTime: 2021-12-29 18:05:07
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="school">
    <uni-search-bar placeholder="请输入学校" @confirm="search"></uni-search-bar>
    <uni-list>
      <uni-list-item
        v-for="item in schools"
        :key="item.code"
        :title="item.name"
        style="text-align: center"
      ></uni-list-item>
      <uni-list-item
        :clickable="true"
        title="加载更多..."
        style="text-align: center"
        @click="onLoadMore"
      ></uni-list-item>
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
let pageNum = ref(1)
let queryString = ref('')

const searchSchool = (query, page) => {
    const params = {
    name: query,
    page: pageNum.value,
  }
  getSchool(params).then((data) => {
    console.log("data===", data);
    schools.value = data.data.data;
    console.log('schools=', schools)
  })
}

const search = (e) => {
  console.log("e===", e);
  const { value } = e;
  queryString.value = value
  searchSchool(value, pageNum.value)
};
const onLoadMore = () => {
    console.log('pageNum.value===', pageNum.value)
  pageNum.value++
  console.log('pageNum.value===', pageNum.value)
  searchSchool(queryString.value, pageNum.value)

}
</script>

<style lang="scss" scoped>
</style>