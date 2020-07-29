<template>
  <div>
    <van-field
      v-for="(item,index) in fieldList"
      :key="index"
      v-model="item.text"
      rows="1"
      autosize
      :label="item.title"
      :type="item.type"
      :placeholder="item.placeholder"
    />
  </div>
</template>

<script>
import { Field } from "vant";
export default {
  props: ["fieldList"],
  data() {
    return {};
  },
  components: {
    "van-field": Field
  }
};
</script>