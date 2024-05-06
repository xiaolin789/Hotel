<template>
  <view class="u-p-30">
    <u-form :model="suggest" ref="uForm">
      <u-form-item label="反馈" prop="content"
        ><u-input type="textarea" height="300" border v-model="suggest.content"
      /></u-form-item>
    </u-form>
  </view>
  <view class="u-m-t-20" u-p-40>
    <button @click="commit" type="primary">提交</button>
  </view>
</template>

<script setup>
import { reactive } from "vue";
import { addSuggestApi } from "../../api/home.js";

// 表单对象
const suggest = reactive({
  content: "",
});

// 表单提交
const commit = async () => {
  if (!suggest.content) {
    uni.showToast({
      title: "请填写意见",
      duration: 2000,
    });
  }
  const res = await addSuggestApi(suggest);
  if (res.code == "200") {
    uni.showToast({
      title: "提交成功",
      duration: 2000,
    });
    uni.navigateBack();
  }
};
</script>

<style></style>
