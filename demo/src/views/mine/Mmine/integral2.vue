<template>
  <div>
    <hl-header :header="header"></hl-header>
    <div class="itemA">
      <div>
        <span>285</span>
        <span>分</span>
      </div>
    </div>
    <div class="itemB"> 积分记录</div>
    <div>
      <div v-for="(item, index) in itemsList" :key="index"></div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        header:{
          title: '我的积分',
          isLeftArrow: true,
        },
        itemsList: []
      };
    },
    components: {
      "hl-header": ()=> import("@/components/header"),
    },
    created() {

    },
    methods:{}
  };
</script>
