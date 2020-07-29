<template>
  <div>
    <hl-header :header="header"></hl-header>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "订单详情",
        isLeftArrow: true
      }
    };
  },
  components: {
    "hl-header": header
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>