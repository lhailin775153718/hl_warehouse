<template>
  <div>
    <hl-header :header="header"></hl-header>
    <hl-cell :table="table" />
    <div class="stepItem">
      <hl-step />
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
import step from "@/components/step";
import cell from "@/components/cell";
export default {
  data() {
    return {
      header: {
        title: "查看物流",
        isLeftArrow: true
      },
      table: [
        {
          title: "订单编号",
          value: "123123",
          size: "large"
        },
        {
          title: "圆通快递",
          value: "12312321",
          size: "large"
        }
      ]
    };
  },
  components: {
    "hl-header": header,
    "hl-step": step,
    "hl-cell": cell
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.stepItem {
  width: 345px;
  margin: auto;
  margin-top: 11px;
  border-radius: 10px;
}
</style>