<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form
      :model="listParm"
      :rules="rules"
      label-width="80px"
      :inline="true"
      size="default"
    >
      <el-form-item label="">
        <el-input v-model="listParm.role_name" placeholder="请输入角色名称"></el-input>
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
      <el-table-column prop="role_name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="备注" ></el-table-column>
      <el-table-column label="操作" width="220" align="center">
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
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="visible"
      title="编辑角色"
      :before-close="onClose"
      append-to-body
      :close-on-click-modal="false"
    >
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

      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="onClose">取消</el-button>
          <el-button type="primary" @click="onConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
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
    <!-- 新增、编辑弹框 -->
    <add-role ref="addRef" @refresh="refresh" ></add-role>
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from "vue";
import { Search, Edit, Plus, Close, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AddRole from "./AddRole.vue";
import axios from "axios";


const tableHeight = ref();
const visible = ref(false);
const addRef = ref(false);
const addFormRef = ref();


// 表单绑定的数据
const addModel = reactive({
  role_name: "",
  remark: "",
});

// 表单验证规则
const rules = reactive({
  role_name: [{ required: true, trigger: "blur", message: "请输入角色名称" }],
  remark: [{ required: true, trigger: "blur", message: "请填写备注" }],
});

const tableList = ref([]);

// 列表查询参数
const listParm = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  role_name:''
});

const addBtn = () => {
  addRef.value.onShow();
};

onMounted(() => {
  getList();
  nextTick(() => {
    tableHeight.value = window.innerHeight - 235;
  });
});
// 分页展示数据
const getList = async () => {
  let res = await axios.get("/api/role/list", { params: listParm });
  //   console.log(res.data);
  if (res.data.code == "200") {
    tableList.value = res.data.data.data;
    listParm.total = res.data.data.total;
  }
};
// 刷新列表
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

const searchBtn = async () => {
  let res = await axios.get('/api/searchrole', {params: listParm})
  if(res.data.code == '200'){
    tableList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.role_name = ''
  getList()
}

// 编辑数据
const editBtn = async (data) => {
  let res = await axios.get(`/api/role/listId/${data.role_id}`);
  console.log(res.data);
  Object.assign(addModel, res.data.data[0]);
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.put(
        `/api/role/updateList/${addModel.role_id}`,
        addModel
      );
      console.log(addModel.role_name);
      if (res.data.code == "200") {
        // 信息提示
        ElMessage.success("编辑成功");
      }
    }
    visible.value = false;

    getList();
  });
};

// 删除数据
const deleteBtn = (data) => {
  ElMessageBox.confirm("确定要删除该数据吗", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.delete(`/api/role/list/${data.role_id}`);
      if (res.data.code == "200") {
        ElMessage.success('删除成功')
      }
      getList();
    })
    .catch(() => {
      
    });
};
</script>

<style lang="scss" scoped></style>
