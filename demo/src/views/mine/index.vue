<template>
  <div>
    <div class="header">
      <div class="top">
        <div class="title">我的</div>
        <div class="img"></div>
      </div>
      <div class="head" @click="toPage('/personal')">
        <div class="img"></div>
        <div class="itemA">
          <div class="itemB">
            <div class="name">爱范儿</div>
            <div class="tags">会员</div>
          </div>
          <div class="phone">18825060396</div>
        </div>
      </div>
      <div class="column">
        <div class="balance" @click="toPage('/integral')">
          <div class="num">0</div>
          <div class="text">账户余额(元)</div>
        </div>
        <div class="gold" @click="toPage('/integral')">
          <div class="num">0</div>
          <div class="text">金币</div>
        </div>
        <div class="integral" @click="toPage('/integral')">
          <div class="num">0</div>
          <div class="text">积分</div>
        </div>
      </div>
    </div>
    <!-- <div  @click="goRouter('integral')">我的积分</div> -->
    <div class="container">
      <div class="order">
        <span class="orderLeft">我的订单</span>
        <span class="orderRight" @click="toPage('/orderList')">查看全部订单></span>
      </div>
      <hl-grid :grid="grid" :columnNum="columnNum" />
    </div>
    <van-cell-group>
      <van-cell title="佣金玩法" @click="toPage('/commission')" is-link center icon="../../../static/image/yongjin.png" />
      <van-cell title="我的优惠券" @click="toPage('/coupon')" is-link center icon="../../../static/image/youhuiquan.png" />
      <van-cell title="我的收藏" @click="toPage('/collect')" is-link center icon="../../../static/image/follow-act.png" />
      <van-cell title="银行卡管理" @click="toPage('/bankCard')" is-link center icon="../../../static/image/yinhangka.png" />
      <van-cell title="地址管理" @click="toPage('/addressList')" is-link center icon="../../../static/image/dizhi.png" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="帮助中心" @click="toPage('/commission')" is-link center icon="../../../static/image/bangzhu.png" />
      <van-cell title="关于我们" @click="toPage('/commission')" is-link center icon="../../../static/image/guanyuwomen.png" />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
import grid from "@/components/grid";
export default {
  data() {
    return {
      grid: [
        {
          text: "待付款",
          icon: "../../../static/image/daifukuan.png",
        },
        {
          text: "配送中",
          icon: "../../../static/image/peisongzhong.png",
        },
        {
          text: "已完成",
          icon: "../../../static/image/yiwancheng.png",
        },
        {
          text: "待评价",
          icon: "../../../static/image/daipingjia.png",
        },
        {
          text: "退款/售后",
          icon: "../../../static/image/tuikuan.png",
        },
      ],
      columnNum: 5,
    };
  },
  components: {
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "hl-grid": grid,
  },
  methods: {
    goRouter(item) {
      console.log("item", item);
      this.$router.push({ name: item });
    },
    toPage(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>

<style scoped lang="less">
.header {
  background-color: #cf332e;
  color: #ffffff;
  width: 100%;
  .top {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    .title {
      display: inline-block;
      font-size: 17px;
    }
    .img {
      float: right;
      height: 21.5px;
      width: 21.5px;
      background-image: url("../../../static/image/xiaoxi.png");
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 8.5px;
      margin: auto;
    }
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
    .img {
      height: 55px;
      width: 55px;
      background-image: url("../../../static/image/test.jpg");
      background-size: 100% 100%;
      border-radius: 10px;
    }
    .itemA {
      flex: 1;
      margin-left: 17px;
      .phone {
        font-size: 12px;
        margin-top: 10px;
      }
      .itemB {
        display: flex;
        align-items: center;
        .name {
          font-size: 20px;
          font-weight: bold;
        }
        .tags {
          height: 18px;
          line-height: 18px;
          background-color: #000000;
          font-size: 10px;
          margin-left: 5px;
          border-radius: 5px;
          padding: 0 8px;
          box-sizing: border-box;
        }
      }
    }
  }
  .column {
    display: flex;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 10px 0;
      box-sizing: border-box;
      .num {
        font-size: 17px;
        font-weight: bold;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
.container {
  padding: 0 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-top: 10px;
  .order {
    height: 40px;
    line-height: 40px;
    align-items: center;
    .orderLeft {
      color: #2c2c2c;
      font-size: 16px;
      font-weight: bold;
      vertical-align: middle;
    }
    .orderRight {
      font-size: 12px;
      color: #959595;
      float: right;
      vertical-align: middle;
    }
  }
}
/deep/ .van-cell-group {
  margin-top: 10px;
}
</style>
