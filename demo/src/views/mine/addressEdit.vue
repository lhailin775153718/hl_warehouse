<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-cell-group>
      <van-field v-model="addressData.receiver" label="姓名" placeholder="收货人姓名" />
      <van-field v-model="addressData.phone" label="电话" placeholder="收货人电话" />
      <van-field
        v-model="addressData.address"
        label="地区"
        placeholder="选择省/市/区"
        readonly
        @click="show"
      />
      <van-field v-model="addressData.detail" label="详细地址" placeholder="街道门牌、楼房房间号等信息" />
      <van-cell title="设置为默认地址" center>
        <template #right-icon>
          <van-switch
            v-model="addressData.isDefault"
            size="20"
            active-color="#D8674D"
            inactive-color="#f5f5f5"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="btn" @click="onSave">保存地址</div>

    <van-popup v-model="isShow" position="bottom">
      <van-picker
        show-toolbar
        title="标题"
        :columns="areaList"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>


<script>
import { Field, Cell, CellGroup, Picker, Switch, Popup } from "vant";
import header from "@/components/header";

export default {
  data() {
    return {
      header: {
        title: "编辑地址",
        isLeftArrow: true,
      },
      areaList: [],
      addressData: {},
      isShow: false,
    };
  },
  components: {
    "hl-header": header,
    "van-field": Field,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-picker": Picker,
    "van-switch": Switch,
    "van-popup": Popup,
  },
  created() {
    this.getQuery();
    this.getAllArea();
  },
  methods: {
    getQuery() {
      this.addressData = JSON.parse(this.$route.query.address);
      if (
        this.addressData.provinceName &&
        this.addressData.cityName &&
        this.addressData.districtName
      ) {
        this.addressData.address =
          this.addressData.provinceName +
          "/" +
          this.addressData.cityName +
          "/" +
          this.addressData.districtName;
      }
      this.addressData.isDefault = this.addressData.isDefault ? true : false;
    },
    getAllArea() {
      let that = this;
      this.$https.get(that.$api.common.getAllArea).then((res) => {
        this.areaList = res.data.data;
        this.areaList.forEach((item) => {
          item.text = item.name;
          item.children.forEach((items) => {
            items.text = items.name;
            items.children.forEach((res) => {
              res.text = res.name;
            });
          });
        });
      });
    },
    show() {
      this.isShow = true;
    },
    onConfirm(value) {
      this.areaList.forEach((res1) => {
        if (res1.name == value[0]) {
          this.addressData.provinceName = res1.name;
          this.addressData.provinceCode = res1.code;
          res1.children.forEach((res2) => {
            if (res2.name == value[1]) {
              this.addressData.cityName = res2.name;
              this.addressData.cityCode = res2.code;
              res2.children.forEach((res3) => {
                if (res3.name == value[2]) {
                  this.addressData.districtName = res3.name;
                  this.addressData.districtCode = res3.code;
                }
              });
            }
          });
        }
      });
      this.addressData.address =
        this.addressData.provinceName +
        "/" +
        this.addressData.cityName +
        "/" +
        this.addressData.districtName;
      this.isShow = false;
    },
    onCancel() {
      this.isShow = false;
    },
    onSave() {
      let params = {
        id: this.addressData.id,
        userCode: this.$storage.getItem("userInfo").userCode,
        userId: this.$storage.getItem("userInfo").id,
        isDefault: this.addressData.isDefault ? "1" : "0",
        receiver: this.addressData.receiver,
        phone: this.addressData.phone,
        provinceName: this.addressData.provinceName,
        provinceCode: this.addressData.provinceCode,
        cityName: this.addressData.cityName,
        cityCode: this.addressData.cityCode,
        districtName: this.addressData.districtName,
        districtCode: this.addressData.districtCode,
        detail: this.addressData.detail,
      };
      let that = this;
      this.$https.post(that.$api.common.addOrUpdate, params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  height: 40px;
  line-height: 40px;
  width: 350px;
  margin: auto;
  margin-top: 30px;
  border-radius: 20px;
  background-color: #d8674d;
  text-align: center;
  color: #ffffff;
  font-size: 17px;
}
</style>