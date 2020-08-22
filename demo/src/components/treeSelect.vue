<template>
  <van-tree-select :height="sidebarHeight" :items="sidebarTitle" :main-active-index.sync="active">
    <template #content>
      <div
        class="itemList"
        v-for="(item,indexs) in sidebarTitle"
        :key="indexs"
        v-if="active === indexs"
      >
        <div
          class="items"
          v-for="(items,index) in item.children"
          :key="index"
          @click="toGoodsCategoryList(items)"
        >
          <img class="itemImg" v-if="items.imgUrl" :src="imageUrl + items.imgUrl" alt />
          <p class="itemName">{{items.categoryName}}</p>
        </div>
      </div>
    </template>
  </van-tree-select>
</template>

<script>
import { TreeSelect } from "vant";
export default {
  props: [],
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      sidebarHeight: 0,
      active: 0,
      sidebarTitle: [],
    };
  },
  components: {
    "van-tree-select": TreeSelect,
  },
  created() {
    let windowHerght = document.body.clientHeight;
    this.sidebarHeight = windowHerght - 50 + "px";
    this.getGoodsCategory();
  },
  methods: {
    getGoodsCategory() {
      let that = this;
      this.$https.get(that.$api.common.goodsCategory).then((res) => {
        this.sidebarTitle = res.data.data;
        for (let i = 0; i < this.sidebarTitle.length; i++) {
          this.sidebarTitle[i].text = this.sidebarTitle[i].categoryName;
        }
      });
    },
    toGoodsCategoryList(val) {
      this.$router.push({
        path: "/goodsCategoryList",
        query: {
          categoryId: val.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.itemList {
  width: 100%;
  .items {
    width: 33.33%;
    display: inline-block;
    text-align: center;
    margin-top: 7px;
    margin-bottom: 8px;
    .itemImg {
      height: 60px;
      width: 60px;
    }
    .itemName {
      color: #000000;
      font-size: 12px;
    }
  }
}
</style>