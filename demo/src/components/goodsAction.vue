<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="小店" @click="showShop" />
      <van-goods-action-icon icon="shop-o" text="客服" />
      <van-goods-action-button color="#FF6800" type="warning" text="加入购物车" @click="addCar" />
      <van-goods-action-button color="#DB2016" type="danger" text="立即购买" @click="showBuy" />
    </van-goods-action>

    <van-popup v-model="show" position="bottom" @touchmove.prevent>
      <div class="popup-container">
        <img class="popup-image" :src="imageUrl + detail.image" alt />
        <span class="price">{{price == 0 ? (detail.minPrice/100).toFixed(2) + '-' + (detail.maxPrice/100).toFixed(2) : (price/100*num).toFixed(2)}}</span>
        <img class="close" src="../assets/image/close.png" @click="closeAction" alt />

        <div class="scroll">
          <div class="parameter" v-for="(item,index) in detail.goodsSpecVOS" :key="index">
            <span class="parameterTitle">{{item.title}}</span>
            <div class="parameterContent">
              <span v-for="(items,indexs) in item.specProperties" :key="indexs" :class="{'itemsActive': items.select }" @click="pickParameter(items, item)" >{{items.propertyName}}</span>
            </div>
          </div>
        </div>
        <div class="buyMun">
          <span>购买数量</span>
          <van-stepper class="stepper" v-model="num" min="1" disable-input input-width="40px" button-size="32px" />
        </div>
        <div v-if="!isBuy" class="submitBtn" @click="submit">确定</div>
        <div v-if="isBuy" class="submitBtn" @click="buy">立刻购买</div>
      </div>
    </van-popup>

    <van-popup v-model="isShowShop" class="recommendBg" position="bottom" @touchmove.prevent>
      <div class="shopTitle">
        <div class="shopName">{{shop.shopName}}</div>
        <img class="shopLogo" :src="imageUrl + shop.logoUrl" alt />
        <div class="shopColumn">
          <div class="colunmItem">
            <div class="shopNum">{{shopCount}}</div>
            <div class="all">全部商品</div>
          </div>
          <div class="colunmItem" @click="couponShow = true;">
            <img class="img" src="../assets/image/mineIcon2.png" />
            <div class="all">优惠券</div>
          </div>
        </div>
      </div>
      <div class="recommendTitle">
        <img src="../assets/image/carLogo.png" />
        <span>推荐商品</span>
      </div>
      <van-list ref="listloading" v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="getShopList" >
        <div class="recommend">
          <div class="recommend-item" :class="{'recommendFirst':index == 0 || index == 1}" v-for="(item,index) in recommend" :key="index" @click="toDetail(item)" >
            <img class="recommend-item-image" :src="imageUrl + item.image" />
            <div class="recommend-item-content">
              <p>{{item.goodsName}}</p>
              <span class="contentPrice">
                <span class="Currency">￥</span>
                {{(item.price/100).toFixed(2)}}
              </span>
              <img class="contentImage" src="../assets/image/carLogo.png" />
            </div>
          </div>
        </div>
      </van-list>
    </van-popup>

    <van-popup v-model="couponShow" position="right" style="width: 100%;">
      <div class="popupHeader" @click="couponShow = false">
        <van-icon size="16" name="arrow-left"/>
        <span>确定</span>
      </div>
      <hl-coupon ref="coupon" :couponList="couponList" @userReceive="userReceive" />
    </van-popup>
  </div>
</template>

