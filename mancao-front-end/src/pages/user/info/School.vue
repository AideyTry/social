<!--
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-29 14:06:11
 * @LastEditTime: 2021-12-29 15:50:51
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
    <div class="school">
      <uni-search-bar placeholder="请输入学校" @confirm="search"></uni-search-bar>
        <uni-list>
    <uni-list-item  title="列表文字" ></uni-list-item>
    <uni-list-item :disabled="true" title="列表禁用状态" ></uni-list-item>
</uni-list>
    </div>
</template>

<script>
export default {
    name: 'school'
}
</script>

<script setup>
import { getSchool } from '../../../api/user'
const search = (e) => {
  console.log('e===', e)
  const { value } = e
  const params = {
    name: value
  }
  getSchool(params).then(data => {
    console.log('data===', data)
  })
}
</script>

<style lang="scss" scoped>

</style>