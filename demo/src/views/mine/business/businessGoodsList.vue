<template>
  <div>
    <hl-header :header="header"></hl-header>

    <div class="list">
      <div
        class="item"
        :class="{'item-active':index == 0}"
        v-for="(item,index) in list"
        :key="index"
        @click="toDetail(item)"
      >
        <div style="display: flex;">
          <img class="itemImage" :src="imageUrl + item.image" alt />
          <div class="itemRight">
            <p class="itemTitle">{{item.goodsName}}</p>
            <span class="itemNum">{{item.sales}}</span>
            <span class="itemPirce">{{(item.price/100).toFixed(2)}}</span>
          </div>
        </div>
        <div class="item-bottom">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
import screening from "@/components/screening";
import { Search } from "vant";
export default {
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      header: {
        title: "商品管理",
        isLeftArrow: true,
      },
      list: [],
      selectForm: {
        page: 1,
        pageSize: 20,
        shopCode: "87392731"
      },
    };
  },
  components: {
    "hl-header": header,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let params = this.selectForm;
      let that = this;
      this.$https
        .get(that.$api.common.GoodsList, params)
        .then((res) => {
          this.list = res.data.data.records;
        });
    },
    toDetail(val) {
      this.$router.push({
        path: "businessGoodsDetail",
        query: {
          obj: JSON.stringify(val),
        },
      });
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
        overflow: hidden;  
        display: -webkit-box;  
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; 
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