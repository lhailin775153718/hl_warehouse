<template>
  <van-swipe
    :autoplay="3000"
    :duration="swipeData.duration"
    :width="swipeData.width"
    :height="swipeData.height"
    :loop="swipeData.isLoop"
    :show-indicators="swipeData.isIndicators"
    :vertical="swipeData.isVertical"
    :touchable="swipeData.isTouchable"
  >
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="imageUrl+image.imgUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  props: ["images", "swipeData"],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
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