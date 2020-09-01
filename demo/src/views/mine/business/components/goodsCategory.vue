<template>
  <div class="depart-container">
    <van-collapse v-model="activeNames">
      <van-collapse-item v-for="(item,index) in list" :key="index" :title="item.categoryName" :name="index">
        <van-cell v-for="(items,index) in item.children" :key="index + 'A'" :title="items.categoryName" center is-link @click="pick(item,items)" />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Cell } from "vant";
export default {
  props: [],
  data() {
    return {
      list: {},
      activeNames: ["1"],
    };
  },
  components: {
    "van-collapse": Collapse,
    "van-collapse-item": CollapseItem,
    "van-cell": Cell,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let params = this.selectForm;
      let that = this;
      this.$https.get(that.$api.common.goodsCategory, params).then((res) => {
        console.log(res)
        this.list = res.data.data;
      });
    },
    pick(item, items) {
      console.log(item,"=====");
      console.log(items,"-------")
      this.$emit("getGoodsCategory");
    }
  },
};
</script>