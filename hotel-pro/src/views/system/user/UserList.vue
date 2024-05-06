<template>
  <el-main>
    <el-form
      :model="listParm"
      :rules="rules"
      label-width="80px"
      :inline="true"
      size="default"
    >
      <el-form-item>
        <el-input
          v-model="listParm.nick_name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" :icon="Search">搜索</el-button>
        <el-button @click="resetBtn" plain type="danger" :icon="Close"
          >重置</el-button
        >
        <el-button type="primary" @click="addBtn" :icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableList" style="width: 100%" stripe>
      <el-table-column prop="nick_name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          <el-tag v-if="scope.row.sex === 0" class="ml-2" type="success"
            >男</el-tag
          >

          <el-tag v-else class="ml-2" type="danger"> 女 </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话"  align="center"></el-table-column>
      <el-table-column prop="salary" label="薪水"  align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180px" align="center"></el-table-column>
      <el-table-column prop="username" label="账户"  align="center"></el-table-column>
      <el-table-column label="操作" width="350px" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            size="default"
            @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            :icon="Delete"
            size="default"
            @click="deleteBtn(scope.row)"
            >删除</el-button
          >
          <el-button
            type="warning"
            :icon="Delete"
            size="default"
            @click="resetPassWord(scope.row)"
            >重置密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total"
      background
    >
    </el-pagination>

    <el-dialog
      v-model="visible"
      title="编辑信息"
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
              <el-select
                v-model="UserModel.role"
                class="m-2"
                style="width: 100%"
              >
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

    <!-- 新增、编辑弹框 -->
    <add-user :visible="dialogVisible" @refresh="refresh" @onClose="onClose">
    </add-user>
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted,computed } from "vue";
import { Search, Edit, Plus, Close, Delete } from "@element-plus/icons-vue";
import axios from "axios";
import AddUser from "./AddUser.vue";
import { ElMessage, ElMessageBox } from "element-plus";

const addFormRef = ref();
const visible = ref(false);

const tableHeight = ref(window.innerHeight - 235);

const dialogVisible = ref(false);

const tableList = ref([]);

const UserModel = reactive({
  user_id: "",
  role_id: "",
  username: "",
  role: "",
  sex: "",
  salary: "",
  phone: "",
  email: "",
  is_enable: "", // 账户是否可用
  nick_name: "", // 姓名
});

const listParm = reactive({
  phone: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
  nick_name: '',
  phone: ''
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
]


const rules = reactive({
  nick_name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
  sex: [{ required: true, trigger: "blur", message: "请选择性别" }],
  phone: [{ required: true, trigger: "blur", message: "请输入电话号码" }],
  email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
  role: [{ required: true, trigger: "blur", message: "请选择角色" }],
  username: [{ required: true, trigger: "blur", message: "请输入账号" }],
  salary: [{ required: true, trigger: "blur", message: "请填写薪水" }],
});

const addBtn = () => {
  dialogVisible.value = true;
};

const onClose = () => {
  dialogVisible.value = false;
  visible.value = false;
};

const searchBtn = async () => {
  let res = await axios.get('/api/searchuse', {params: listParm})
  if(res.data.code == '200'){
    tableList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.nick_name = ''
  getList()
}

const getList = async () => {
  let res = await axios.get("/api/user/list", { params: listParm });
  if (res.data.code == "200") {
    console.log(res.data);
    tableList.value = res.data.data.data;
    listParm.total = res.data.data.total;
  }
};

const editBtn = async (data) => {
  let res = await axios.get(`/api/user/listId/${data.user_id}`);
  console.log(res.data);
  Object.assign(UserModel, res.data.data[0]);
  visible.value = true;
};

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.put(`/api/user/updateList/:user_id`, UserModel);
      if (res.data.code == "200") {
        ElMessage.success("修改成功");
      }
      visible.value = false;
    }
    getList();
  });
};

const deleteBtn = (data) => {
    ElMessageBox.confirm("确定要删除该数据吗", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.delete(`/api/user/list/${data.user_id}`);
      if (res.data.code == "200") {
        ElMessage.success('删除成功')
      }
      getList();
    })
    .catch(() => {
      
    });
}

const resetPassWord = (data) => {
    ElMessageBox.confirm("确定要重置密码吗", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.post(`/api/user/listPassword/${data.user_id}`);
      if (res.data.code == "200") {
        ElMessage.success('重置成功')
      }
      getList();
    })
    .catch(() => {
      
    });
}

const refresh = () => {
  getList();
};

// 页容量改变时触发
const sizeChange = (val) => {
  listParm.pageSize = val;
  getList();
};
// 页数改变时触发
const currentChange = (val) => {
  listParm.currentPage = val;
  getList();
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
