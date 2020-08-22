<template>
  <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="beforeDelete" accept="image" />
</template>

<script>
import { Uploader } from "vant";
export default {
  props: [],
  data() {
    return {
      fileList: [],
    };
  },
  components: {
    "van-uploader": Uploader,
  },
  created() {},
  mounted() {},
  methods: {
    afterRead(file) {
      let formData = new FormData();
      formData.append('file', file.file);
      this.$emit("afterRead", formData);
    },
    beforeDelete(file,index) {
      this.fileList.splice(index.index, 1);
      this.$emit("beforeDelete", index.index)
    }
  },
};
</script>

<style lang="less" scoped>
</style>