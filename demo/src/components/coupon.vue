<template>
  <div class="container">
    <div class="column" v-for="(item,index) in couponList" :key="index" @click="pickCoupon(item)">
      <div v-if="item.isUsable">
        <div class="columnLeft">{{item.preset/100}}</div>
        <div class="columnRight">
          <div class="name">{{item.actName}}</div>
          <div class="condition">111</div>
          <div class="time">有效期至:{{item.endTime}}</div>
        </div>
        <div class="btn" v-if="item.isReceived != 1" @click="userReceive(item)">立刻领取</div>
        <img class="statusImage" v-if="item.isReceived == 1" src="../assets/image/coupon1.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["couponList"],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      list: [],
      selectInfo: {
        userCode: this.$storage.getItem("userInfo").userCode,
        actStatus: 2,
        page: 1,
        pageSize: 2,
      },
    };
  },
  components: {
  },
  created() {
    console.log(this.couponList)
  },
  methods: {
    // getCoupon(shopCode) {
    //   let params = {
    //     page: 1,
    //     pageSize: 10,
    //     userCode: this.$storage.getItem("userInfo").userCode,
    //     actStatus: 2,
    //     shopCode: shopCode
    //   };
    //   let that = this;
    //   this.$https.get(that.$api.common.getShopCoupon, params).then((res) => {
    //     console.log(res);
    //     let array = res.data.data.records;
    //     this.list = array;
    //   });
    // },
    userReceive(item) {
      this.$emit('userReceive', item);
    },
    pickCoupon(item) {
      this.$emit('pickCoupon', item);
    }
  },
};
</script>

<style lang="less" scoped>
.column>div {
  height: 90px;
  width: 350px;
  margin: auto;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  .columnLeft {
    height: 90px;
    line-height: 90px;
    width: 110px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #ce3632;
    &::before {
      content: "￥";
      font-size: 14px;
    }
  }
  .columnRight {
    width: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      color: #2c2c2c;
      font-size: 14px;
    }
    .condition {
      color: #2c2c2c;
      font-size: 14px;
      margin: 8px 0;
    }
    .time {
      color: #959595;
      font-size: 11px;
    }
  }
  .btn {
    position: absolute;
    right: 14.5px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 24.5px;
    line-height: 24.5px;
    width: 70px;
    text-align: center;
    border-radius: 12.25px;
    color: #ffffff;
    background-color: #ce3632;
    font-size: 11px;
  }
  .statusImage {
    position: absolute;
    right: -8px;
    top: -3px;
    height: 51.5px;
    width: 51.5px;
  }
}
</style>