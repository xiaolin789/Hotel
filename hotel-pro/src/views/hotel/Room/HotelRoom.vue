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
          v-model="listParm.info_order"
          placeholder="请输入客房名称"
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

    <add-room
      :visible="dialogVisible"
      @onClose="onClose"
      @refresh="refresh"
    ></add-room>

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
      <el-table-column prop="info_name" label="套房名称"></el-table-column>
      <el-table-column prop="info_price" label="价格"></el-table-column>
      <el-table-column prop="info_order" label="房间号"></el-table-column>
      <el-table-column prop="info_recommed" label="是否热推">
          <template #default="scope">
            <el-switch
              v-model="scope.row.info_recommed"
              :active-value=3
              :inactive-value=4
              @change="handleSwitchChange(scope.row)"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
            />
          </template>
        </el-table-column>
      <el-table-column prop="info_status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.info_status === 1" class="ml-2" type="success"
            >启用</el-tag
          >
          <el-tag v-else class="ml-2" type="danger"> 停用 </el-tag>
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

    <el-drawer
      v-model="visible"
      title="新增房间管理"
      :before-close="onClose"
      append-to-body
      :close-on-click-modal="false"
      size="40%"
    >
      <el-form
        :model="RoomModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="info_name" label="客房名称">
              <el-input v-model="RoomModel.info_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="info_label" label="房间类型">
            <el-select
              v-model="RoomModel.info_label"
              class="m-2"
              style="width: 100%"
            >
              <el-option
                v-for="item in selectData"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="info_price" label="客房价格">
              <el-input v-model="RoomModel.info_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="info_order" label="房间编号">
              <el-input v-model="RoomModel.info_order"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="info_status" label="状态">
              <el-select
                v-model="RoomModel.info_status"
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
          <el-col :span="12" :offset="0">
          <el-form-item prop="info_recommed" label="是否热推">
            <el-select
              v-model="RoomModel.info_recommed"
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
          <el-form-item prop="checkService" label="客房服务">
            <el-checkbox-group v-model="RoomModel.info_service">
              <el-checkbox
                v-for="item in RoomModel.service"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                ></el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-col :span="24" :offset="0">
            <el-form-item label="上传图片" prop="img_url">
              <Upload
                :avatar="RoomModel.img_url"
                @linchange="handleChange"
              ></Upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24" :offset="0">
          <el-form-item prop="info_details" label="套房详情">
            <el-input
              v-model="RoomModel.info_details"
              :rows="12"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="onClose">取消</el-button>
          <el-button type="primary" @click="onConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-drawer>
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import AddRoom from "./AddRoom.vue";
import axios from "axios";
import Upload from "./Upload.vue";
import upload from "@/utils/upload";
import { ElMessage, ElMessageBox } from "element-plus";

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

const listParm = reactive({
  info_name: "",
  currentPage: 1,
  pageSize: 10,
  total: null,
  info_order:''
});

const selectData = ref([])

const getSelectData = async () => {
  let res = await axios.get("/api/room/select");
  if (res.data.code == "200") {
    console.log(res.data.data);
    selectData.value = res.data.data;
    
  }
};

const options = [
  {
    label: "是",
    value: 3,
  },
  {
    label: "否",
    value: 4,
  },
];


const options2 = [
  {
    label: "停用",
    value: 0,
  },
  {
    label: "启用",
    value: 1,
  },
];

const RoomModel = reactive({
  info_id: "",
  info_name: "",
  info_label: "",
  info_price: "",
  info_details: "",
  img_url: "",
  info_order: "",
  info_count: "",
  info_status: "",
  info_recommed: "",
  service: [],
  checkService: [],
  file: null,
  info_book: 0,
  // info_service:[],
});

const checkService = (rule, value, callback) => {
  if (value.length == 0) {
    return callback(new Error("请选择服务"));
  } else {
    callback();
  }
};

const rules = reactive({
  info_label: [{ trigger: "blur", message: "请输入客房类型", required: true }],
  info_name: [{ trigger: "blur", message: "请输入客房名称", required: true }],
  info_price: [{ trigger: "blur", message: "请输入客房价格", required: true }],
  info_order: [{ trigger: "blur", message: "请填写房间号", required: true }],
  info_status: [{ trigger: "blur", message: "请选择客房状态", required: true }],
  info_recommed: [{ trigger: "blur", message: "是否热推", required: true }],
  info_service: [{ validator: checkService, trigger: "blur" }],
  img_url: [{ trigger: "blur", message: "请上传图片", required: true }],
  info_details: [
    { trigger: "blur", message: "请输入套房详情", required: true },
  ],
});

onMounted(() => {
  getList();
  tableHeight.value = window.innerHeight - 235;
  
});

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
  let res = await axios.get('/api/searchroom', {params: listParm})
  if(res.data.code == '200'){
    tableList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.info_order = ''
  getList()
}

const handleSwitchChange = async (item) => {
  // console.log(item);

  await axios.put("/api/room/recommed", {
    info_id: item.info_id,
    info_recommed: item.info_recommed,
  });

  await getList();
};

const getList = async () => {
  let res = await axios.get("/api/room/list", { params: listParm });
  //   console.log(res.data);
  if (res.data.code == "200") {
    tableList.value = res.data.data.data;
    listParm.total = res.data.data.total;
  }
};

const getServiceData = async () => {
  let res = await axios.get("/api/room/service");
  if (res.data.code == "200") {
    console.log(res.data.data);
    RoomModel.service = res.data.data;
  }
};

const refresh = () => {
  getList();
};

const editBtn = async (data) => {
  let res = await axios.get(`/api/room/listId/${data.info_id}`);
  getSelectData()
  getServiceData();
  console.log(res.data);
  const newData = res.data.data[0];
  RoomModel.info_id = newData.info_id;
  RoomModel.info_name = newData.info_name;
  RoomModel.info_label = newData.info_label;
  RoomModel.info_price = newData.info_price;
  RoomModel.info_order = newData.info_order;
  RoomModel.info_status = newData.info_status;
  RoomModel.info_recommed = newData.info_recommed;
  RoomModel.img_url = newData.img_url;
  RoomModel.file = newData.file;
  RoomModel.info_details = newData.info_details;
  RoomModel.info_service = newData.info_service
  visible.value = true;
  // console.log('RoomModel',RoomModel)
};

// 每次选择完图片之后的回调
const handleChange = (file) => {
  RoomModel.img_url = URL.createObjectURL(file);
  RoomModel.file = file;
  console.log('img_url', RoomModel.img_url )
  console.log(' RoomModel.file',  RoomModel.file )
};

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      RoomModel.checkService = RoomModel.info_service
      await upload(`/api/room/updateList/${RoomModel.info_id}`, RoomModel).then(data=>{
        getList();
      })
    }
    visible.value = false;
  });
  console.log('edit',RoomModel);
};

const deleteBtn = (data) => {
  ElMessageBox.confirm("确定要删除该数据吗", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.delete(`/api/room/list/${data.info_id}`);
      if (res.data.code == "200") {
        ElMessage.success("删除成功");
      }
      getList();
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped></style>
