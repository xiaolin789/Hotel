<template>
    <el-dialog
      v-model="props.visible"
      title="新增菜品"
      :before-close="onClose"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        :model="FoodModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="菜名">
              <el-input v-model="FoodModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="price" label="价格">
              <el-input v-model="FoodModel.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="上传图片" prop="img_url">
            <Upload
              :avatar="FoodModel.img_url"
              @linchange="handleChange"
            ></Upload>
          </el-form-item>
          </el-col>
          <el-col :span="24" :offset="0">
          <el-form-item prop="detail" label="详情">
            <el-input
              v-model="FoodModel.detail"
              :rows="8"
              type="textarea"
            />
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
  import { ElMessage } from "element-plus";
  import Upload from "./Upload.vue";
import upload from "@/utils/upload";
  
  const addFormRef = ref();
  
  const props = defineProps({
    visible: false,
  });
  
  const FoodModel = reactive({
    name: "",
    img_url: "",
    price: "",
    detail: "",
    file: null
  });
  
  // 每次选择完图片之后的回调
  const handleChange = (file) => {
    FoodModel.img_url = URL.createObjectURL(file);
    FoodModel.file = file;
};
  

  // 注册事件
  const emits = defineEmits(["onClose"]);
  
  // 弹框的取消事件
  const onClose = () => {
    emits("onClose");
  };
  
  const rules = reactive({
    name: [{ required: true, trigger: "blur", message: "请输入菜名" }],
    img: [{ required: true, trigger: "blur", message: "请上传图片" }],
    price: [{ required: true, trigger: "blur", message: "请输入价格" }],
    num: [{ required: true, trigger: "blur", message: "请输入份量" }],
    detail: [{ required: true, trigger: "blur", message: "请输入详情" }],
  });
  
  const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/api/food", FoodModel);

      emits("refresh");
      onClose();
      // 清空表单信息
      addFormRef.value.resetFields();
    }
  });
};

  </script>
  
  <style lang="scss" scoped></style>