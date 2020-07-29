<template>
  <van-checkbox v-model="checked"></van-checkbox>
</template>

<script>
import { Checkbox } from "vant";
export default {
  // props: ["checked"],
  data() {
    return {
      checked:false
    };
  },
  components: {
    "van-Checkbox": Checkbox
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
