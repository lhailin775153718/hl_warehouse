<template>
  <div>
    <van-search
      v-model="selectInfo"
      placeholder="请输入搜索关键词111"
      shape="round"
      readonly
      @click="showSearch"
    />
    <hl-searchHistory :selectData="selectData" @onSearch="onSearch" v-if="isSearch" />
  </div>
</template>

<script>
import { Search } from "vant";
import searchHistory from "@/components/searchHistory";
export default {
  props: [],
  data() {
    return {
      selectInfo: "",
      selectData: "",
      isSearch: false,
    };
  },
  components: {
    "van-search": Search,
    "hl-searchHistory": searchHistory,
  },
  methods: {
    onSearch(val) {
      this.selectInfo = val;
      this.isSearch = false;
    },
    showSearch() {
      this.selectData = this.selectInfo;
      this.isSearch = true;
    },
  },
};
</script>