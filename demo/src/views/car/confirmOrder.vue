<template>
  <div>
    <hl-header :header="header"></hl-header>
    <div class="itemB flex_c_sb" @click="pickAddress">
      <div class="blockA img"></div>
      <div class="blockB">
        <div>{{address.receiver}} {{address.phone}}</div>
        <div
          class="address"
        >地址:{{address.provinceName + address.cityName + address.districtName + address.detail}}</div>
      </div>
      <div class="blockA img2"></div>
    </div>

    <div class="commodityContainer" v-for="(item,index) in orderData" :key="index">
      <div class="commodityTop">
        <div class="icon"></div>
        <div class="title">{{item.shopName}}</div>
      </div>
      <div class="commodity flex_c_sb" v-for="items in item.shoppingCarGoodsList" :key="items.id">
        <div style="width:100%;">
          <div class="flex_c_sb">
            <img class="img" :src="imageUrl + items.goodsImage" />
            <div class="content">
              <div class="name">{{items.goodsName}}</div>
              <div class="price flex_c_sb">
                <div class="oprice">{{items.price}}</div>
                <div class="num">x {{items.number}}</div>
              </div>
            </div>
          </div>
          <div class="itemC">
            <textarea placeholder="给卖家留言..."></textarea>
          </div>

          <div class="itemD">
            <div class="itemPrice" style="text-align: right">
              <span>共{{items.number}}件商品,合计</span>
              ￥{{items.price}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="itemC">
      <textarea placeholder="给卖家留言..."></textarea>
    </div>

    <div class="itemD">
      <div class="flex_c_sb itemList" v-for="(item, index) in orderData.itemBlist" :key="index">
        <div class="key">{{item.name}}</div>
        <div class="value">{{item.value}}</div>
      </div>
      <div class="itemPrice" style="text-align: right">
        <span>共{{count}}件商品,合计</span>
        ￥{{price}}
      </div>
    </div>-->

    <van-cell-group style="margin-top:10px;">
      <van-cell title="支付方式" :value="pay" is-link center @click="toPage('/payment')" />
      <van-cell title="可以用500金币抵￥5.00" center>
        <template #right-icon>
          <van-switch v-model="checked" size="20" active-color="#D8674D" inactive-color="#f5f5f5" />
        </template>
      </van-cell>
      <!-- <van-cell title="优惠券" is-link center /> -->
    </van-cell-group>

    <van-cell-group style="margin-top:10px;margin-bottom:70px;">
      <van-cell title="商品金额" :value="'￥' + price" center />
      <!-- <van-cell title="+运费" value="7" center></van-cell> -->
      <van-cell title="-优惠券折扣" :value="count" center />
    </van-cell-group>

    <div class="footer">
      <span class="span1">共{{count}}件,</span>
      <span class="span2">合计:</span>
      <span class="span3">￥</span>
      <span class="price">{{price-count}}</span>
      <div class="submitOrder" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>


<script>
import { Stepper, Cell, CellGroup, Switch } from "vant";
import Bus from "@/js/bus.js";
export default {
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      header: {
        title: "确认订单",
        isLeftArrow: true,
      },
      orderData: {},
      address: {},
      count: 0,
      price: 0,
      checked: false,
      selectForm: {
        userCode: this.$storage.getItem("userInfo").userCode,
        page: 1,
        pageSize: 1,
      },
      pay: "",
    };
  },
  components: {
    "hl-header": () => import("@/components/header"),
    "van-stepper": Stepper,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-switch": Switch,
  },
  created() {
    this.getQuery();
    this.initialize();
    this.getAddress();
  },
  methods: {
    getQuery() {
      this.orderData = JSON.parse(this.$route.query.order);
      let temp = [];
      this.orderData.forEach((item) => {
        item.shoppingCarGoodsList.forEach((res) => {
          if (res.checked) {
            temp.push(item);
          }
        });
      });
      this.orderData = temp;
    },
    initialize() {
      this.orderData.forEach((res) => {
        res.shoppingCarGoodsList.forEach((res1) => {
          this.price += res1.price;
          this.count += res1.number;
        });
      });
      this.pay = this.$storage.getItem("pay");
    },
    getAddress() {
      let address = JSON.parse(this.$storage.getItem("address"));
      if (address != null) {
        this.address = address;
      } else {
        let that = this;
        this.$https
          .get(that.$api.common.getUserAddress, that.selectForm)
          .then((res) => {
            this.address = res.data.data.records[0];
          });
      }
    },
    toPage(path) {
      this.$router.push({
        path: path,
      });
    },
    pickAddress() {
      this.$router.push({
        path: "/addressList",
        query: {
          isOrder: 1,
        },
      });
    },
    submitOrder() {
      let that = this;
      let params = {
        payType: 1,
      };
      this.$https.post(that.$api.common.createOrder, params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style scoped lang="less">
.flex_c_sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.itemB .blockB,
.itemA .blockA {
  flex: 1;
}
.itemA {
  background-color: #cf332e;
  color: #ffffff;
  font-size: 15px;
  height: 100px;
  padding: 15px;
  box-sizing: border-box;
  .time {
    margin-top: 5px;
  }
  .img {
    height: 50px;
    width: 50px;
    background-image: url("../../../static/image/mineIcon1.png");
    background-size: 100% 100%;
    margin-right: 35px;
  }
}
.itemB {
  background-color: #ffffff;
  padding: 13px;
  box-sizing: border-box;
  font-size: 14px;
  color: #2c2c2c;
  .address {
    font-size: 15px;
    overflow: hidden;
    margin-top: 5px;
    text-overflow: ellipsis;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img {
    height: 16.5px;
    width: 13px;
    background-image: url("../../../static/image/address.png");
    background-size: 100% 100%;
    margin-right: 15.5px;
  }
  .img2 {
    height: 14.5px;
    width: 8.5px;
    background-image: url("../../../static/image/turn2.png");
    background-size: 100% 100%;
    margin-right: 10px;
  }
}
.commodityContainer {
  margin-top: 10px;
  background-color: #ffffff;
  padding: 13px;
  box-sizing: border-box;
  .commodityTop {
    display: flex;
    align-items: center;
    .icon {
      height: 14px;
      width: 14.5px;
      background-image: url("../../../static/image/carLogo1.png");
      background-size: 100% 100%;
    }
    .title {
      color: #9c9c9c;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .commodity {
    margin-top: 10px;
    .img {
      height: 50px;
      width: 50px;
    }
    .name {
      color: #2c2c2c;
      font-size: 12px;
      text-overflow: ellipsis;
      display: -webkit-box !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .content {
      flex: 1;
      justify-content: space-between;
      margin-left: 10px;
      > div {
        width: 100%;
      }
      .name {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .oprice {
      color: #747474;
      font-size: 12px;
      &::before {
        content: "￥";
        margin-right: 3px;
      }
    }
    .num {
      color: #747474;
      font-size: 12px;
    }
  }
}
.itemC {
  color: #959595;
  font-size: 12px;
  background-color: #ffffff;
  padding: 10px 0;
  box-sizing: border-box;
  text-align: center;
  > textarea {
    background-color: #f5f5f5;
    padding: 10px 13px;
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: 5px;
    resize: none;
  }
}
.itemD {
  background-color: #ffffff;
  // padding: 0 13px 10px;
  box-sizing: border-box;
  .itemList {
    height: 30px;
    .key {
      color: #747474;
      font-size: 14px;
    }
    .value {
      font-size: 14px;
      color: #2c2c2c;
    }
  }
  .itemPrice {
    color: #da251c;
    font-size: 14px;
    > span {
      font-size: 14px;
      color: #959595;
    }
    // &::before {
    //   content: "实付：";
    //   font-size: 14px;
    //   color: #959595;
    // }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  // line-height: 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    margin-right: 5px;
  }
  .span1 {
    color: #959595;
    font-size: 12px;
  }
  .span2 {
    color: #747474;
    font-size: 14px;
  }
  .span3 {
    color: #da251c;
    font-size: 10px;
  }
  .price {
    color: #da251c;
    font-size: 16px;
  }
  .submitOrder {
    height: 35.5px;
    line-height: 35.5px;
    width: 90px;
    border-radius: 17.75px;
    background-color: #da251c;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    margin-right: 15px;
  }
}
</style>
