<template>
  <div>
    <cell :table="table"></cell>
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
