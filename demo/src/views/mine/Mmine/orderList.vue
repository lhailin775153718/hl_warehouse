<template>
  <div style="height: 100%">
    <hl-header :header="header"></hl-header>
    <van-tabs v-model="active" @click="statusEdit">
      <van-tab class="test123456" v-for="(item, tabIndex) in tabList" :key="tabIndex" :title="item">
        <div class="itemA" :style="{height: height + 'px'}">
          <div class="itemsList" v-for="(item, index) in itemsList" :key="index" @click="toDetail(item)">
            <div class="blockA flex_c_sb">
              <div class="orderId">{{item.orderNo}}</div>
              <div class="orderState">{{tabList[item.status + 1]}}</div>
            </div>
            <div class="commodity flex_c_sb" v-for="items in item.orderDetailList" :key="items.id">
              <img class="img" :src="imageUrl + items.goodsImg" />
              <div class="content">
                <div class="name">{{items.goodsName}}</div>
                <div class="specs">{{items.goodsSpec}}</div>
                <div class="price flex_c_sb">
                  <div class="contentPrice">{{(items.price/100).toFixed(2)}}</div>
                  <div class="contentNumber">x {{items.num}}</div>
                </div>
              </div>
            </div>
            <div class="blockC flex_c_sb">
              <div class="Allprice">{{(item.price/100).toFixed(2)}}</div>
              <div v-if="item.status == 0" class="btn" @click="toPage(item)">去支付</div>
              <div v-if="item.status == 1" class="btn">提醒发货</div>
              <div v-if="item.status == 2" class="btn">查看物流</div>
              <div v-if="item.status == 2" class="btn">确定收货</div>
              <div v-if="item.status == 3" class="btn">去评价</div>
              <div v-if="item.status == 4" class="btn">去评价</div>
              <div v-if="item.status == 5" class="btn" @click="lookLogistics(item)">查看物流</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="showLogistics" position="bottom">
      <van-cell title="物流名称" :value="deliveryName" />
      <van-cell title="物流单号" :value="deliveryId" />
    </van-popup>
  </div>
</template>


<script>
import { Popup, Cell } from 'vant';
export default {
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      header: {
        title: "我的订单",
        isLeftArrow: true,
      },
      active: 0,
      tabList: ["全部", "待付款", "待发货", "待收货", "待评价", "已完成", "退款/售后"],
      itemsList: [],
      height: document.body.clientHeight - 90,
      selectForm: {
        page: 1,
        pageSize: 10,
        // shopCode: "",
        // orderNo: "",
        // userCode: this.$storage.getItem("userInfo").userCode,
        // startTime: "",
        // endTime: "",
      },
      deliveryName: "",
      deliveryId: "",
      showLogistics: false,
    };
  },
  components: {
    "hl-header": () => import("@/components/header"),
    "van-popup": Popup,
    "van-cell": Cell,
  },
  created() {
    this.getQuery();
  },
  methods: {
    getQuery(){
      let status = this.$route.query.status;
      if(status != undefined){
        this.active = status + 1;
        this.getOrderList(status);
      } else {
        this.getOrderList();
      }
    },
    getOrderList(status) {
      let that = this;
      let params = JSON.parse(JSON.stringify(this.selectForm));
      if(status != undefined) {
        params.status = status;
      }
      this.$https.get(that.$api.common.getOrderList, params).then((res) => {
        let array = res.data.data.records;
        if(res.data.data.current == 1) {
          that.itemsList = array;
        } else {
          that.itemsList.push(...array);
        }
      });
    },
    statusEdit(index) {
      if(index != 0) {
        this.itemsList = [];
        this.getOrderList(index - 1);
      } else {
        this.getOrderList();
      }
    },
    toPage(val) {
      let path;
      switch (val.status) {
        case 0:
          path = "/orderDetails";
          break;
        case 1:
          path = "/orderDetails1";
          break;
        case 3:
          path = "/orderDetails3";
          break;
        default:
          return;
      }
      this.$router.push({
        path: path,
        query: {
          obj: JSON.stringify(val),
        },
      });
    },
    lookLogistics(item) {
      console.log(item)
      this.deliveryId = item.deliveryId;
      this.deliveryName = item.deliveryName;
      this.showLogistics = true;
    },
    toDetail(val) {
      console.log(val)
      let path;
      switch (val.status) {
        case 0:
          path = "/orderDetails";
          break;
        case 1:
          path = "/orderDetails1";
          break;
        case 3:
          path = "/orderDetails3";
          break;
        default:
          return;
      }
      this.$router.push({
        path: path,
        query: {
          obj: JSON.stringify(val),
        },
      });
    }
  },
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
  margin-bottom: 10px;
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
