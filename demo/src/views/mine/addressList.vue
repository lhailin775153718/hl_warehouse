<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>


<script>
import { AddressList } from "vant";
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "收货地址",
        isLeftArrow: true
      },
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  components: {
    "hl-header": header,
    "van-address-list": AddressList
  },
  methods: {
    onAdd() {
      console.log("新增地址");
    },
    onEdit(item, index) {
      console.log("编辑地址:" + index);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-radio__icon {
  display: none;
}
// /deep/ .van-address-item__edit {
//   background-image: url("../../../static/image/carLogo1.png");
//   background-size: 100% 100%;
// }
</style>