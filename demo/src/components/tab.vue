<template>
  <van-tabs v-model="active">
    <van-tab title="图文详情">
      <div class="tabItem" v-html="tab1"></div>
    </van-tab>
    <van-tab title="规格参数">
      <div class="tabItem" v-html="tab2"></div>
    </van-tab>
    <van-tab title="商品评价">
      <div class="tabItem" v-html="tab3"></div>
    </van-tab>
  </van-tabs>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  props: ["tab1", "tab2", "tab3"],
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
.tabItem {
  background-color: #ffffff;
  padding: 15px;
  box-sizing: border-box;
}
</style>
