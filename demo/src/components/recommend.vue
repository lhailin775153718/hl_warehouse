<template>
  <van-list
    ref="listloading"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onload"
  >
    <div class="recommend">
      <div
        class="recommend-item"
        :class="{'recommendFirst':index == 0 || index == 1}"
        v-for="(item,index) in recommend"
        :key="index"
        @click="toDetail(item)"
      >
        <img class="recommend-item-image" :src="imageUrl + item.image" />
        <div class="recommend-item-content">
          <p>{{item.goodsName}}</p>
          <span class="contentPrice">
            <span class="Currency">￥</span>
            {{item.price}}
          </span>
          <img class="contentImage" src="../../static/image/carLogo.png" />
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
import { Progress, List } from "vant";
export default {
  props: [],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      recommend: [],
      listInfo: [],
      selectInfo: {
        page: 1,
        pageSize: 10,
        sort: "sales",
      },
      finished: false,
      loading: false,
    };
  },
  components: {
    "van-progress": Progress,
    "van-list": List,
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      let that = this;
      this.$https
        .get(that.$api.common.GoodsList, that.selectInfo)
        .then((res) => {
          let array = res.data.data.records;
          this.recommend.push(...array);
          this.count = res.data.data.pages;

          if (this.selectInfo.page < res.data.data.pages) {
            this.loading = false;
          } else {
            this.finished = true;
          }
        });
    },
    toDetail(val) {
      this.$router.push({
        path: "goodsDetail",
        query: {
          obj: JSON.stringify(val),
        },
      });
    },
    onload() {
      this.selectInfo.page++;
      this.getGoodsList();
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  flex-flow: wrap;
  padding: 12.5px;
  justify-content: space-between;
  .recommendFirst {
    margin-top: 0 !important;
  }
  .recommend-item {
    width: 170px;
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 12.5px;
    .recommend-item-image {
      height: 170px;
      width: 170px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .recommend-item-content {
      position: relative;
      height: 78.5px;
      width: 100%;
      p {
        width: 138px;
        margin: auto;
        color: #2c2c2c;
        font-size: 12px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .Currency {
        color: #da251c;
        font-size: 13px;
        font-weight: 400;
      }
      .contentPrice {
        position: absolute;
        bottom: 15px;
        left: 15.5px;
        color: #da251c;
        font-size: 15px;
        font-weight: bold;
      }
      .contentImage {
        height: 24.5px;
        width: 24.5px;
        position: absolute;
        bottom: 11px;
        right: 15px;
      }
    }
  }
}
</style>