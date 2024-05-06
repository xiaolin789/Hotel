<template>
  <div class="logincontainer">
    <el-form
      class="formstyle"
      :model="loginModel"
      ref="loginForm"
      :rules="rules"
      size="default"
    >
      <el-form-item style="display: flex; justify-content: center">
        <div class="loginTitleStyle">系统登录</div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="loginModel.username"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="large"
          type="password"
          v-model="loginModel.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row style="width: 100%; margin-top: 20px">
          <el-col
            :span="12"
            :offset="0"
            style="padding-right: 10px; padding-left: 0px"
          >
            <el-button
              style="width: 100%"
              size="large"
              type="primary"
              @click="onSubmit"
              >登录</el-button
            >
          </el-col>
          <el-col
            :span="12"
            :offset="0"
            style="padding-right: 0px; padding-left: 10px"
          >
            <el-button type="danger" plain style="width: 100%" size="large"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { userStore } from "../../store/user/user";
import { ElMessage, ElMessageBox } from "element-plus";

const loginForm = ref();
const store = userStore();
const router = useRouter();

const loginModel = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ trigger: "blur", message: "请输入账号", required: true }],
  password: [{ trigger: "blur", message: "请输入密码", required: true }],
});

const onSubmit = () => {
  // 1.校验表单
  loginForm.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.post("/api/user/login", loginModel);

      if (res.data.code == "200") {
        console.log(res.data.data);
        store.setUserId(res.data.data.user_id);
        store.setRole(res.data.data.role);
        router.push("/");
      } else {
        localStorage.removeItem("token");
        ElMessage.error("用户名或密码错误");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.logincontainer {
  height: 100%;
  background: #fff;
  background-size: 100% 100%;
  background-image: url("../../assets/login/login.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  .formstyle {
    border-radius: 10px;
    background: #fff;
    height: 300px;
    width: 420px;
    padding: 20px 35px;
    .loginTitleStyle {
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
