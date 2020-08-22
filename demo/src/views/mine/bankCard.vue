<template>
  <div>
    <hl-header :header="header" :left-arrow="header.isLeftArrow"></hl-header>
    <div class="cardLisk">
      <div class="card-item" v-for="(item,index) in list" :key="index" @click="toPage(item)">
        <img src="" alt="">
        <div class="item-right">
          <span class="name">{{item.bankName}}</span>
          <span class="number">{{item.cardNumber}}</span>
        </div>
      </div>
    </div>
    <div class="btn" @click="toPage">
      <img src="../../assets/image/card.png" alt="">
      <span>添加银行卡</span>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "我的银行卡",
        isLeftArrow: true,
      },
      list: []
    };
  },
  components: {
    "hl-header": header,
  },
  created() {
    this.getCardList();
  },
  methods: {
    getCardList() {
      let params = {};
      params.userCode = this.$storage.getItem("userInfo").userCode;
      this.$https.get(this.$api.common.getCardList, params).then((res) => {
        console.log(res)
        this.list = res.data.data;
      })
    },
    toPage(val) {
      this.$router.push({
        path: '/cardAdd',
        query: {
          obj: JSON.stringify(val)
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.cardLisk {
  background-color: #ffffff;
  padding: 12px;
  box-sizing: border-box;
  .card-item {
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    padding: 12px;
    box-sizing: border-box;
    margin-bottom: 10px;
    img {
      height: 50px;
    }
    .item-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: calc(100% - 80px);
      .name {
        color: #2C2C2C;
        font-size: 17px;
      }
      .number {
        font-size: 18px;
        color: #2C2C2C;
        font-weight: bold;
        margin-top: 8px;
      }
    }
  }
}
.btn {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 44px;
  margin: auto;
  margin-top: 50px;
  border-radius: 22px;
  img {
    width: 20.5px;
  }
  span {
    color: #747474;
    font-size: 17px;
    margin-left: 5px;
  }
}
</style>