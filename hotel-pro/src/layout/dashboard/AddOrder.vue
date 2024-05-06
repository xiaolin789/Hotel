<template>
  <div>
    <el-dialog
      v-model="props.visible"
      title="登记信息"
      :before-close="onClose"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        :model="bookModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="bookModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="sex" label="性别">
              <el-select
                v-model="bookModel.sex"
                class="m-2"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="phone" label="电话">
              <el-input v-model="bookModel.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="card" label="身份证">
              <el-input v-model="bookModel.card"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="price" label="价格">
              <el-input v-model="bookModel.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="user" label="操作员">
              <el-input v-model="bookModel.user"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="status" label="状态">
              <el-select
                v-model="bookModel.status"
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
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="onClose">取消</el-button>
          <el-button type="primary" @click="onConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const addFormRef = ref();

const props = defineProps({
  visible: false,
});

const bookModel = reactive({
  name: "",
  phone: "",
  card: "",
  sex: "",
  price: "",
  user: "",
  status: "",
  info_code: "",
});

const rules = reactive({
  name: [{ trigger: "blur", message: "请输入姓名", required: true }],
  phone: [{ trigger: "blur", message: "请输入手机号", required: true }],
  card: [{ trigger: "blur", message: "请输入身份证", required: true }],
  sex: [{ trigger: "blur", message: "请选择性别", required: true }],
  price: [{ trigger: "blur", message: "请填写价格", required: true }],
  user: [{ trigger: "blur", message: "请输入操作员姓名", required: true }],
  status: [{ trigger: "blur", message: "请选择状态", required: true }],
});

// 注册事件
const emits = defineEmits(["onClose"]);

// 弹框的取消事件
const onClose = () => {
  emits("onClose");
};

const options2 = [
  {
    label: "空房",
    value: 0,
  },
  {
    label: "已预订",
    value: 1,
  },
];

const options = [
  {
    label: "男",
    value: 3,
  },
  {
    label: "女",
    value: 4,
  },
];

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.post('/api/room/book', bookModel);
        console.log(res);
      if (res.data.code == "200") {
        // 信息提示
        ElMessage.success("登记成功");

        // 刷新列表
        emits("refresh");
        onClose();
      }
    }
  });
};
</script>

<style lang="scss" scoped></style>
