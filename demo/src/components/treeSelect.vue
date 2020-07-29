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
          v-for="(items,index) in list"
          :key="index"
          v-if="items.type == item.type"
        >
          <img class="itemImg" :src="items.src" alt />
          <p class="itemName">{{items.name}}</p>
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
      sidebarHeight: 0,
      active: 0,
      sidebarTitle: [
        { text: "标签称", type: 0 },
        { text: "标签称1", type: 1 },
        { text: "标签称1", type: 2 },
        { text: "标签称1", type: 3 },
        { text: "标签称1", type: 4 },
        { text: "标签称2", type: 5 }
      ],
      list: [
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 0
        },
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 0
        },
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 0
        },
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 0
        },
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 0
        },
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 1
        },
        {
          name: "女装",
          src: "../../static/image/test.jpg",
          type: 1
        }
      ]
    };
  },
  components: {
    "van-tree-select": TreeSelect
  },
  created() {
    let windowHerght = document.body.clientHeight;
    this.sidebarHeight = windowHerght - 50 + "px";
  },
  methods: {}
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