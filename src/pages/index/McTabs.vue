<!--
 * @Author: Aiden(戴林波)
 * @Date: 2022-01-16 13:32:17
 * @LastEditTime: 2022-07-05 12:12:46
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
-->
<template>
  <view class="tabs">
    <scroll-view
      scroll-x
      scroll-with-animaiton
      :enable-flex="true"
      @scroll="handleScroll"
      class="nav-wraper"
    >
      <view class="nav">
        <view
          class="nav-item"
          v-for="(item, index) in list"
          :key="index"
          :class="swiperIndex == index ? 'nav-item-act' : ''"
          @click="taggleNav(index)"
        >
          <text>{{ item.title }}</text>
          <view
            class="nav-line"
            :style="`{width: ${navItemWidth}rpx}`"
            v-if="swiperIndex == index"
          ></view>
        </view>
      </view>
    </scroll-view>
    <swiper
      :current="swiperIndex"
      :duration="300"
      class="swiper"
      @change="swiperChange"
    >
      <swiper-item v-for="(item, index) in list" :key="index">
        <scroll-view
          scroll-y="true"
          class="swiper-scroll"
          @scrolltolower="onScrolltolower"
        >
          <uni-list v-if="index === 0">
            <uni-list-item
              :title="item.title"
              :ellipsis="item.title"
              :note="item.description"
              v-for="item in videos"
              :key="item.id"
              direction="column"
              class="content-item"
            >
              <template v-slot:header>
                <view class="uni-thumb uni-content list-picture">
                  <image
                    v-if="item.img"
                    class="slot-image"
                    :src="item.img"
                    mode="widthFix"
                    @click="goDetail(item)"
                  ></image>
                  <view class="hint" v-if="item.hintTitle || item.dateSrc">
                    <!-- <text v-if="item.hintTitle">By</text> -->
                    <text v-if="item.hintTitle" class="hint-title">{{
                      item.hintTitle
                    }}</text>
                    <text class="hint-date">{{ item.dateSrc }}</text>
                  </view>
                </view>
              </template>
              <template v-slot:body>
                <view class="content-body">
                  <view class="title-wraper" @click="goDetail(item)"
                    ><text class="title">{{ item.title }}</text
                    ><view class="video"
                      ><uni-icons
                        style="vertical-align: middle"
                        type="videocam"
                        size="20"
                        color="#999"
                      ></uni-icons
                      ><text>VIDEO</text></view
                    ></view
                  >
                  <view class="description">{{ item.description }}</view>
                </view>
              </template>
            </uni-list-item>
          </uni-list>
          <!-- <view v-else-if="index === 3"> -->
          <!-- #ifdef H5 -->
          <WaterFall v-if="index === 1" :list="werewolfs" :activeIndex="2" />
          <WaterFall
            v-else-if="index === 2"
            :list="scriptKills"
            :activeIndex="3"
          />
          <WaterFall
            v-else-if="index === 3"
            :list="mountaineers"
            :activeIndex="4"
          />
          <WaterFall v-else-if="index === 4" :list="travels" :activeIndex="5" />
          <WaterFall
            v-else-if="index === 5"
            :list="videoList"
            :activeIndex="6"
          />
          <!-- #endif -->
          <!-- #ifdef APP-PLUS || MP-WEIXIN -->
          <WaterFallApp
            v-if="index === 1 && swiperIndex === index"
            :list="werewolfs"
            :activeIndex="2"
            :key="werewolfs"
          />
          <WaterFallApp
            v-else-if="index === 2 && swiperIndex === index"
            :list="scriptKills"
            :activeIndex="3"
            :key="scriptKills"
          />
          <WaterFallApp
            v-else-if="index === 3 && swiperIndex === index"
            :list="mountaineers"
            :activeIndex="4"
          />
          <WaterFallApp
            v-else-if="index === 4 && swiperIndex === index"
            :list="travels"
            :activeIndex="5"
          />
          <WaterFallApp
            v-else-if="index === 5 && swiperIndex === index"
            :list="videoList"
            :activeIndex="6"
          />
          <!-- #endif -->
          <!-- <WaterFall v-else-if="index === 6" :list="movies" :activeIndex="7"/> -->
          <!-- </view> -->
          <!-- <view v-else>待上线</view> -->
        </scroll-view>
        <!-- <slot></slot> -->
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: "McTabs",
  mounted() {
    console.log("this===", this);
  },
};
</script>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { getVideoList, getHobbyList } from "@/api/hobby.js";
//#ifdef H5
import WaterFall from "./WaterFall.vue";
//#endif
//#ifdef APP-PLUS || MP-WEIXIN
import WaterFallApp from "./WaterFallApp.vue";
//#endif

