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
        <el-input v-model="listParm.name" placeholder="请输入菜品"></el-input>
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
      <el-table-column prop="name" label="菜名"></el-table-column>
      <el-table-column prop="img_url" label="图片">
        <template #default="scope">
          <div v-if="scope.row.img_url">
            <el-avatar
              :size="50"
              :src="'http://localhost:3000' + scope.row.img_url"
            ></el-avatar>
          </div>

          <div v-else>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
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
        </el-row>
        <el-col :span="24" :offset="0">
          <el-form-item prop="detail" label="详情">
            <el-input v-model="FoodModel.detail" :rows="8" type="textarea" />
          </el-form-item>
        </el-col>
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
    <add-food
      :visible="dialogVisible"
      @refresh="refresh"
      @onClose="onClose"
    ></add-food>
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AddFood from "./FoodAdd.vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, Edit, Plus, Close, Delete } from "@element-plus/icons-vue";
import Upload from "./Upload.vue";
import upload from "@/utils/upload";

const visible = ref(false);
const dialogVisible = ref(false);
const tableList = ref([]);
const tableHeight = ref();
const addFormRef = ref();

const addBtn = () => {
  dialogVisible.value = true;
};

const onClose = () => {
  dialogVisible.value = false;
  visible.value = false;
};

const FoodModel = reactive({
  id:"",
  name: "",
  img_url: "",
  price: "",
  detail: "",
  file: null,
});

const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入菜名" }],
  img_url: [{ required: true, trigger: "blur", message: "请上传图片" }],
  price: [{ required: true, trigger: "blur", message: "请输入价格" }],
  num: [{ required: true, trigger: "blur", message: "请输入份量" }],
  detail: [{ required: true, trigger: "blur", message: "请输入详情" }],
});

const listParm = reactive({
  name: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const searchBtn = async () => {
  let res = await axios.get("/api/searchservice", { params: listParm });
  if (res.data.code == "200") {
    tableList.value = res.data.data;
  }
};

const resetBtn = () => {
  listParm.name = "";
  getList();
};

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
  let res = await axios.get("/api/food/list", { params: listParm });
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

// 每次选择完图片之后的回调
const handleChange = (file) => {
  FoodModel.img_url = URL.createObjectURL(file);
  FoodModel.file = file; 
}

// 编辑数据
const editBtn = async (data) => {
  let res = await axios.get(`/api/food/listId/${data.id}`);
  console.log(res.data);
  const newData = res.data.data[0];
  FoodModel.id = newData.id;
  FoodModel.name = newData.name;
  FoodModel.price = newData.price;
  FoodModel.img_url = newData.img_url;
  FoodModel.file = newData.file;
  FoodModel.detail = newData.detail
  visible.value = true;
};

const onConfirm = () => {
  // addFormRef.value.validate(async (valid) => {
  //   if (valid) {
  //     await upload(`/api/food/updateList/${FoodModel.id}`, FoodModel).then(
  //       (data) => {
  //         getList();
  //       }
  //     );
  //   }
  //   visible.value = false;
  // });
  // console.log("edit", FoodModel);
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload(`/api/food/updateList/${FoodModel.id}`, FoodModel).then(data => {
        getList();
      });
    }
    visible.value = false;
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
      let res = await axios.delete(`/api/food/list/${data.id}`);
      if (res.data.code == "200") {
        ElMessage.success("删除成功");
      }
      getList();
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped></style>
