<template>
  <div>
    <div class="detailTitle">
      <img-swipe :images="imageList" :swipeData="swipeData" />
      <div class="cancelBtn" @click="cancel"></div>
    </div>
    <div class="detailContent">
      <p class="goodsName">{{goodsDetail.goodsName}}</p>
      <div class="goodsProp">
        <span class="price">{{goodsDetail.price}}</span>
        <div class="goodsProp-right">
          <span class="num">已售{{goodsDetail.sales}}件</span>
          <img src="../../../static/image/follow-act.png" alt />
        </div>
      </div>
    </div>
    <hl-tab
      style="margin-top:10px;margin-bottom:50px;"
      v-if="goodsDetail.goodsDetail"
      :tabForm="goodsDetail.goodsDetail"
    />
    <hl-goodsAction :detail="goodsDetail" />
  </div>
</template>

<script>
import imgSwipe from "@/components/imgSwipe";
import tab from "@/components/tab";
import goodsAction from "@/components/goodsAction";
export default {
  data() {
    return {
      dataInfo: {},
      goodsDetail: {},
      imageList: [],
      swipeData: {
        height: "375",
      },
    };
  },
  components: {
    "img-swipe": imgSwipe,
    "hl-tab": tab,
    "hl-goodsAction": goodsAction,
  },
  created() {
    this.getQuery();
    this.getDetail();
  },
  methods: {
    getQuery() {
      this.dataInfo = JSON.parse(this.$route.query.obj);
    },
    getDetail() {
      let params = {
        goodsCode: this.dataInfo.goodsCode,
      };
      let that = this;
      this.$https.get(that.$api.common.getGoodsDetail, params).then((res) => {
        let array = res.data.data.goodsMediaList;
        for (let i = 0; i < array.length; i++) {
          let obj = {};
          obj.imgUrl = array[i].fileUrl;
          this.imageList.push(obj);
        }
        res.data.data.goodsSpecVOS.forEach((res) => {
          res.specProperties.forEach((resB) => {
            resB.select = false;
          });
        });
        this.goodsDetail = res.data.data;
      });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.detailTitle {
  position: relative;
  .cancelBtn {
    position: absolute;
    left: 12.5px;
    top: 12.5px;
    height: 26px;
    width: 26px;
    border-radius: 13px;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.detailContent {
  background-color: #ffffff;
  padding: 15px;
  box-sizing: border-box;
  .goodsName {
    color: #2c2c2c;
    font-size: 18px;
    white-space: normal;
  }
  .goodsProp {
    position: relative;
    margin-top: 10px;
    .price {
      font-size: 20px;
      color: #da251c;
      &::before {
        content: "￥";
        font-size: 13px;
      }
    }
    .goodsProp-right {
      position: absolute;
      right: 0;
      top: 0;
      .num {
        color: #a8a8a8;
        font-size: 13px;
        vertical-align: middle;
      }
      img {
        height: 20px;
        width: 20px;
        vertical-align: middle;
      }
    }
  }
}
</style>