const list = ref([
  { title: "英语", content: [] },
  {
    title: "狼人杀",
    content: [],
  },
  { title: "剧本杀", content: [] },
  {
    title: "登山",
    content: [],
  },
  {
    title: "旅游",
    content: [],
  },
  {
    title: "视频",
    content: [],
  },
]);
let swiperIndex = ref(0);
let navItemWidth = ref(0);
const navItems = reactive([]);
const strateies = {
  hobby0: (obj) => getEnglishVideos(obj),
  hobby1: (obj) => getWerewolf(obj),
  hobby2: (obj) => getScriptKill(obj),
  hobby3: (obj) => getMountaineers(obj),
  hobby4: (obj) => getTravel(obj),
  hobby5: (obj) => getvideoList(obj),
  // hobby6: (obj) => getMovies(obj)
};
const handleScroll = (e) => {
  console.log("e=", e);
  const {
    detail: { current },
  } = e;
  console.log("current=", current);
};
const taggleNav = (index) => {
  console.log("swiperIndex========================", index);
  swiperIndex.value = index;
};
const swiperChange = (e) => {
  const {
    detail: { current },
  } = e;
  swiperIndex.value = current;
  navItemWidth.value = navItems[swiperIndex.value].width;
  strateies[`hobby${current}`]({ pageNum: 1, pageSize: 100 });
  console.log("e=", e);
  console.log("navItemWidth.value=====", navItemWidth.value);
};
onMounted(() => {
  //#ifdef H5
  const items = document.querySelectorAll(".nav-item");
  if (items.length > 0) {
    items.forEach((item) => {
      console.log("width=", item.offsetWidth);
      navItems.push({ width: item.offsetWidth });
    });
    navItemWidth.value = navItems[swiperIndex.value].width;
    console.log("items===", items);
    console.log("navItemWidth===", navItemWidth.value);
    getEnglishVideos({ pageNum: 1, pageSize: 10 });
  }
  //#endif

  //#ifdef APP-PLUS || MP-WEIXIN
  console.log("list====", list.value);
  if (list.value.length > 0) {
    list.value.forEach(() => {
      navItems.push({ width: 48 });
    });
    navItemWidth.value = navItems[swiperIndex.value].width;
    console.log("navItemWidth===", navItemWidth.value);
    getEnglishVideos({ pageNum: 1, pageSize: 10 });
  }
  //#endif
});
const result = computed(() => `${navItemWidth.value}rpx`);

// 英语
let videos = ref([]);
let pageNum = ref(1);
let pageSize = ref(10);
let total = ref(0);
var getEnglishVideos = ({ pageNum = 1, pageSize = 10 }) => {
  const params = {
    pageNum,
    pageSize,
  };
  getVideoList(params).then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      videos.value = videos.value.concat(data.data.data);
      total.value = data.data.total;
    }
  });
};

const onScrolltolower = (e) => {
  if (swiperIndex.value === 0) {
    if (Math.ceil(total.value / pageSize.value) <= pageNum.value) {
      return;
    }
    pageNum.value++;
    getEnglishVideos({ pageNum: pageNum.value, pageSize: pageSize.value });
  }
};
// 暂时不用
const onScroll = (e) => {
  const items = uni.createSelectorQuery().selectAll(".content-item");
  console.log("items===", items);
  console.log("onScroll=", e);
  let scrollHeight = null;
  let scrollTop = null;
  let height = null;

  const view = uni
    .createSelectorQuery()
    .select(".swiper-scroll")
    .scrollOffset((res) => {
      console.log("res===============================", res);
      console.log("竖直滚动位置" + res.scrollTop);
      scrollHeight = res.scrollHeight;
      scrollTop = res.scrollTop;
    })
    .exec();
  view
    .fields(
      {
        size: true,
        scrollOffset: true,
      },
      (data) => {
        // console.log("得到节点信息" + JSON.stringify(data));
        console.log("节点的高为" + data.height);
        height = parseInt(data.height);
      }
    )
    .exec();

  if (scrollHeight === scrollTop + height) {
    console.log("滚动加载了更多了");
  }
};

const goDetail = (item) => {
  console.log("item===", item);
  //#ifdef APP-PLUS || H5
  uni.navigateTo({
    url: `/pages/index/VideoDetail?id=${item.id}`,
  });
  //#endif
  //#ifdef MP-WEIXIN
  uni.navigateTo({
    url: `/pages/hobby/EnglishDetail/EnglishDetail?id=${item.id}`,
  });
  //#endif
};

// 登山
let mountaineers = ref([]);
let mountaineersTotal = ref(0);
const getMountaineers = ({ pageNum = 1, pageSize = 10 }) => {
  const params = {
    pageNum,
    pageSize,
    hobby: 4,
  };
  console.log("hobby");
  getHobbyList(params).then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      console.log("data.data.data=", data.data.data);
      mountaineers.value = data.data.data;
      mountaineersTotal.value = data.data.total;
    }
  });
};

