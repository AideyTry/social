<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-05-07 23:18:37
 * @LastEditTime: 2022-05-07 23:31:36
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view>
      <text>{{msg.content}}</text>
  </view>
</template>

<script>
import { onMounted, computed, ref } from "vue";
export default {
    props: ['msg'],
    setup(props){
        console.log('props===', props)
        return{}
    }
}
</script>

<style scoped lang="scss">
</style>