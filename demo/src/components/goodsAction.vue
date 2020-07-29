<template>
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" dot />
    <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
    <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
    <van-goods-action-button type="warning" text="加入购物车" />
    <van-goods-action-button type="danger" text="立即购买" />
  </van-goods-action>
</template>

<script>
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
export default {
  props: ["table"],
  data() {
    return {};
  },
  components: {
    "van-goods-action": GoodsAction,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action-button": GoodsActionButton,
  },
};
</script>

<style scoped lang="less">
</style>
