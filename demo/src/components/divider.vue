<template>
  <main>
    <van-divider v-if="divider == undefined" />
    <van-divider :style="divider.style" :content-position="divider.position" v-if="divider != undefined">{{divider.text}}</van-divider>
  </main>
</template>

<script>
import { Divider } from "vant";
export default {
  props: ["divider"],
  data() {
    return {};
  },
  components: {
    "van-divider": Divider
  }
};
</script>

