<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-form @submit="onSubmit">
      <van-field v-model="bankName" name="银行" label="银行" placeholder="请输入银行" />
      <van-field v-model="cardNumber" name="卡号" label="卡号" placeholder="请输入银行卡号" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import header from "@/components/header";
import { Form, Field, Button } from "vant";
export default {
  data() {
    return {
      header: {
        title: "添加银行卡",
        isLeftArrow: true
      },
      bankName: "",
      cardNumber: ""
    };
  },
  components: {
    "hl-header": header,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style lang="less" scoped>
</style>