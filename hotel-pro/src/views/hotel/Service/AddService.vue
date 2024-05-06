<template>
  <el-dialog
    v-model="props.visible"
    title="新增服务"
    :before-close="onClose"
    append-to-body
    :close-on-click-modal="false"
  >
    <el-form
      :model="ServiceModel"
      ref="addFormRef"
      :rules="rules"
      label-width="80px"
      size="default"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item prop="name" label="服务名称">
            <el-input v-model="ServiceModel.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="order_num" label="序号">
            <el-input v-model="ServiceModel.order_num"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const addFormRef = ref();

const props = defineProps({
  visible: false,
});

const ServiceModel = reactive({
  name: "",
  order_num: "",
});

// 注册事件
const emits = defineEmits(["onClose"]);

// 弹框的取消事件
const onClose = () => {
  emits("onClose");
};

const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入服务名称" }],
  order_num: [{ required: true, trigger: "blur", message: "请输入序号" }],
});

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.post("/api/service", ServiceModel);

      console.log(res);
      if (res.data.code == "200") {
        // 信息提示
        ElMessage.success("添加成功");

        // 刷新列表
        emits("refresh");
        onClose();
      }
      // 清空表单信息
      addFormRef.value.resetFields();
    }
  });
};
</script>

<style lang="scss" scoped></style>
