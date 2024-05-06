<template>
  <el-dialog
    v-model="props.visible"
    title="新增广告"
    :before-close="onClose"
    append-to-body
    :close-on-click-modal="false"
  >
    <el-form
      :model="activeModel"
      ref="addFormRef"
      :rules="rules"
      label-width="80px"
      size="default"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item prop="title" label="标题">
            <el-input v-model="activeModel.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="status" label="状态">
            <el-select
              v-model="activeModel.status"
              class="m-2"
              style="width: 100%"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="21" :offset="0">
          <el-form-item label="上传图片" prop="img_url">
            <Upload
              :avatar="activeModel.img_url"
              @linchange="handleChange"
            ></Upload>
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
import { ref, reactive, onMounted } from "vue";
import Upload from "./Upload.vue";
import upload from "@/utils/upload";

const activeModel = reactive({
    title: "",
    status: "",
    img_url: "",
    file: null
})

const addFormRef = ref();

const props = defineProps({
  visible: false,
});

const options2 = [
  {
    label: "下架",
    value: 0,
  },
  {
    label: "上架",
    value: 1,
  },
];

const rules = reactive({
  title: [{ trigger: "blur", message: "请输入标题", required: true }],
  status: [{ trigger: "blur", message: "请选择状态", required: true }],
  img_url: [{ trigger: "blur", message: "请上传图片", required: true }],
});

// 注册事件
const emits = defineEmits(["onClose"]);

// 弹框的取消事件
const onClose = () => {
  emits("onClose");
};

// 每次选择完图片之后的回调
const handleChange = (file) => {
    activeModel.img_url = URL.createObjectURL(file);
    activeModel.file = file;
};


const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/api/banner", activeModel);

      emits("refresh");
      onClose();
      // 清空表单信息
      addFormRef.value.resetFields();
    }
  });
};
</script>

<style lang="scss" scoped></style>
