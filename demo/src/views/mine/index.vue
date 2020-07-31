<template>
  <div>
    <div class="header">123</div>
    <div  @click="goRouter('orderDetails')">订单详情</div>
    <div  @click="goRouter('integral')">我的积分</div>
    <div  @click="goRouter('orderList')">订单列表</div>
    <div class="container">
      <div class="order">
        <span class="orderLeft">我的订单</span>
        <span class="orderRight">查看全部订单></span>
      </div>
      <hl-grid :grid="grid" :columnNum="columnNum" />
    </div>
    <van-cell-group>
      <van-cell title="佣金玩法" is-link center icon="../../../static/image/yongjin.png" />
      <van-cell title="我的优惠券" is-link center icon="../../../static/image/youhuiquan.png" />
      <van-cell title="我的收藏" is-link center icon="../../../static/image/follow-act.png" />
      <van-cell title="银行卡管理" is-link center icon="../../../static/image/yinhangka.png" />
      <van-cell title="地址管理" is-link center icon="../../../static/image/dizhi.png" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="帮助中心" is-link center icon="../../../static/image/bangzhu.png" />
      <van-cell title="关于我们" is-link center icon="../../../static/image/guanyuwomen.png" />
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
      console.log('item', item)
      this.$router.push({name: item})
    }
  }
};
</script>

<style scoped lang="less">
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
