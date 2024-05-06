<template>
  <sys-dialog
    width="50%"
    :visible="dialog"
    @onClose="onClose"
    @onConfirm="commit"
  >
    <template v-slot:content>
      <el-form
        :model="addModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="role_name" label="角色名称">
              <el-input v-model="addModel.role_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="remark" label="备注">
              <el-input v-model="addModel.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </sys-dialog>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, defineExpose } from "vue";
import SysDialog from "@/components/SysDialog.vue";
import { ElMessage } from "element-plus";

// 表单ref属性
const addFormRef = ref();

const dialog = ref(false);

// 弹框显示
const onShow = () => {
  dialog.value = true;
};

// 点击取消关闭弹框
const onClose = () => {
  dialog.value = false;
};

// 点击确定关闭弹框
const onConfirm = () => {
  dialog.value = false;
};

// 暴露出去，给外部组件使用
defineExpose({
  onShow,
  onClose,
  onConfirm,
});

// 表单绑定的数据
const addModel = reactive({
  role_name: "",
  remark: "",
});

// 表单验证规则
const rules = reactive({
  role_name: [{ required: true, trigger: "blur", message: "请填写角色名称" }],
  remark: [{ required: true, trigger: "blur", message: "请填写备注" }],
});

const emits = defineEmits(["refresh"]);

// 表单提交
const commit = () => {
  // 表单验证 1：要有ref属性 2：要绑定rules 3：要给el-form-item添加prop属性
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.post("/api/role", addModel);

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
