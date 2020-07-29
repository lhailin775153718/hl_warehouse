<template>
  <div>
    <hl-header :header="header"></hl-header>
    <hl-card />
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
        rightText: "删除"
      }
    };
  },
  components: {
    "hl-header": header,
    "hl-card": card
  }
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
