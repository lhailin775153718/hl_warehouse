<template>
  <div class="container">
    <van-search
      v-model="selectInfo"
      shape="round"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="cancelSearch">取消</div>
      </template>
    </van-search>
    <div class="searchHistory">
      <div class="item" v-for="(item,index) in historyList" :key="index" @click="onSearch(item)">
        <p>{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  props: ["selectData"],
  data() {
    return {
      selectInfo: "",
      historyList: [],
    };
  },
  components: {
    "van-search": Search,
  },
  mounted() {
    this.selectInfo = this.selectData;
    if (localStorage.getItem("historyList") != null) {
      this.historyList = JSON.parse(localStorage.getItem("historyList"));
    }
  },
  methods: {
    onSearch(val) {
      this.selectInfo = val;
      if (val != "") {
        this.historyList = this.remove(this.historyList, this.selectInfo);
        this.historyList.unshift(this.selectInfo);
        localStorage.setItem("historyList", JSON.stringify(this.historyList));
      }
      if (this.$route.path == "/home") {
        this.$router.push({
          path: "/recommendationZone",
          query: { selectInfo: this.selectInfo },
        });
      } else {
        this.$emit("onSearch", this.selectInfo);
      }
    },
    cancelSearch() {
      this.$emit("cancelSearch");
    },
    remove(arr, item) {
      var temp = [];
      arr.forEach((att) => {
        if (att != item) {
          temp.push(att);
        }
      });
      return temp;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #ffffff;
  .searchHistory {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    box-sizing: border-box;
    .item {
      p {
        font-size: 14px;
        color: #747474;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        padding: 5px 10px;
        background-color: #f5f5f5;
        border-radius: 15px;
        margin: 0 15px 12px 0;
      }
    }
  }
}
</style>