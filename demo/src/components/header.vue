<template>
  <div>
    <van-nav-bar
      class="header"
      :title="header.title"
      :left-text="header.leftText"
      :right-text="header.rightText"
      :left-arrow="header.isLeftArrow"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-nav-bar class="header-bg" />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  /**
   * title:标题
   * leftText:左边文本
   * rightText:右边文本
   * isLeftArrow:是否有返回箭头
   */
  props: ["header"],
  data() {
    return {};
  },
  components: {
    "van-nav-bar": NavBar,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$emit("onClickRight");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
}
.header-bg {
  visibility: hidden;
}
</style>