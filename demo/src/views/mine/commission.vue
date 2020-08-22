<template>
  <div class="container">
    <!-- <hl-header :header="header"></hl-header> -->
    <div class="top-item">
      <div class="cancelBtn" @click="cancel">
        <img src="../../assets/image/return-w.png" alt />
      </div>
      <img class="topBg" src="../../assets/image/commission/bg.png" alt="">
      <img class="title" src="../../assets/image/commission/title.png" alt="">
      <img class="detail" src="../../assets/image/commission/detail.png" @click="toDetail" alt="">
      <div class="content">
        <span>累计分红佣金</span>
        <div class="bonus">{{(bonus/100).toFixed(2)}}</div>
      </div>
    </div>
    <div class="bottom-item">
      <div class="column">
        <img class="img1" src="../../assets/image/commission/right.png" alt="">
        <img class="img2" src="../../assets/image/commission/right.png" alt="">
        <div class="item">
          <img src="../../assets/image/commission/grid1.png" alt="">
          <span>分享商品给好友</span>
        </div>
        <div class="item">
          <img src="../../assets/image/commission/grid2.png" alt="">
          <span>好友成功下单</span>
        </div>
        <div class="item">
          <img src="../../assets/image/commission/grid3.png" alt="">
          <span>获得分享奖励</span>
        </div>
      </div>
      <div class="btn">
        <img src="../../assets/image/commission/share.png" alt="">
        <span>分享赚钱即得佣金</span>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      bonus: 0
    };
  },
  components: {
    "hl-header": header,
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    toDetail() {
      this.$router.push({
        path: '/commissionList'
      })
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #E65149;
  .top-item {
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
    .topBg {
      width: 100%;
    }
    .title {
      position: absolute;
      left: 0;
      right: 0;
      top: 65.5px;
      margin: auto;
      width: 146px;
    }
    .detail {
      position: absolute;
      right: 13px;
      top: 10.5px;
      width: 80.5px;
    }
    .content {
      position: absolute;
      width: 100%;
      top: 144px;
      span {
        font-size: 14px;
        color: #DA251C;
        margin-left: 74px;
      }
      .bonus {
        text-align: center;
        margin-top: 28px;
        font-size: 36px;
        font-weight: bold;
        color: #DA251C;
        &::before {
          content: "￥";
          font-size: 13px;
          font-weight: 400;
        }
      }
    }
  }
  .bottom-item {
    .column {
      display: flex;
      margin-top: 10px;
      position: relative;
      .img1 {
        position: absolute;
        width: 25.5px;
        left: 113.5px;
        top: 25px;
      }
      .img2 {
        position: absolute;
        width: 25.5px;
        right: 113.5px;
        top: 25px;
      }
      .item {
        display: flex;
        flex-direction: column;
        flex-basis: 33.33%;
        text-align: center;
        img {
          margin:auto auto;
          height: 50px;
          width: 50px;
        }
        span {
          color: #FFFFFF;
          font-size: 10px;
          margin-top: 10px;
        }
      }
    }
    .btn {
      background-color: #FAECB3;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 320px;
      height: 44px;
      margin: auto;
      margin-top: 50px;
      border-radius: 22px;
      img {
        width: 15.5px;
      }
      span {
        color: #DA251C;
        font-size: 14px;
        margin-left: 5px;
        font-weight: Bold;
      }
    }
  }
}
</style>