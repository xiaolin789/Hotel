<template>
  <view class="" u-p-30>
    <u-divider height="60" font-size="32" class="u-m-t-20">填写订单</u-divider>
    <u-form labelPosition="left" labelWidth="140" :model="addModel" ref="uform">
      <u-form-item label="姓名" prop="name">
        <u-input v-model="addModel.name" />
      </u-form-item>
      <u-form-item label="手机号" prop="phone">
        <u-input v-model="addModel.phone" />
      </u-form-item>
      <u-form-item label="份量" prop="num">
        <u-input v-model="addModel.num" />
      </u-form-item>
      <u-form-item label="房间号" prop="num">
        <u-input v-model="addModel.room" />
      </u-form-item>
    </u-form>
    <view class="btns">
      <u-button @click="commit" type="primary" class="bts">提交</u-button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { foodOrderApi, cancelApi } from "../../api/food.js";
import { wxLoginApi } from "../../api/user.js";

const addModel = reactive({
  open_id: "",
  name: "",
  phone: "",
  num: "",
  order_time: "",
  room: "",
  img_url: "",
  status: 1,
});

onLoad((options) => {
  console.log(options.infos);
  loginApi();
  const parm = JSON.parse(options.infos);
  // console.log(parm._value.info_id);
  addModel.foodname = parm._value.name;
  addModel.img_url = parm._value.img_url;
  // console.log(addModel.room_id);
});

const loginApi = () => {
  uni.login({
    provider: "weixin",
    success: (loginRes) => {
      console.log(loginRes.code);
      const { code } = loginRes;
      uni.request({
        url: "http://localhost:3000/wxapi/user/wxLogin",
        method: "POST",
        data: {
          code,
        },
        success: (res) => {
          console.log(res.data.data);
          addModel.open_id = res.data.data;
        },
      });
    },
  });
};

// 提交数据
const commit = async () => {
  console.log(addModel);
  if (!addModel.name) {
    uni.showToast({
      icon: "none",
      title: "请填写姓名",
      duration: 2000,
    });
    return;

    if (!addModel.phone) {
      uni.showToast({
        icon: "none",
        title: "请填写电话",
        duration: 2000,
      });
      return;
    }
    if (!addModel.num) {
      uni.showToast({
        icon: "none",
        title: "请填写份量",
        duration: 2000,
      });
      return;
    }
    if (!addModel.room) {
      uni.showToast({
        icon: "none",
        title: "请填写房间号",
        duration: 2000,
      });
      return;
    }
  }
  const res = await foodOrderApi(addModel);
  if (res.code == "200") {
    uni.showToast({
      icon: "success",
      title: "预订成功",
      duration: 2000,
    });
    uni.navigateTo({
      url: "../foodOrder/order",
    });
  }
  console.log(res);
};
</script>

<style scoped>
.btns {
  margin-top: 60px;
  width: 100%;
  background: #ffffff;
  height: 120rpx;
}

.bts {
  width: 90%;
  background-color: #009688 !important;
}
</style>
