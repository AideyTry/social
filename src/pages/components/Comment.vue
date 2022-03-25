<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-02-28 14:49:16
 * @LastEditTime: 2022-03-25 15:45:28
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <div class="comment">
    <view class="total"
      ><text>共</text><text>{{ total }}</text
      ><text>条评论</text></view
    >
    <view class="my-comment">
      <image
        class="avatar"
        mode="aspectFit"
        :src="hobbyInfo.avatar || ''"
      ></image>
      <input
        v-model="inputString"
        type="text"
        class="comment-input"
        placeholder="喜欢就给个评论支持一下呗~"
        @confirm="confirm"
      />
    </view>
    <view class="other-comment" v-for="item in comments" :key="item.id">
      <view>
        <image
          class="avatar"
          mode="aspectFit"
          :src="item.avatar || ''"
        ></image>
      </view>
      <view class="comment-info">
        <view class="userinfo"><text>{{item.username}}</text><text v-if="item.isAuthor" class="is-author">作者</text></view>
        <view class="comment-content"
          ><text
            >{{item.comment}}</text
          ></view>
          <view>
              <text>{{$filters.commentTime(item.create_time)}}</text>
          </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "comment",
};
</script>
<script setup>
import { setComment, getComment } from "@/api/communication.js";
import { ref, onMounted } from "vue";
const props = defineProps({
  hobbyInfo: {
    type: Object,
    default: {},
  },
});
let inputString = ref('')
let total = ref(0)
let comments = ref([])
console.log("props=", props);

const confirm = (e) => {
    console.log('e=', e)
    const { detail: { value } } = e
    let params = {
        comment: value,
        detailUserId: props.hobbyInfo.user_id,
        hobbyId: props.hobbyInfo.hobby_4_id
    }
    setComment(params).then(data => {
        if(data.statusCode === 200){
          inputString.value = ''
            getCommentData()
        }
    })
}

const getCommentData = () => {
    let params = {
        hobbyId: props.hobbyInfo.hobby_4_id
    }
    getComment(params).then(data => {
            console.log('data666666===', data)
            if(data.data.code === 200){
                comments.value = data.data.data
                total.value= data.data.data.length
            }
        })
}

onMounted(() => {
    getCommentData()
})
</script>

<style lang="scss" scoped>
.comment {
  .total {
    font-size: 28rpx;
  }
  .my-comment {
    display: flex;
    align-items: center;
    height: 60rpx;
    padding: 20rpx 0;
  }
  .avatar {
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    background-color: #fdfdfd;
    margin-right: 15rpx;
  }
  .comment-input {
    margin-left: 20rpx;
    width: calc(100vw - 124rpx);
    height: 100%;
    background: #ddd;
    border-radius: 40rpx;
  }
  .other-comment {
    display: flex;
    font-size: 28rpx;
    padding-bottom: 10rpx;
    border-bottom: 1rpx solid #ccc;
    .comment-info {
      color: #363636;
      & > view{
          margin-bottom: 10rpx;
      }
      .is-author{
          display: inline-block;
          margin-left: 10rpx;
          background-color: #dfdfdf;
          font-size: 24rpx;
          border-radius: 10rpx;
          color: #888;
      }
      .userinfo {
        color: #ddd;
      }
    }
  }
}
</style>
