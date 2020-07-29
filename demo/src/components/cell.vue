<template>
  <van-cell-group>
    <van-cell
      v-for="(item,index) in table"
      :key="index"
      :title="item.title"
      :value="item.value"
      :label="item.label"
      :is-link="item.isLink"
      :center="item.center"
      :size="item.size"
    />
  </van-cell-group>
</template>

<script>
import { Cell, CellGroup } from "vant";
export default {
  props: ["table"],
  data() {
    return {};
  },
  components: {
    "van-cell": Cell,
    "van-cell-group": CellGroup
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
