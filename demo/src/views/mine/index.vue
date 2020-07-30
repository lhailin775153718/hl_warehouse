<template>
  <div>
    <cell :table="table"></cell>
    <div  @click="goRouter('orderDetails')">订单详情</div>
    <div  @click="goRouter('integral')">我的积分</div>
    <div  @click="goRouter('orderList')">订单列表</div>
  </div>
</template>

<script>
import Cell from "@/components/cell";
export default {
  data() {
    return {
      table: [{
          title: "title",
          value: "value",
          label: "label"
      }]
    };
  },
  components: {
    Cell
  },
  methods: {
    goRouter(item) {
      console.log('item', item)
      this.$router.push({name: item})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.test {
  width: 320px;
  height: 160px;
  background-color: bisque;
  text-align: center；;
}
</style>
