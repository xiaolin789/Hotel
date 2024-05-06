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
          v-model="listParm.name"
          placeholder="请输入服务名称"
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

    <el-table
      :height="tableHeight"
      :data="tableList"
      style="width: 100%"
      stripe
    >
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="order_num" label="序号"></el-table-column>
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
    <add-service
      :visible="dialogVisible"
      @refresh="refresh"
      @onClose="onClose"
    ></add-service>
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AddService from "./AddService.vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, Edit, Plus, Close, Delete } from "@element-plus/icons-vue";

const visible = ref(false);
const dialogVisible = ref(false);
const tableList = ref([]);
const tableHeight = ref();
const addFormRef = ref()

const addBtn = () => {
  dialogVisible.value = true;
};

const onClose = () => {
  dialogVisible.value = false;
  visible.value = false;
};

const ServiceModel = reactive({
    name: '',
    order_num: ''
})

const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入服务名称" }],
  order_num: [{ required: true, trigger: "blur", message: "请输入序号" }],
});

const listParm = reactive({
  name: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const searchBtn = async () => {
  let res = await axios.get('/api/searchservice', {params: listParm})
  if(res.data.code == '200'){
    tableList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.name = ''
  getList()
}

onMounted(() => {
  getList();
//   nextTick(() => {
//     tableHeight.value = window.innerHeight - 210;
//   });
tableHeight.value = window.innerHeight - 235;
});

// 刷新列表
const refresh = () => {
  getList();
};

// 分页展示数据
const getList = async () => {
  let res = await axios.get("/api/service/list", { params: listParm });
  //   console.log(res.data);
  if (res.data.code == "200") {
    tableList.value = res.data.data.data;
    listParm.total = res.data.data.total;
  }
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

// 编辑数据
const editBtn = async (data) => {
  let res = await axios.get(`/api/service/listId/${data.service_id}`);
  console.log(res.data);
  Object.assign(ServiceModel, res.data.data[0]);
  visible.value = true;
};

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      let res = await axios.put(
        `/api/service/updateList/${ServiceModel.service_id}`,
        ServiceModel
      );
    //   console.log(ServiceModel.name);
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
      let res = await axios.delete(`/api/service/list/${data.service_id}`);
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
