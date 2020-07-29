<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="选择器"
        placeholder="点击选择城市"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field v-model="number" name="快递单号" label="快递单号" placeholder="请输入快递单号" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import header from "@/components/header";
import { Form, Field, Popup, Picker, Button } from "vant";
export default {
  data() {
    return {
      header: {
        title: "填写物流信息",
        isLeftArrow: true
      },
      number: "",
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false
    };
  },
  components: {
    "hl-header": header,
    "van-form": Form,
    "van-field": Field,
    "van-popup": Popup,
    "van-picker": Picker,
    "van-button": Button
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style lang="less" scoped>
</style>