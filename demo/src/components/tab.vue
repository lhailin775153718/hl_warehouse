<template>
  <van-tabs v-model="active">
    <van-tab title="图文详情">内容 1</van-tab>
    <van-tab title="规格参数">内容 2</van-tab>
    <van-tab title="商品评价">内容 3</van-tab>
  </van-tabs>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  props: ["table"],
  data() {
    return {
      active: 0,
    };
  },
  components: {
    "van-tab": Tab,
    "van-tabs": Tabs,
  },
};
</script>

<style scoped lang="less">
</style>
