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
          v-model="listParm.title"
          placeholder="请输入广告标题"
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

    <add-banner
      :visible="dialogVisible"
      @onClose="onClose"
      @refresh="refresh"
    ></add-banner>

    <el-table

      :height="tableHeight"
      :data="tableList"
      style="width: 100%"
      stripe
    >
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
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitchChange(scope.row)"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </template>
      </el-table-column>
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
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AddBanner from "./AddBanner.vue";
import { Search, Edit, Plus, Close, Delete } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import Upload from "./Upload.vue";
import upload from "@/utils/upload";


const dialogVisible = ref(false);
const visible = ref(false);
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

const activeModel = reactive({
    ban_id: "",
    title: "",
    status: "",
    img_url: "",
    file: null
})

const listParm = reactive({
  title: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

onMounted(() => {
  getList();
  tableHeight.value = window.innerHeight - 235;
});


const getList = async () => {
  let res = await axios.get("/api/banner/list", { params: listParm });
  //   console.log(res.data);
  if (res.data.code == "200") {
    tableList.value = res.data.data.data;
    listParm.total = res.data.data.total;
  }
};

// 每次选择完图片之后的回调
const handleChange = (file) => {
    activeModel.img_url = URL.createObjectURL(file);
    activeModel.file = file;
};

// 上架开关回调
const handleSwitchChange = async (item) => {
  // console.log(item);
  await axios.put("/api/banner/publish", {
    ban_id: item.ban_id,
    status: item.status,
  });

  await getList();
};

const searchBtn = async () => {
  let res = await axios.get('/api/searchban', {params: listParm})
  if(res.data.code == '200'){
    tableList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.title = ''
  getList()
}

const refresh = () => {
  getList();
};

const editBtn = async (data) => {
  let res = await axios.get(`/api/banner/listId/${data.ban_id}`);
  console.log(res.data);
  // Object.assign(activeModel, res.data.data[0]);
  // const newData = reactive({ ...res.data.data[0] });
  // Object.assign(activeModel, newData);
  // const newData = JSON.parse(JSON.stringify(res.data.data[0]));
  // Object.assign(activeModel, newData);

  const newData = res.data.data[0];
  activeModel.ban_id = newData.ban_id;
  activeModel.title = newData.title;
  activeModel.status = newData.status;
  activeModel.img_url = newData.img_url;
  activeModel.file = newData.file;
  visible.value = true;
};

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload(`/api/banner/updateList/${activeModel.ban_id}`, activeModel).then(data => {
        getList();
      });
    }
    visible.value = false;
  });
};

const deleteBtn = (data) => {
  ElMessageBox.confirm("确定要删除该数据吗", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.delete(`/api/banner/list/${data.ban_id}`);
      if (res.data.code == "200") {
        ElMessage.success("删除成功");
      }
      getList();
    })
    .catch(() => {});
};

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
</script>

<style lang="scss" scoped></style>