<script>
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Popup,
  Stepper,
  List,
  Icon
} from "vant";
import coupon from '@/components/coupon'
import Storage from "../js/storage";
export default {
  props: ["detail", "activityId"],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      show: false,
      isShowShop: false,
      num: 1,
      price: 0,
      formData: [],
      recommend: [],
      shop: {},
      shopCount: 0,
      specDetail: "",
      priceCode: "",
      isBuy: false,
      finished: false,
      loading: false,
      selectInfo: {
        page: 1,
        pageSize: 10,
        orderBy: "desc",
        sort: "sales",
      },
      couponShow: false,
      couponList: []
    };
  },
  components: {
    "van-goods-action": GoodsAction,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action-button": GoodsActionButton,
    "van-popup": Popup,
    "van-stepper": Stepper,
    "van-list": List,
    "hl-coupon": coupon,
    "van-icon": Icon
  },
  created() {
    
  },
  mounted() {},
  methods: {
    getShopList() {
      let params = JSON.parse(JSON.stringify(this.selectInfo));
      params.shopCode = this.detail.shopCode;
      let that = this;
      this.$https.get(that.$api.common.GoodsList, params).then((res) => {
        let array = res.data.data.records;
        this.recommend.push(...array);

        if (this.selectInfo.page < res.data.data.pages) {
          this.selectInfo.page++;
          this.loading = false;
        } else {
          this.finished = true;
        }
        this.shopCount = res.data.data.total;
      });
    },
    getShop() {
      let params = {
        userCode: this.$storage.getItem("userInfo").userCode,
        shopCode: this.detail.shopCode,
      };
      let that = this;
      this.$https.get(that.$api.common.getShop, params).then((res) => {
        this.shop = res.data.data;
      });
    },
    getShopCouponList() {
      let params = {
        page: 1,
        pageSize: 10,
        userCode: this.$storage.getItem("userInfo").userCode,
        actStatus: 2,
        shopCode: this.detail.shopCode
      };
      let that = this;
      this.$https.get(that.$api.common.getShopCoupon, params).then((res) => {
        this.couponList = res.data.data.records;
      });
    },
    addCar() {
      this.show = true;
      this.isBuy = false;
    },
    showBuy() {
      this.show = true;
      this.isBuy = true;
    },
    closeAction() {
      this.show = false;
    },
    pickParameter(items, item) {
      item.specProperties.forEach((res) => {
        res.select = false;
      });
      items.select = true;

      this.specDetail = "";
      this.priceCode = "";
      this.detail.goodsSpecVOS.forEach((item) => {
        item.specProperties.forEach((res) => {
          if (res.select) {
            this.specDetail += res.propertyName + ",";
            this.priceCode += res.id;
          }
        });
      });
      
      let params = {
        code: this.priceCode,
      };
      if(this.activityId) {
        params.activityId = this.activityId;
      }
      let that = this;
      this.$https.get(that.$api.common.getPrice, params).then((res) => {
        this.price = res.data.data.price == null ? 0 : res.data.data.price;
      });
    },
    submit() {
      if(this.price == 0 || this.price == null) {
        this.$toast.fail("请选择商品规格");
        return
      }

      let params = {
        shopCode: this.detail.shopCode,
        goodsCode: this.detail.goodsCode,
        userCode: Storage.getItem("userInfo").userCode,
        num: this.num,
        specDetail: this.specDetail,
        priceCode: this.priceCode,
      };
      if(this.activityId) {
        params.activityId = this.activityId;
      }
      let that = this;
      this.$https.post(that.$api.common.addGoods, params).then((res) => {
        this.$toast.success("已加入购物车");
      });
    },
    buy() {
      if(this.price == 0 || this.price == null) {
        this.$toast.fail("请选择商品规格");
        return
      }

      let params = {
        id: this.detail.id,
        shopCode: this.detail.shopCode,
        userCode: this.$storage.getItem("userInfo").userCode,
        goodsCode: this.detail.goodsCode,
        num: this.num,
        specDetail: this.specDetail,
        priceCode: this.priceCode,
        activityId: this.detail.id,
      };
      let that = this;
      this.$https.post(that.$api.common.buyGoods, params).then((res) => {
        this.$router.push({
          path: "confirmOrder",
          query: {
            order: JSON.stringify(res.data.data),
          },
        });
      });
    },
    showShop() {
      this.isShowShop = true;
    },
    toPage(path) {
      this.$router.push({
        path: path,
        query: {
          obj: JSON.stringify(this.detail),
        },
      });
    },
    userReceive(val) {
      let that = this;
      let params = {
        actCode: val.actCode,
        userCode: this.$storage.getItem("userInfo").userCode,
      }
      this.$https.post(that.$api.common.userReceive, params).then((res) => {
        this.getShopCouponList();
      });
    },
  },
  watch: {
    detail(newVal, oldVal) {
      this.getShopList();
      this.getShop();
      this.getShopCouponList();
    },
  },
};
</script>

<style scoped lang="less">
.popup-container {
  position: relative;
  padding: 60px 12.5px 10.5px;
  box-sizing: border-box;
  .popup-image {
    height: 75px;
    width: 75px;
    position: absolute;
    top: -20px;
    left: 12.5px;
    z-index: 100000;
  }
  .price {
    position: absolute;
    left: 97.5px;
    top: 16.5px;
    color: #da251c;
    font-size: 17px;
    font-weight: Bold;
    &::before {
      content: "￥";
      font-size: 12px;
      font-weight: 400;
    }
  }
  .close {
    height: 16.5px;
    width: 16.5px;
    position: absolute;
    top: 16.5px;
    right: 12.5px;
  }
  .scroll {
    max-height: 300px;
    overflow-y: auto;
    .parameter {
      margin-top: 15px;
      .parameterTitle {
        font-size: 14px;
        color: #747474;
      }
      .parameterContent {
        span {
          display: inline-block;
          padding: 8.5px 20px;
          box-sizing: border-box;
          border-radius: 5px;
          text-align: center;
          font-size: 12px;
          color: #2c2c2c;
          background-color: #f7f4f8;
          margin-right: 10px;
          margin-top: 10px;
          border: 1px solid #f7f4f8;
        }
      }
    }
  }
  .buyMun {
    margin-top: 15px;
    height: 40px;
    align-items: center;
    line-height: 40px;
    span {
      font-size: 14px;
      color: #747474;
      vertical-align: middle;
    }
    .stepper {
      float: right;
      vertical-align: middle;
    }
  }
  .submitBtn {
    width: 350px;
    height: 44px;
    line-height: 44px;
    margin: auto;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    background-color: #da251c;
    border-radius: 22px;
    margin-top: 15px;
  }
}
.itemsActive {
  border: 1px solid #da251c !important;
  background-color: #ffffff !important;
  color: #da251c !important;
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
      height: 70px;
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
.recommendBg {
  background-color: #f5f5f5;
  padding-top: 50px;
  box-sizing: border-box;
}
.shopTitle {
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  height: 120px;
  width: 350px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  .shopLogo {
    height: 60px;
    width: 60px;
    position: absolute;
    top: -30px;
    right: 15px;
    background-size: 100% 100%;
  }
  .shopName {
    color: #2c2c2c;
    font-size: 20px;
    font-weight: bold;
  }
  .shopColumn {
    display: flex;
    margin-top: 25px;
    .colunmItem {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      .shopNum {
        color: #2c2c2c;
        font-size: 16px;
        font-weight: bold;
      }
      .all {
        color: #000000;
        font-size: 12px;
        margin-top: 10px;
      }
      .img {
        width: 20.5px;
        height: 18.5px;
        background-size: 100% 100%;
        margin: auto;
      }
    }
  }
}
/deep/ .van-popup {
  overflow-y: visible;
}
/deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}
.van-list {
  height: 300px;
  overflow: scroll;
}
</style>
