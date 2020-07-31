<template>
  <div>
    <hl-header :header="header"></hl-header>
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
    <div style="margin-top:1px;">
      <hl-screening :selectForm="selectForm" />
    </div>

    <div class="list">
      <div
        class="item"
        :class="{'item-active':index == 0}"
        v-for="(item,index) in list"
        :key="index"
        @click="toDetail(item)"
      >
        <img class="itemImage" :src="imageUrl + item.image" alt />
        <div class="itemRight">
          <p class="itemTitle">{{item.goodsName}}</p>
          <span class="itemNum">{{item.sales}}</span>
          <span class="itemPirce">{{item.price}}</span>
          <img class="itemIcon" src="../../../static/image/carLogo.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
import screening from "@/components/screening";
import { Search } from "vant";
import searchHistory from "@/components/searchHistory";
export default {
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      isLoading: false,
      header: {
        title: "",
        isLeftArrow: true,
      },
      selectInfo: "",
      selectData: "",
      isSearch: false,
      list: [],
      selectForm: {
        page: 1,
        pageSize: 20,
      },
    };
  },
  components: {
    "hl-header": header,
    "van-search": Search,
    "hl-screening": screening,
    "hl-searchHistory": searchHistory,
  },
  created() {
    this.getQuery();
    this.getActivityList();
  },
  methods: {
    getQuery() {
      this.header.title =
        this.$route.query.text == undefined ? "商品" : this.$route.query.text;
      this.selectInfo =
        this.$route.query.selectInfo == undefined
          ? ""
          : this.$route.query.selectInfo;
      this.selectForm.activityType =
        this.$route.query.type == undefined ? "" : this.$route.query.type;
      this.selectForm.goodsName =
        this.$route.query.selectInfo == undefined
          ? ""
          : this.$route.query.selectInfo;
    },
    getActivityList() {
      if (this.isLoading) {
        return;
      }
      let params = this.selectForm;
      params.goodsName = this.selectInfo;
      let that = this;
      this.$https
        .get(that.$api.common.activityGoodsList, params)
        .then((res) => {
          let array = res.data.data.records;
          if (array.length > 0) {
            this.list = this.$commonFn.scrollPushFn(this.list, array);
          }
          this.isLoading = false;
        });
    },
    toDetail(val) {
      this.$router.push({
        path: "commodityDetail",
        query: {
          obj: val,
        },
      });
    },
    onSearch(val) {
      this.selectInfo = val;
      this.isSearch = false;
      console.log("成功");
      this.getActivityList();
    },
    showSearch() {
      this.selectData = this.selectInfo;
      this.isSearch = true;
    },
    cancelSearch() {
      this.isSearch = false;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  background-color: #ffffff;
  padding: 12px;
  box-sizing: border-box;
  .item-active {
    margin-top: 0 !important;
  }
  .item {
    margin-top: 10px;
    display: flex;
    .itemImage {
      height: 90px;
      width: 90px;
    }
    .itemRight {
      position: relative;
      width: 260px;
      height: 90px;
      .itemTitle {
        color: #2c2c2c;
        font-size: 14px;
        font-weight: bold;
        width: 247.5px;
        position: absolute;
        left: 11.5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .itemNum {
        color: #959595;
        font-size: 12px;
        position: absolute;
        left: 10.5px;
        top: 45px;
        &::after {
          content: "人购买";
        }
      }
      .itemPirce {
        color: #da251c;
        font-size: 15px;
        font-weight: bold;
        position: absolute;
        left: 10.5px;
        bottom: 3px;
        &::before {
          content: "￥";
          font-weight: 400;
        }
      }
      .itemIcon {
        height: 24.5px;
        width: 24.5px;
        position: absolute;
        right: 8px;
        bottom: 4.5px;
      }
    }
  }
}
</style>