// 狼人杀
let werewolfs = ref([]);
let werewolfsTotal = ref(0);
const getWerewolf = ({ pageNum = 1, pageSize = 10 }) => {
  const params = {
    pageNum,
    pageSize,
    hobby: 2,
  };
  console.log("hobby");
  getHobbyList(params).then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      console.log("data.data.data=", data.data.data);
      werewolfs.value = data.data.data;
      werewolfsTotal.value = data.data.total;
    }
  });
};

// 剧本杀
let scriptKills = ref([]);
let scriptKillsTotal = ref(0);
const getScriptKill = ({ pageNum = 1, pageSize = 10 }) => {
  const params = {
    pageNum,
    pageSize,
    hobby: 3,
  };
  console.log("hobby");
  getHobbyList(params).then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      console.log("data.data.data=", data.data.data);
      scriptKills.value = data.data.data;
      scriptKillsTotal.value = data.data.total;
    }
  });
};

// 旅游
let travels = ref([]);
let travelsTotal = ref(0);
const getTravel = ({ pageNum = 1, pageSize = 10 }) => {
  const params = {
    pageNum,
    pageSize,
    hobby: 5,
  };
  console.log("hobby");
  getHobbyList(params).then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      console.log("data.data.data=", data.data.data);
      travels.value = data.data.data;
      travelsTotal.value = data.data.total;
    }
  });
};

// 视频
let videoList = ref([]);
let videoListTotal = ref(0);
const getvideoList = ({ pageNum = 1, pageSize = 10 }) => {
  const params = {
    pageNum,
    pageSize,
    hobby: 6,
  };
  console.log("hobby");
  getHobbyList(params).then((data) => {
    console.log("data===", data);
    if (data.data.code === 200) {
      console.log("data.data.data=", data.data.data);
      videoList.value = data.data.data;
      videoListTotal.value = data.data.total;
    }
  });
};

// 电影
// let movies = ref([]);
// let moviesTotal = ref(0);
// const getMovies = ({ pageNum = 1, pageSize = 10 }) => {
//   const params = {
//     pageNum,
//     pageSize,
//     hobby: 7,
//   };
//   console.log("hobby");
//   getHobbyList(params).then((data) => {
//     console.log("data===", data);
//     if (data.data.code === 200) {
//       console.log("data.data.data=", data.data.data);
//       movies.value = data.data.data;
//       moviesTotal.value = data.data.total;
//     }
//   });
// };
</script>

<style lang="scss" scoped>
.tabs {
}
.nav-wraper {
  background: #fafafa;
}
.nav {
  white-space: nowrap;
  position: relative;
  height: 60rpx;
  padding: 32rpx;
  border-top: 1rpx solid #dcdfe6;
  border-bottom: 1rpx solid #dcdfe6;
  .nav-item {
    display: inline-block;
    margin: 0 16rpx;
    text-align: center;
    transition: color 0.3s ease;
    position: relative;
  }
  .nav-item:first-child {
    margin-left: 0;
  }
  .nav-line {
    position: absolute;
    bottom: -24rpx;
    // width: v-bind(result);
    width: 60rpx;
    height: 4rpx;
    border-radius: 10rpx;
    background-color: pink;
    transition: left 0.3s ease;
  }
}
.nav-item-act {
  color: pink;
  font-weight: bolder;
}
.swiper {
  height: calc(100vh - 80upx);
  padding: 32rpx;
  background: #fdfdfd;
}
.swiper-scroll {
  height: 100%;
  .content-item {
    .hint {
      font-size: 14px;
      font-family: Arial, Helvetica, sans-serif;
      color: #999999;
      margin-bottom: 10rpx;
      text:first-child {
        margin-right: 20rpx;
      }
    }
    .hint-title {
      color: #014073;
      margin-right: 20rpx;
    }
    .hint-date {
      // margin-left: 20rpx;
    }
    .content-body {
      .title-wraper {
        display: inline-block;
        text-align: left;
        .title {
          // display: inline-block;
          font-size: 40rpx;
          font-family: "Times New Roman", Times, serif;
          color: #000;
        }
        .video {
          display: inline-block;
          color: #999999;
          font-size: 16rpx;
        }
      }
      .description {
        // text-align: left;
        // margin-top: 10rpx;
        // color: #666;
        // font-size: 32rpx;
        // font-family: Arial, Helvetica, sans-serif;
        color: #666;
        font-size: 32rpx;
        font-family: Arial, Helvetica, sans-serif;
        margin-top: 10rpx;
        line-height: 40rpx;
      }
    }
  }
}
</style>
