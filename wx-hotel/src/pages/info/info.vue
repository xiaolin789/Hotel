<template>
  <view class="" u-p-30>
    <u-divider height="60" font-size="32" class="u-m-t-20">预定信息</u-divider>
    <u-form labelPosition="left" labelWidth="140" :model="addModel" ref="uform">
      <u-form-item label="姓名" prop="name">
        <u-input v-model="addModel.name" />
      </u-form-item>
      <u-form-item label="手机号" prop="phone">
        <u-input v-model="addModel.phone" />
      </u-form-item>
      <u-form-item label="到店时间" prop="to_time">
        <uni-datetime-picker
          :border="false"
          v-model="addModel.to_time"
        ></uni-datetime-picker>
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
import { bookOrderApi } from "../../api/home.js";
import { wxLoginApi } from "../../api/user.js";

const addModel = reactive({
  open_id: "",
  name: "",
  phone: "",
  to_time: "",
  book: 1,
  room_id: "",
  room_code: "",
  img_url: "",
});

onLoad((options) => {
  console.log(options.infos);
  loginApi();
  const parm = JSON.parse(options.infos);
  // console.log(parm._value.info_id);
  addModel.room_id = parm._value.info_id;
  addModel.room_code = parm._value.info_order;
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
    if (!addModel.to_time) {
      uni.showToast({
        icon: "none",
        title: "请填写到店时间",
        duration: 2000,
      });
      return;
    }
  }
  const res = await bookOrderApi(addModel);
  if (res.code == "200") {
    uni.showToast({
      icon: "success",
      title: "预订成功",
      duration: 2000,
    });
    uni.navigateTo({
      url: "../order/order",
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
