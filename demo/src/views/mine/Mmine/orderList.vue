<template>
  <div style="height: 100%">
    <hl-header :header="header"></hl-header>
    <van-tabs v-model="active">
      <van-tab class="test123456" v-for="(item, index) in tabList" :key="index" :title="item.name">
        <div class="itemA" :style="{height: height + 'px'}">
          <div class="itemsList" v-for="(item, index) in itemsList" :key="index">
            <div class="blockA flex_c_sb">
              <div class="orderId">{{item.orderId}}</div>
              <div class="orderState">{{item.state}}</div>
            </div>
            <div class="commodity flex_c_sb">
              <div class="img">img</div>
              <div class="content">
                <div class="name">{{item.commodityName}}</div>
                <div class="specs">{{item.specs}}</div>
                <div class="price flex_c_sb">
                  <div class="contentPrice">{{item.price}}</div>
                  <div class="contentNumber">x {{item.nub}}</div>
                </div>
              </div>
            </div>
            <div class="blockC flex_c_sb">
              <div class="Allprice">{{item.Allprice}}</div>
              <div class="btn">产看物流</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
export default {
  data() {
    return {
      header: {
        title: "我的订单",
        isLeftArrow: true,
      },
      active: 0,
      tabList: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待发货" },
        { name: "待收货" },
        { name: "已完成" },
      ],
      itemsList: [],
      height: document.body.clientHeight - 90,
    };
  },
  components: {
    "hl-header": () => import("@/components/header"),
  },
  created() {
    let data = [
      {
        orderId: "777777",
        state: "已完成",
        src: "",
        commodityName:
          "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
        specs: "5kg",
        price: "66.00",
        nub: 2,
        Allprice: 123,
      },
      {
        orderId: "777777",
        state: "已完成",
        src: "",
        commodityName:
          "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
        specs: "5kg",
        price: "66.00",
        nub: 2,
        Allprice: 123,
      },
      {
        orderId: "777777",
        state: "已完成",
        src: "",
        commodityName:
          "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
        specs: "5kg",
        price: "66.00",
        nub: 2,
        Allprice: 123,
      },
      {
        orderId: "777777",
        state: "已完成",
        src: "",
        commodityName:
          "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
        specs: "5kg",
        price: "66.00",
        nub: 2,
        Allprice: 123,
      },
      {
        orderId: "777777",
        state: "已完成",
        src: "",
        commodityName:
          "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
        specs: "5kg",
        price: "66.00",
        nub: 2,
        Allprice: 123,
      },
      {
        orderId: "777777",
        state: "已完成",
        src: "",
        commodityName:
          "爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十",
        specs: "5kg",
        price: "66.00",
        nub: 2,
        Allprice: 123,
      },
    ];
    this.itemsList = data;
  },
  methods: {},
};
</script>
<style scoped lang="less">
/deep/ .van-tabs__wrap--scrollable .van-tab {
  flex-basis: 20% !important;
}
.itemsList {
  width: 100%;
  background-color: #ffffff;
  padding: 12.5px;
  box-sizing: border-box;
  margin-top: 10px;
}
.itemA {
  overflow-y: scroll;
}
.blockA {
  height: 30px;
  font-size: 12px;
  .orderId {
    color: #2c2c2c;
    font-size: 12px;
    &::before {
      content: "订单号:";
      color: #9c9c9c;
      margin-right: 5px;
    }
  }
  .orderState {
    font-size: 12px;
    color: #da251c;
  }
}
.commodity {
  .img {
    height: 90px;
    width: 90px;
    background: #da251b;
  }
  .content {
    flex: 1;
    margin-left: 12px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    height: 90px;
    > div {
      width: 100%;
    }
    .name {
      font-size: 14px;
      color: #2c2c2c;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .specs {
      color: #959595;
      font-size: 12px;
    }
    .price {
      .contentPrice {
        color: #2c2c2c;
        font-size: 14px;
        &::before {
          content: "￥";
          font-size: 12px;
        }
      }
      .contentNumber {
        color: #959595;
        font-size: 12px;
      }
    }
  }
}
.blockC {
  margin-top: 15px;
  .Allprice {
    color: #2c2c2c;
    font-size: 14px;
    &::before {
      content: "实付: ￥";
    }
  }
  .btn {
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 30px;
    color: #747474;
    font-size: 12px;
    border: 1px solid #747474;
    border-radius: 15px;
  }
}
.flex_c_sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
