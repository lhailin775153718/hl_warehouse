<template>
  <van-tabbar v-model="active" active-color="#cc4400" route>
    <van-tabbar-item
      v-for="(item,index) in tabbar"
      :key="index"
      :to="item.path"
      icon="home-o"
    >{{item.value}}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  /**
   * path:路径
   * value:文本
   */
  data() {
    return {
      active: 0,
      tabbar: [
        {
          path: "/home",
          value: "首页"
        },
        {
          path: "/sort",
          value: "分类"
        },
        {
          path: "/car",
          value: "购物车"
        },
        {
          path: "/mine",
          value: "个人中心"
        }
      ]
    };
  },
  components: {
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem
  },
  mounted() {
    this.tabbarActive();
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      this.tabbarActive();
    }
  },
  methods: {
    tabbarActive() {
      const href = window.location.href.split("#/")[1];
      for (let i = 0; i < 4; i++) {
        if (href == this.tabbar[i]) {
          this.active = i;
        }
      }
    }
  }
};
</script>