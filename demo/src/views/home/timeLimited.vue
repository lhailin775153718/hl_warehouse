<template>
  <div>
    <hl-header :header="header" />

    <div class="time">
      <div class="time-item">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>10}">10:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>10}"
        >{{nowTime>10?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>12}">12:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>12}"
        >{{nowTime>10?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>14}">14:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>14}"
        >{{nowTime>10?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>16}">16:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>16}"
        >{{nowTime>10?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>18}">18:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>18}"
        >{{nowTime>10?'抢购中':'尚未开始'}}</div>
      </div>
    </div>

    <div class="commodity">
      <div
        class="commodity-item"
        :class="{'commodityFirst':index == 0}"
        v-for="(item,index) in commodity"
        :key="index"
      >
        <img class="commodity-item-image" :src="item.src" />
        <div class="commodity-item-content">
          <p class="contentName">{{item.name}}</p>
          <span class="contentNum">{{item.num + '人购买'}}</span>
          <span class="contentPrice">
            <span class="Currency">￥</span>
            {{item.price}}
          </span>
          <div class="contentBtn">
            <p class="contentBtn-text">去抢购</p>
            <div class="contentBtn-progress">
              <van-progress
                color="#FFFFFF"
                :percentage="50"
                :show-pivot="false"
                track-color="#FF948D"
              />
              <span class="contentBtn-progressNum">50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress } from "vant";
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "限时秒杀",
        isLeftArrow: true
      },
      nowTime: new Date().getHours(),
      commodity: [
        {
          name: "Burberry红粉恋歌/粉红风格女士Burberry红粉恋歌/粉红风格女士...",
          src: "../../../static/image/loginLogo.png",
          num: "623",
          price: "66.00"
        },
        {
          name: "Burberry红粉恋歌/粉红风格女士Burberry红粉恋歌/粉红风格女士...",
          src: "../../../static/image/loginLogo.png",
          num: "623",
          price: "66.00"
        }
      ]
    };
  },
  components: {
    "hl-header": header,
    "van-progress": Progress
  }
};
</script>

<style lang="less" scoped>
.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding: 0 12.5px;
  background-color: #ffffff;
  .time-item {
    display: flex;
    flex-direction: column;
    text-align: center;
    .time-item-top {
      color: #2c2c2c;
      font-size: 17px;
      font-weight: bold;
    }
    .time-item-top-active {
      color: #da251c;
    }
    .time-item-bottom {
      color: #959595;
      font-size: 12px;
    }
    .time-item-bottom-active {
      background: url("../../../static/image/block3.png");
      background-size: 100% 100%;
      color: #ffffff;
    }
  }
}

.commodity {
  margin: auto;
  margin: 12.5px 12.5px 0;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12.5px 0;
  .commodityFirst {
    margin-top: 0 !important;
  }
  .commodity-item {
    display: flex;
    margin-top: 12.5px;
    .commodity-item-image {
      height: 90px;
      width: 90px;
    }
    .commodity-item-content {
      position: relative;
      width: 235px;
      height: 90px;
      .contentName {
        position: absolute;
        top: 3px;
        left: 11.5px;
        width: 220px;
        color: #2c2c2c;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .contentNum {
        position: absolute;
        top: 45px;
        left: 10.5px;
        color: #959595;
        font-size: 12px;
      }
      .Currency {
        color: #da251c;
        font-size: 13px;
        font-weight: 400;
      }
      .contentPrice {
        position: absolute;
        bottom: 5px;
        left: 13px;
        color: #da251c;
        font-size: 15px;
        font-weight: bold;
      }
      .contentBtn {
        position: absolute;
        left: 153px;
        bottom: 0.5px;
        height: 40.5px;
        width: 80.5px;
        background-image: url("../../../static/image/block1.png");
        background-size: 100% 100%;
        p {
          color: #ffffff;
          font-size: 14px;
          margin-top: 5px;
          text-align: center;
        }
        .contentBtn-progress {
          display: flex;
          justify-content: center;
          align-items: center;
          /deep/ .van-progress {
            width: 45.5px;
          }
          .contentBtn-progressNum {
            color: #ffffff;
            font-size: 8px;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>