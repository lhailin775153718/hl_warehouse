<template>
  <div>
    <router-view />
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  data() {
    return {};
  },
  components: {
    tabbar
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
