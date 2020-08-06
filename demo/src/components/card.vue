<template>
  <div>
    <div class="carList">
      <div
        class="carList-item"
        :class="{'carList-active':index > 0}"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="carListTitle">
          <img src="../../static/image/carLogo1.png" alt />
          <span>{{item.shopName}}</span>
        </div>
        <div
          class="carListContainer"
          v-for="(items,indexs) in item.shoppingCarGoodsList"
          :key="indexs"
        >
          <img
            class="checkBox"
            :src="items.checked ? '../../static/image/check.png' : '../../static/image/check-bg.png'"
            alt
            @click="checkItem(items)"
          />
          <img class="carListContainer-image" :src="imageUrl + items.goodsImage" alt />
          <p class="carListContainer-title">{{items.goodsName}}</p>
          <div class="carListContainer-tag">
            <span>{{items.specName}}</span>
            <img src="../../static/image/carLogo2.png" alt />
          </div>
          <span class="carListContainer-price">
            <span class="Currency">￥</span>
            {{items.unitPrice * items.number}}
          </span>
          <div class="carListContainer-num">
            <van-stepper
              class="stepper"
              v-model="items.number"
              min="1"
              disable-input
              input-width="35px"
              button-size="25px"
              @plus="plus(items)"
              @minus="minus(items)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="total">
      <img
        class="total-checkBox"
        :src="checked ? '../../static/image/check.png' : '../../static/image/check-bg.png'"
        alt
        @click="checkTotal()"
      />
      <span class="total-checkBoxText">全选</span>
      <span class="total-price">
        <span class="total-Currency">￥</span>
        {{price}}
      </span>
      <div class="total-btn" @click="submit">去结算</div>
    </div>

    <div class="totalDiv"></div>
  </div>
</template>

<script>
import { Stepper } from "vant";
import Storage from "../js/storage";
export default {
  props: [],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      list: [],
      checked: false,
    };
  },
  components: {
    "van-stepper": Stepper,
  },
  computed: {
    price() {
      let total = 0;
      this.list.forEach((res) => {
        res.shoppingCarGoodsList.forEach((res1) => {
          if (res1.checked) {
            total += res1.number * res1.unitPrice;
          }
        });
      });
      return total;
    },
  },
  created() {
    this.getShopCar();
  },
  methods: {
    getShopCar() {
      let that = this;
      this.$https.get(that.$api.common.getShopCar).then((res) => {
        let temp = res.data.data.shoppingCarShopList;
        temp.forEach((item) => {
          item.shoppingCarGoodsList.forEach((res) => {
            res.checked = false;
          });
        });
        this.list = temp;
      });
    },
    checkItem(items) {
      items.checked = !items.checked;

      let isAllCheck = true;
      this.list.forEach((item) => {
        item.shoppingCarGoodsList.forEach((res) => {
          if (!res.checked) {
            isAllCheck = false;
          }
        });
      });
      this.checked = isAllCheck;
    },
    checkTotal() {
      this.checked = !this.checked;
      this.list.forEach((item) => {
        item.shoppingCarGoodsList.forEach((res) => {
          res.checked = this.checked;
        });
      });
    },
    plus(items) {
      let params = {
        carId: items.id,
        num: 1,
      };
      let that = this;
      this.$https.post(that.$api.common.carAddNum, params).then((res) => {
        console.log(res);
      });
    },
    minus(items) {
      let params = {
        carId: items.id,
        num: -1,
      };
      let that = this;
      this.$https.post(that.$api.common.carAddNum, params).then((res) => {
        console.log(res);
      });
    },
    submit() {
      this.$router.push({
        path: "confirmOrder",
        query: {
          order: JSON.stringify(this.list),
        },
      });
      return;
      let arr = [];
      this.list.forEach((item) => {
        item.shoppingCarGoodsList.forEach((res) => {
          if (res.checked) {
            arr.push(res.id);
          }
        });
      });
      let params = {
        shoppingCarIds: arr,
        userCode: Storage.getItem("userInfo").userCode,
      };
      let that = this;
      this.$https.post(that.$api.common.settlement, params).then((res) => {
        console.log(res);
        this.$router.push({
          path: "confirmOrder",
        });
      });
    },
    getList() {
      return this.list;
    },
  },
};
</script>

<style scoped lang="less">
.carList {
  background-color: #ffffff;
  width: 100%;
  .carList-active {
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .carList-item {
    .carListTitle {
      display: flex;
      height: 40px;
      padding-left: 12.5px;
      box-sizing: border-box;
      align-items: center;
      img {
        height: 13.5px;
        width: 14px;
      }
      span {
        color: #9b9b9b;
        font-size: 12px;
        margin-left: 4.5px;
      }
    }
    .carListContainer {
      position: relative;
      height: 120px;
      padding-top: 10px;
      box-sizing: border-box;
      .checkBox {
        height: 18px;
        width: 18px;
        position: absolute;
        top: 35px;
        left: 12.5px;
      }
      .carListContainer-image {
        height: 90px;
        width: 90px;
        position: absolute;
        left: 46px;
      }
      .carListContainer-title {
        width: 212px;
        color: #2c2c2c;
        font-size: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: absolute;
        right: 14px;
      }
      .carListContainer-tag {
        background-color: #f5f5f5;
        position: absolute;
        height: 24px;
        top: 50px;
        left: 148.5px;
        padding: 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: #747474;
          font-size: 12px;
        }
        img {
          height: 4px;
          width: 7.5px;
          margin-left: 5px;
        }
      }
      .carListContainer-price {
        color: #da251b;
        font-size: 14px;
        position: absolute;
        left: 150.5px;
        top: 87px;
        .Currency {
          font-size: 10px;
        }
      }
      .carListContainer-num {
        font-size: 15px;
        position: absolute;
        width: 105px;
        left: 260px;
        top: 80px;
      }
    }
  }
}
.total {
  height: 53.5px;
  width: 100%;
  position: fixed;
  bottom: 50px;
  left: 0;
  background-color: #ffffff;
  .total-checkBox {
    height: 18px;
    width: 18px;
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .total-checkBoxText {
    color: #747474;
    font-size: 14px;
    line-height: 53.5px;
    position: absolute;
    left: 34.5px;
  }
  .total-priceText {
    color: #747474;
    font-size: 14px;
    line-height: 53.5px;
    position: absolute;
    left: 174.5px;
  }
  .total-price {
    color: #da251b;
    font-size: 16px;
    position: absolute;
    right: 109px;
    line-height: 53.5px;
    &::before {
      content: "合计:";
      color: #747474;
      font-size: 14px;
      margin-right: 5px;
    }
    .total-Currency {
      font-size: 10px;
    }
  }
  .total-btn {
    height: 35.5px;
    line-height: 35.5px;
    width: 90.5px;
    background-image: url("../../static/image/block3.png");
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 9.5px;
    margin: auto;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
  }
}
.totalDiv {
  height: 53.5px;
  width: 100%;
}
</style>
