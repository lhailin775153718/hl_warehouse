<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>


<script>
import { AddressEdit } from "vant";
import areaList from "@/js/area.js";
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "编辑地址",
        isLeftArrow: true
      },
      areaList,
      searchResult: []
    };
  },
  components: {
    "hl-header": header,
    "van-address-edit": AddressEdit
  },
  methods:{
      onSave() {
      console.log("save");
    },
    onDelete() {
      console.log("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>