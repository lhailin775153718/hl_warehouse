<template>
  <div>
    <hl-header :header="header" @onClickRight="onClickRight"></hl-header>
    <hl-card ref="card" />
  </div>
</template>

<script>
import header from "@/components/header";
import card from "@/components/card";
export default {
  data() {
    return {
      header: {
        title: "购物车",
        rightText: "删除",
      },
    };
  },
  components: {
    "hl-header": header,
    "hl-card": card,
  },
  methods: {
    onClickRight() {
      let list = this.$refs.card.getList();
      let arr = [];
      list.forEach((res) => {
        res.shoppingCarGoodsList.forEach((res1) => {
          if (res1.checked) {
            arr.push(res1.id);
          }
        });
      });
      let params = {
        carId: arr,
        userCode: this.$storage.getItem("userInfo").userCode,
      };
      let that = this;
      this.$https.post(that.$api.common.delCarGoods, params).then((res) => {
        that.$refs.card.getShopCar();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.test {
  width: 320px;
  height: 160px;
  background-color: bisque;
  text-align: center；;
}
</style>
