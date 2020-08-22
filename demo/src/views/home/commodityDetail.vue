<template>
  <div>
    <div class="detailTitle">
      <img-swipe :images="imageList" :swipeData="swipeData" />
      <div class="cancelBtn" @click="cancel">
        <img src="../../assets/image/return-w.png" alt />
      </div>
    </div>
    <div class="detailContent">
      <p class="goodsName">{{goodsDetail.goodsName}}</p>
      <div class="goodsProp">
        <span class="price">{{(goodsDetail.price/100).toFixed(2)}}</span>
        <div class="goodsProp-right">
          <span class="num">已售{{goodsDetail.sales}}件</span>
          <img :src="goodsDetail.isCollect ? '../../assets/image/follow-act.png' : '../../assets/image/follow-bg.png'" @click="collect" />
        </div>
      </div>
    </div>
    <hl-tab style="margin-top:10px;margin-bottom:50px;" v-if="goodsDetail.goodsDetail" :tabForm="goodsDetail.goodsDetail" />
    <hl-goodsAction v-if="goodsDetail" :detail="goodsDetail" />
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
  },
  methods: {
    getQuery() {
      this.dataInfo = JSON.parse(this.$route.query.obj);
      this.getDetail();
    },
    getDetail() {
      let params = {
        activityId: this.dataInfo.id,
      };
      let that = this;
      this.$https.get(that.$api.common.getactivityGoodsDetail, params).then((res) => {
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
    collect() {
      // let params = {
      //   page: 1,
      //   pageSize: 10,
      //   userCode: this.$storage.getItem("userInfo").userCode,
      // };
      // this.$https.get(this.$api.common.getCollectList, params).then((res) => {
      //   console.log(res);
      // });
      // return

      let url = this.goodsDetail.isCollect ? this.$api.common.cancelCollect : this.$api.common.addCollect;
      this.goodsDetail.isCollect = !this.goodsDetail.isCollect;
      let params = {
        goodsCode: this.goodsDetail.goodsCode,
        userCode: this.$storage.getItem("userInfo").userCode,
      };
      let that = this;
      this.$https.get(url, params).then((res) => {
        console.log(res);
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
    position: fixed;
    left: 12.5px;
    top: 12.5px;
    height: 26px;
    width: 26px;
    border-radius: 13px;
    background-color: #797b7d;
    img {
      height: 14px;
      width: 8.5px;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
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
