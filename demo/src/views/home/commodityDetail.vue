<template>
  <div>
    <div class="detailTitle">
      <img-swipe :images="imageList" :swipeData="swipeData" />
      <div></div>
    </div>
  </div>
</template>

<script>
import imgSwipe from "@/components/imgSwipe";

export default {
  data() {
    return {
      searchText: "",
      imageList: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      swipeData: {
        height: "375"
      }
    };
  },
  components: {
    "img-swipe": imgSwipe
  }
};
</script>

<style scoped lang="less">
.detailTitle {
  position: relative;
}
</style>
