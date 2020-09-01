<template>
  <div>
    <router-view />
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbarBusiness";
export default {
  data() {
    return {};
  },
  components: {
    tabbar
  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
