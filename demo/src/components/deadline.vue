<template>
  <div class="deadine">
    <div class="title">
      <img class="imgBlock" src="../../static/image/block2.png" />
      <span class="title-left">限时秒杀</span>
      <img class="imgTurn" src="../../static/image/turn.png" />
      <span class="title-right" @click="toPage">查看全部</span>
    </div>

    <div class="time">
      <div class="time-item" @click="changeDeadline('10:00:00')">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>=10}">10:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>=10}"
        >{{nowTime>=10?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item" @click="changeDeadline('12:00:00')">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>=12}">12:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>=12}"
        >{{nowTime>=12?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item" @click="changeDeadline('14:00:00')">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>=14}">14:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>=14}"
        >{{nowTime>=14?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item" @click="changeDeadline('16:00:00')">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>=16}">16:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>=16}"
        >{{nowTime>=16?'抢购中':'尚未开始'}}</div>
      </div>
      <div class="time-item" @click="changeDeadline('18:00:00')">
        <span class="time-item-top" :class="{'time-item-top-active' : nowTime>=18}">18:00</span>
        <div
          class="time-item-bottom"
          :class="{'time-item-bottom-active' : nowTime>=18}"
        >{{nowTime>=18?'抢购中':'尚未开始'}}</div>
      </div>
    </div>

    <div class="commodity">
      <div
        class="commodity-item"
        :class="{'commodityFirst':index == 0}"
        v-for="(item,index) in commodity"
        :key="index"
      >
        <img class="commodity-item-image" :src="imageUrl + item.image" />
        <div class="commodity-item-content">
          <p class="contentName">{{item.goodsName}}</p>
          <span class="contentNum">{{item.sales + '人购买'}}</span>
          <span class="contentPrice">
            <span class="Currency">￥</span>
            {{item.price}}
          </span>
          <div class="contentBtn" @click="toDetail(item)">
            <p class="contentBtn-text">去抢购</p>
            <div class="contentBtn-progress">
              <van-progress
                color="#FFFFFF"
                :percentage="item.ratio"
                :show-pivot="false"
                track-color="#FF948D"
              />
              <span class="contentBtn-progressNum">{{item.ratio}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress } from "vant";
export default {
  /**
   * title:标题
   * leftText:左边文本
   * rightText:右边文本
   * isLeftArrow:是否有返回箭头
   */
  props: [],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      nowTime: new Date().getHours(),
      commodity: [],
      startTime: "",
    };
  },
  components: {
    "van-progress": Progress,
  },
  created() {
    this.changeDeadline("10:00:00");
  },
  methods: {
    getDeadline() {
      let params = {
        page: 1,
        pageSize: 2,
        startTime: this.startTime,
        activityType: 4,
      };
      let that = this;
      this.$https
        .get(that.$api.common.activityGoodsList, params)
        .then((res) => {
          this.commodity = res.data.data.records;
          for (let i = 0; i < this.commodity.length; i++) {
            this.commodity[i].ratio = parseInt(
              (this.commodity[i].sales / this.commodity[i].stock) * 100
            );
            this.commodity[i].ratio =
              this.commodity[i].ratio > 100 ? 100 : this.commodity[i].ratio;
          }
        });
    },
    changeDeadline(val) {
      let date = new Date();
      this.startTime =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        val;
      this.getDeadline();
    },
    toPage() {
      this.$router.push({
        path: "/timeLimited",
      });
    },
    toDetail(val) {
      this.$router.push({
        path: "commodityDetail",
        query: {
          obj: val,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.deadine {
  background-color: #ffffff;
  width: 350px;
  margin: auto;
  border-radius: 10px;
  .title {
    height: 43px;
    line-height: 43px;
    padding: 0 12.5px;
    position: relative;
    .imgBlock {
      width: 4px;
      vertical-align: middle;
    }
    .title-left {
      color: #2c2c2c;
      font-size: 15px;
      font-weight: Bold;
      vertical-align: middle;
    }
    .title-right {
      color: #a8a8a8;
      font-size: 12px;
      float: right;
      margin-right: 8px;
    }
    .imgTurn {
      position: absolute;
      width: 6px;
      right: 12.5px;
      top: 14px;
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    padding: 0 12.5px;
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
        background: url("../../static/image/block3.png");
        background-size: 100% 100%;
        color: #ffffff;
      }
    }
  }

  .commodity {
    padding: 12.5px;
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
          background-image: url("../../static/image/block1.png");
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
}
</style>