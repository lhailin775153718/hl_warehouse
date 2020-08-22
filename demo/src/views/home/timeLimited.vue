<template>
  <div>
    <hl-header :header="header" />

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

    <van-pull-refresh :disabled="disabled" v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished.state"
        :finished-text="finished.text"
        @load="changeDeadline('10:00:00')"
      >
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
                {{(item.price/100).toFixed(2)}}
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
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Progress } from "vant";
import header from "@/components/header";
import { Search, PullRefresh, List } from "vant";
export default {
  data() {
    return {
      header: {
        title: "限时秒杀",
        isLeftArrow: true,
      },
      imageUrl: this.$https.imageUrl,
      nowTime: new Date().getHours(),
      commodity: [],
      selectInfo: {
        page: 1,
        pageSize: 10,
        startTime: "",
        activityType: 4,
      },
      disabled: false,
      finished: {
        state: false,
        text: "没有更多了",
      },
      loading: false,
      refreshing: false,
    };
  },
  components: {
    "hl-header": header,
    "van-progress": Progress,
    "van-pull-refresh": PullRefresh,
    "van-list": List,
  },
  created() {
    // this.changeDeadline("10:00:00");
  },
  methods: {
    getDeadline() {
      let params = this.selectInfo;
      let that = this;
      this.$https
        .get(that.$api.common.activityGoodsList, params)
        .then((res) => {
          let array = res.data.data.records;
          for (let i = 0; i < array.length; i++) {
            array[i].ratio = parseInt((array[i].sales / array[i].stock) * 100);
            array[i].ratio = array[i].ratio > 100 ? 100 : array[i].ratio;
          }
          if (this.selectInfo.page > 1) {
            this.commodity.push(...array);
          } else {
            this.commodity = array;
          }

          if (this.selectInfo.page == res.data.data.pages) {
            this.finished.state = true;
          } else {
            this.selectInfo.page = this.selectInfo.page++;
          }
        });
    },
    changeDeadline(val) {
      let date = new Date();
      let startTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + val;
      this.selectInfo.startTime = startTime;
      this.selectInfo.page = 1;
      this.getDeadline();
    },
    onRefresh() {
      if (this.refreshing) {
        this.refreshing = false;
      }
      this.selectInfo.page = 1;
      this.getDeadline();
    },
    toDetail(val) {
      this.$router.push({
        path: "commodityDetail",
        query: {
          isActivity: true,
          obj: JSON.stringify(val),
        },
      });
    },
  },
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
      background: url("../../assets/image/block3.png");
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
    padding: 0 15px;
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
        background-image: url("../../assets/image/block1.png");
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