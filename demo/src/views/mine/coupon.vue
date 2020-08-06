<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="column" v-for="(item,index) in list" :key="index">
        <div>
          <span></span>
        </div>
        <div>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div></div>
      </div>
    </van-list>
  </div>
</template>

<script>
import header from "@/components/header";
import { List, Cell } from "vant";
export default {
  data() {
    return {
      header: {
        title: "我的优惠券",
        isLeftArrow: true,
      },
      list: [],
      loading: false,
      finished: false,
      selectInfo: {
        userCode: this.$storage.getItem("userInfo").userCode,
        actStatus: 2,
        page: 1,
        pageSize: 2,
      },
    };
  },
  components: {
    "hl-header": header,
    "van-list": List,
    "van-cell": Cell,
  },
  methods: {
    onLoad() {
      let that = this;

      this.$https
        .get(that.$api.common.getCoupon, that.selectInfo)
        .then((res) => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (that.selectInfo.page >= 5) {
            this.finished = true;
          }
          that.selectInfo.page = that.selectInfo.page + 1;
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>