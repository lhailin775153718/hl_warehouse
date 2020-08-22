<template>
  <div>
    <hl-header :header="header"></hl-header>
    <div class="itemC">
      <div class="itemsList" v-for="(item, index) in list" :key="index">
        <div class="blockA">
          <div class="nameC">{{item.remark}}</div>
          <div class="timeC">{{item.createTime}}</div>
        </div>
        <div class="blockB">
          <div class="integralC">{{item.type == 1 ? '-' : '+'}}{{item.amount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "佣金明细",
        isLeftArrow: true,
      },
      list: []
    };
  },
  components: {
    "hl-header": header,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.itemC {
  width: 100%;
  padding: 12.5px;
  box-sizing: border-box;
  .itemsList {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .blockA {
      flex: 1;
      .nameC {
        color: #747474;
        font-size: 15px;
      }
      .timeC {
        margin-top: 10px;
        color: #949494;
        font-size: 12px;
      }
      > div {
        width: 100%;
      }
    }
    .blockB {
      color: #2c2c2c;
      font-size: 18px;
    }
  }
}
</style>