<template>
  <van-grid :column-num="columnNum" :gutter="gutter">
    <van-grid-item
      v-for="item in grid"
      :key="item.text"
      :icon="item.icon"
      :text="item.text"
      :dot="item.isDot"
      :badge="item.badge"
      @click="toPage(item)"
    />
  </van-grid>
</template>

<script>
import { Grid, GridItem } from "vant";
export default {
  /**
   * title:标题
   * leftText:左边文本
   * rightText:右边文本
   * isLeftArrow:是否有返回箭头
   */
  props: ["grid", "columnNum", "gutter"],
  data() {
    return {};
  },
  components: {
    "van-grid": Grid,
    "van-grid-item": GridItem,
  },
  methods: {
    toPage(val) {
      this.$emit("toPage", val);
      // this.$router.push({
      //   path: val.path,
      //   query: {
      //     text: val.text,
      //     type: val.type,
      //   },
      // });
    },
  },
};
</script>

<style scoped lang="less">
[class*="van-hairline"] ::after {
  border: none;
}
</style>