<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-form @submit="onSubmit">
      <van-field v-model="password" name="密码" label="密码" type="password" placeholder="请输入密码" />
      <van-field v-model="newPassword" name="新密码" label="新密码" type="password" placeholder="请输入新密码" />
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
        title: "忘记密码",
        isLeftArrow: true
      },
      password: "",
      newPassword: ""
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