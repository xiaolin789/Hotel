<template>
  <el-dialog
    v-model="props.visible"
    title="新增员工"
    :before-close="onClose"
    append-to-body
    :close-on-click-modal="false"
  >
    <el-form
      :model="UserModel"
      ref="addFormRef"
      :rules="rules"
      label-width="80px"
      size="default"
    >
      <el-row>
        <el-col :span="12" :offset="0">
          <el-form-item prop="nick_name" label="姓名">
            <el-input v-model="UserModel.nick_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
            <el-form-item prop="sex" label="性别">
              <el-select
                v-model="UserModel.sex"
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
            <el-input v-model="UserModel.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="UserModel.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="role" label="角色">
            <el-select v-model="UserModel.role" class="m-2" style="width: 100%">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
       
        <el-col :span="12" :offset="0">
          <el-form-item prop="username" label="账号">
            <el-input v-model="UserModel.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="UserModel.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="salary" label="薪水">
            <el-input v-model="UserModel.salary"></el-input>
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
import axios from "axios";
import { ElMessage } from "element-plus";
const addFormRef = ref();

const props = defineProps({
  visible: false,
});

// 注册事件
const emits = defineEmits(["onClose"]);

// 弹框的取消事件
const onClose = () => {
  emits("onClose");
};


const UserModel = reactive({
  user_id: "",
  role_id: "",
  username: "",
  password: "",
  role: "",
  sex: "",
  salary: "",
  phone: "",
  email: "",
  is_enable: "", // 账户是否可用
  nick_name: "", // 姓名
});

const options = [
  {
    label: "男",
    value: 0,
  },
  {
    label: "女",
    value: 1,
  },
];


const options3 = [
  {
    label: "系统管理员",
    value: "0",
  },
  {
    label: "员工",
    value: "1",
  },
];

const rules = reactive({
  nick_name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
  sex: [{ required: true, trigger: "blur", message: "请选择性别" }],
  phone: [{ required: true, trigger: "blur", message: "请输入电话号码" }],
  email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
  role: [{ required: true, trigger: "blur", message: "请选择角色" }],
  is_enable: [{ required: true, trigger: "blur", message: "请选择状态" }],
  username: [{ required: true, trigger: "blur", message: "请输入账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
  salary: [{ required: true, trigger: "blur", message: "请填写薪水" }],
});

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.post("/api/user", UserModel);
      if (res.data.code == "201") {
        ElMessage.error("账号已存在");
      }
      if (res.data.code == "200") {
        console.log(res.data);
        ElMessage.success("添加成功");
        emits("refresh");
        onClose();
        // 清空表单信息
        addFormRef.value.resetFields();
      }
    }
  });
};
</script>

<style lang="scss" scoped></style>
