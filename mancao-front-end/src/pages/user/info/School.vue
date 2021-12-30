<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-29 14:06:11
 * @LastEditTime: 2021-12-30 15:19:27
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="school">
    <uni-search-bar placeholder="请输入学校名称" @confirm="search" v-model="schoolName"></uni-search-bar>
    <uni-list v-if="schools.length">
      <uni-list-item
        v-for="item in schools"
        :key="item.code"
        :title="item.name"
        :clickable="true"
        @click="onChecked(item)"
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
import { ref, reactive } from "vue";
import { getSchool } from "../../../api/user";

let schools = ref([]);
let pageNum = ref(1)
let queryString = ref('')
let schoolName = ref('')

const searchSchool = (query, page) => {
    const params = {
    name: query,
    page,
  }
  getSchool(params).then((data) => {
    console.log("data===", data);
    schools.value = [...schools.value, ...data.data.data];
    if(page === 1 && schools.value.length === 0){
      schools.value = [{name: '其他学校'}]
    }
    console.log('schools=', schools)
  })
}

const search = (e) => {
  console.log("e===", e);
  const { value } = e;
  queryString.value = value
  schools.value = []
  searchSchool(value, 1)
};
const onLoadMore = () => {
  pageNum.value++
  console.log('pageNum.value===', pageNum.value)
  searchSchool(queryString.value, pageNum.value)

}
const onChecked = (item) => {
  schoolName.value = item.name
  schools.value = []
    uni.navigateTo({
    url: `/pages/user/info/Editor?schoolName=${schoolName.value}`
});
}
</script>

<style lang="scss" scoped>
</style>