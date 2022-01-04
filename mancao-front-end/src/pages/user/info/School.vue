<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-29 14:06:11
 * @LastEditTime: 2022-01-04 18:31:51
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
        v-if="isShowMore"
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

const pages = getCurrentPages()
// console.log('page.$getAppWebview()=', page.$getAppWebview())
console.log('page===', pages)
console.log('page.route=', pages.route)
let prevPage = pages[pages.length - 2]; //上一页页面实例

console.log('prevPage===', prevPage)


let schools = ref([]);
let pageNum = ref(1)
let queryString = ref('')
let schoolName = ref('')
let isShowMore = ref(false)

const searchSchool = (query, page) => {
    const params = {
    name: query,
    page: String(page),
  }
  getSchool(params).then((data) => {
    console.log("data===", data);
    schools.value = [...schools.value, ...data.data.data];
    console.log('schools.value=====', schools.value)
    isShowMore.value = true
    if(data.data.data.length < 10){
      isShowMore.value = false
    }
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
  prevPage.$vm.otherFun(schoolName.value)// 給上一頁綁定方法otherFun,傳參object
  uni.navigateBack({
                    delta:1 // 可以不傳delta值，默認為1
                })
//     uni.navigateTo({
//     url: `/pages/user/info/Editor?schoolName=${schoolName.value}`
// });
}
</script>

<style lang="scss" scoped>
</style>