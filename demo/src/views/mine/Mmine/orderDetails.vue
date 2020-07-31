<template>
  <div>
    <hl-header :header="header"></hl-header>
    <div class="itemA flex_c_sb">
      <div class="blockA">
        <div>等待买家付款</div>
        <div class="time">剩下23小时59分自动关闭</div>
      </div>
      <div class="blockB img"></div>
    </div>
    <div class="itemB flex_c_sb">
      <div class="blockA img"></div>
      <div class="blockB">
        <div>{{orderData.name}} {{orderData.phone}}</div>
        <div class="address">地址:{{orderData.address}}</div>
      </div>
    </div>

    <div class="commodityContainer">
      <div class="commodityTop">
        <div class="icon"></div>
        <div class="title">华山自营</div>
      </div>
      <div class="commodity flex_c_sb">
        <div class="img">img</div>
        <div class="content">
          <div class="name">{{orderData.commodityName}}</div>
          <div class="price flex_c_sb">
            <div class="oprice">{{orderData.price}}</div>
            <div class="num">x {{orderData.nub}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="itemC">
      <div>{{orderData.beizhu}}</div>
    </div>

    <div class="itemD">
      <div class="flex_c_sb itemList" v-for="(item, index) in orderData.itemBlist" :key="index">
        <div class="key">{{item.name}}</div>
        <div class="value">{{item.value}}</div>
      </div>
      <div class="itemPrice" style="text-align: right">￥{{orderData.Allprice}}</div>
    </div>

    <div class="itemE">
      <div class="fuzhi">复制</div>
      <div
        class="itemEList"
        v-for="(item, index) in  orderData.itemAlist"
        :key="index"
      >{{item.name}} {{item.value}}</div>
    </div>

    <div class="footer">
      <div class="cencal">取消订单</div>
      <div class="pay">去支付</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      header: {
        title: "订单详情",
        isLeftArrow: true,
      },
      orderData: {},
    };
  },
  components: {
    "hl-header": () => import("@/components/header"),
  },
  created() {
    let data = {
      src: "",
      commodityName:
        "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
      specs: "5kg",
      price: "66.00",
      nub: 2,
      Allprice: 123,
      itemAlist: [
        { name: "订单编号：", value: 123456123456 },
        { name: "下单时间：", value: 123456123456 },
        { name: "发货时间：", value: 123456123456 },
        { name: "自动签收：", value: 123456123456 },
      ],
      itemBlist: [
        { name: "商品总金额：", value: 123 },
        { name: "运费：", value: 123 },
        { name: "积分：", value: 123 },
        { name: "优惠券：", value: 123 },
      ],
      name: "林小姐",
      phone: "13247845465465",
      address: "地址啊是吧是吧是吧是吧是吧是吧是吧是吧是吧",
      beizhu: "地址啊是吧是吧是吧是吧是吧是吧是吧是吧是吧",
    };
    this.orderData = data;
  },
  methods: {},
};
</script>
<style scoped lang="less">
.flex_c_sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.itemE {
  width: 100%;
  position: relative;
  margin-top: 10px;
  background-color: #ffffff;
  padding: 13px;
  box-sizing: border-box;
  margin-bottom: 70px;
  .itemEList {
    color: #959595;
    font-size: 12px;
    height: 30px;
  }
  .fuzhi {
    position: absolute;
    top: 13px;
    right: 13px;
    color: #da251c;
    font-size: 12px;
  }
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
    background-image: url("../../../../static/image/mineIcon1.png");
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
    background-image: url("../../../../static/image/dizhi.png");
    background-size: 100% 100%;
    margin-right: 15.5px;
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
      background-image: url("../../../../static/image/carLogo1.png");
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
      background: #da251b;
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
  color: #2c2c2c;
  font-size: 12px;
  background-color: #ffffff;
  padding: 10px 0;
  box-sizing: border-box;
  > div {
    background-color: #f5f5f5;
    padding: 10px 13px;
    box-sizing: border-box;
    width: 355px;
    margin: auto;
    border-radius: 5px;
  }
}
.itemD {
  background-color: #ffffff;
  padding: 0 13px 10px;
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
    &::before {
      content: "实付：";
      font-size: 14px;
      color: #959595;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 40px;
  background-color: #ffffff;
  text-align: right;
  .cencal {
    color: #747474;
    font-size: 12px;
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #747474;
    border-radius: 15px;
    display: inline-block;
    margin-right: 10px;
  }
  .pay {
    color: #ffffff;
    background-color: #da251c;
    font-size: 12px;
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    display: inline-block;
    margin-right: 13px;
  }
}
</style>
