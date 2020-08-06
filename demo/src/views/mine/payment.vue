<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-cell
      v-for="(item,index) in list"
      :key="index"
      is-link
      center
      :title="item"
      @click="pickPay(item)"
    />
  </div>
</template>

<script>
import header from "@/components/header";
import { Cell } from "vant";
export default {
  data() {
    return {
      header: {
        title: "付款方式",
        isLeftArrow: true,
      },
      list: ["余额支付", "微信支付"],
    };
  },
  components: {
    "hl-header": header,
    "van-cell": Cell,
  },
  methods: {
    pickPay(item) {
      this.$storage.setItem("pay", item);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
</style>