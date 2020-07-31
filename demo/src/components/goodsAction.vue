<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="小店" />
      <van-goods-action-icon icon="shop-o" text="客服" />
      <van-goods-action-button color="#FF6800" type="warning" text="加入购物车" @click="addCar" />
      <van-goods-action-button color="#DB2016" type="danger" text="立即购买" />
    </van-goods-action>
    <van-popup v-model="show" position="bottom">
      <div class="popup-container">
        <img class="popup-image" :src="imageUrl + detail.image" alt />
        <span class="price">{{price}}</span>
        <img class="close" src="../../static/image/close.png" @click="closeAction" alt />

        <div class="scroll">
          <div class="parameter" v-for="(item,index) in detail.goodsSpecVOS" :key="index">
            <span class="parameterTitle">{{item.title}}</span>
            <div class="parameterContent">
              <span
                v-for="(items,indexs) in item.specProperties"
                :key="indexs"
                :class="{'itemsActive': items.select }"
                @click="pickParameter(items, item)"
              >{{items.propertyName}}</span>
            </div>
          </div>
        </div>
        <div class="buyMun">
          <span>购买数量</span>
          <van-stepper
            class="stepper"
            v-model="num"
            min="1"
            disable-input
            input-width="40px"
            button-size="32px"
          />
        </div>
        <div class="submitBtn" @click="submit">确定</div>
      </div>
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
} from "vant";
import Storage from "../js/storage";
export default {
  props: ["detail"],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      show: false,
      num: 1,
      price: 0,
      formData: [],
      specDetail: "",
      priceCode: "",
    };
  },
  components: {
    "van-goods-action": GoodsAction,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action-button": GoodsActionButton,
    "van-popup": Popup,
    "van-stepper": Stepper,
  },
  created() {},
  mounted() {},
  methods: {
    addCar() {
      this.show = true;
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
      let that = this;
      this.$https.get(that.$api.common.getPrice, params).then((res) => {
        this.price = res.data.data == null ? 0 : res.data.data.price;
      });
    },
    submit() {
      let params = {
        shopCode: this.detail.shopCode,
        goodsCode: this.detail.goodsCode,
        userCode: Storage.getItem("userInfo").userCode,
        num: this.num,
        specDetail: this.specDetail,
        priceCode: this.priceCode,
      };
      let that = this;
      this.$https.post(that.$api.common.addGoods, params).then((res) => {
        console.log(res);
      });
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
  border: 1px solid #da251c;
  background-color: #ffffff !important;
  color: #da251c;
}
/deep/ .van-popup {
  overflow-y: visible;
}
/deep/ .van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
