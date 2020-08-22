<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-form @submit="onSubmit">
      <van-field v-model="formData.bankName" name="银行名称" label="银行名称" placeholder="请输入银行名称" autocomplete="off"/>
      <van-field v-model="formData.cardNumber" name="银行卡号" label="银行卡号" placeholder="请输入银行卡号" autocomplete="off"/>
      <van-field v-model="formData.cardholder" name="持卡人" label="持卡人" placeholder="请输入持卡人" autocomplete="off"/>
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
      formData: {},
    };
  },
  components: {
    "hl-header": header,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button
  },
  created() {
    this.formData = this.$route.query.obj ? JSON.parse(this.$route.query.obj) : {};
  },
  methods: {
    onSubmit() {
      let params = this.formData;
      params.userCode = this.$storage.getItem("userInfo").userCode;
      this.$https.post(this.$api.common.addCard, params).then((res) => {
        this.$router.go(-1);
      })
    }
  }
};
</script>

<style lang="less" scoped>
</style>