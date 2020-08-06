<template>
  <van-tabs v-model="active">
    <van-tab title="图文详情">
      <div class="tabItem" v-html="tabForm.content"></div>
    </van-tab>
    <van-tab title="规格参数">
      <div class="tabItem">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in goodsParams"
            :key="index"
            :title="item.key"
            :value="item.value"
            :center="item.center"
          />
        </van-cell-group>
      </div>
    </van-tab>
    <van-tab title="商品评价">
      <div class="tabItem"></div>
    </van-tab>
  </van-tabs>
</template>

<script>
import { Tab, Tabs, Cell, CellGroup } from "vant";
export default {
  props: ["tabForm"],
  data() {
    return {
      active: 0,
      goodsParams: [],
    };
  },
  components: {
    "van-tab": Tab,
    "van-tabs": Tabs,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.tabForm.goodsParams = JSON.parse(this.tabForm.goodsParams);
      // console.log(this.tabForm.goodsParams);
      for (let i in this.tabForm.goodsParams) {
        let temp = new Object;
        temp.key = i;
        temp.value = this.tabForm.goodsParams[i];
        this.goodsParams.push(temp);
      }
      // console.log(this.goodsParam,"==========")
      // console.log(this.tabForm.goodsParams);
      // console.log(Object.keys(this.tabForm.goodsParams));
      // Object.keys(this.tabForm.goodsParams).map((item, index) => {
      //   console.log(item);
      //   console.log(index);
      // });
    },
  },
};
</script>

<style scoped lang="less">
.tabItem {
  background-color: #ffffff;
  padding: 15px;
  box-sizing: border-box;
}
</style>
