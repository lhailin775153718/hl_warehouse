<template>
  <div id="app">
    <router-view />
    <div class="tabbarDiv" v-if="isShow"></div>
    <tabbar v-if="isShow"></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  name: "App",
  data() {
    return {
      isShow: false,
      list: ["/home", "/sort", "/car", "/mine"]
    };
  },
  components: {
    tabbar
  },
  created() {
  },
  methods: {
    routerChange() {
      let path = this.$route.path;
      if (this.list.indexOf(path) != -1) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  watch: {
    $route: ["routerChange"]
  }
};
</script>

<style>
.tabbarDiv {
  height: 50px;
  width: 100%;
}
</style>
