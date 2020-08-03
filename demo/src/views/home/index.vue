<template>
  <div :style="{'overflow': isSearch ? 'hidden' : 'scroll'}">
    <van-search
      v-model="selectInfo"
      placeholder="请输入搜索关键词"
      shape="round"
      readonly
      @click="showSearch"
    />
    <hl-searchHistory
      :selectData="selectData"
      @onSearch="onSearch"
      @cancelSearch="cancelSearch"
      v-if="isSearch"
    />
    <img-swipe :images="imageList" :swipeData="swipeData" />
    <hl-grid :grid="grid" :columnNum="columnNum" @toPage="toPage" />
    <hl-deadline />
    <div class="recommendTitle">
      <img src="../../../static/image/carLogo.png" />
      <span>推荐商品</span>
    </div>
    <hl-recommend />
  </div>
</template>

<script>
import { Search } from "vant";
import searchHistory from "@/components/searchHistory";
import imgSwipe from "@/components/imgSwipe";
import grid from "@/components/grid";
import deadline from "@/components/deadline";
import recommend from "@/components/recommend";

export default {
  data() {
    return {
      selectInfo: "",
      selectData: "",
      isSearch: false,
      imageList: [],
      swipeData: {
        height: "200",
      },
      grid: [
        {
          text: "特惠专区",
          icon: "../../../static/image/tehui.png",
          path: "/recommendationZone",
          type: 4,
        },
        {
          text: "爆款专区",
          icon: "../../../static/image/baokuan.png",
          path: "/recommendationZone",
          type: 1,
        },
        {
          text: "低价专区",
          icon: "../../../static/image/dijia.png",
          path: "/recommendationZone",
          type: 2,
        },
        {
          text: "积分专区",
          icon: "../../../static/image/jifen.png",
          path: "/integralRegion",
          type: 3,
        },
      ],
      columnNum: 4,
    };
  },
  components: {
    "van-search": Search,
    "img-swipe": imgSwipe,
    "hl-grid": grid,
    "hl-deadline": deadline,
    "hl-recommend": recommend,
    "hl-searchHistory": searchHistory,
  },
  created() {
    this.getSwiperImage();
    // this.getActivity();
  },
  methods: {
    getSwiperImage() {
      let that = this;
      this.$https.get(that.$api.common.getSwiperImage).then((res) => {
        this.imageList = res.data.data;
      });
    },
    getActivity() {
      let params = {};
      let that = this;
      this.$https.get("/system/Carousel/getList").then((res) => {
        this.imageList = res.data.data;
      });
    },
    onSearch(val) {
      this.selectInfo = val;
      this.isSearch = false;
    },
    showSearch() {
      this.selectData = this.selectInfo;
      this.isSearch = true;
    },
    cancelSearch() {
      this.isSearch = false;
    },
    toPage(val) {
      this.$router.push({
        path: val.path,
        query: {
          text: val.text,
          type: val.type,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .van-grid .van-grid-item__content {
  background-color: rgba(255, 255, 255, 0);
}
.recommendTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75.5px;
  width: 100%;
  img {
    height: 18px;
    width: 18px;
  }
  span {
    color: #2c2c2c;
    font-size: 17px;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
