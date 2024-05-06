<template>
  <el-drawer
    v-model="props.visible"
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
          <el-form-item prop="info_order" label="房间号">
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
          <el-checkbox-group v-model="RoomModel.checkService">
            <el-checkbox v-for="item in RoomModel.service" :label="item.name">{{
              item.name
            }}</el-checkbox>
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
        <el-col :span="24" :offset="0">
          <el-form-item prop="info_details" label="套房详情">
            <el-input
              v-model="RoomModel.info_details"
              :rows="12"
              type="textarea"
            />
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
  </el-drawer>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Upload from "./Upload.vue";
import upload from "@/utils/upload";
import { ElMessage } from "element-plus";

const addFormRef = ref();

const props = defineProps({
  visible: false,
});

const selectData = ref([])

const RoomModel = reactive({
  info_name: "",
  info_label: "",
  info_price: "",
  info_details: "",
  info_recommed: "",
  img_url: "",
  info_order: "",
  info_count: "",
  info_status: "",
  service: [],
  checkService: [],
  file: null,
  info_book: 0
});

const checkService = (rule, value, callback) => {
  if (value.length == 0) {
    return callback(new Error("请选择服务"));
  } else {
    callback();
  }
};

// 每次选择完图片之后的回调
const handleChange = (file) => {
  RoomModel.img_url = URL.createObjectURL(file);
  RoomModel.file = file;
};

const rules = reactive({
  info_label: [{ trigger: "blur", message: "请输入客房类型", required: true }],
  info_name: [{ trigger: "blur", message: "请输入客房名称", required: true }],
  info_price: [{ trigger: "blur", message: "请输入客房价格", required: true }],
  info_order: [{ trigger: "blur", message: "请填写房间号", required: true }],
  info_status: [{ trigger: "blur", message: "请选择客房状态", required: true }],
  info_recommed: [{ trigger: "blur", message: "是否热推", required: true }],
  checkService: [{ validator: checkService, trigger: "blur" }],
  img_url: [{ trigger: "blur", message: "请上传图片", required: true }],
  info_details: [
    { trigger: "blur", message: "请输入套房详情", required: true },
  ],
});

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

// 注册事件
const emits = defineEmits(["onClose"]);

// 弹框的取消事件
const onClose = () => {
  emits("onClose");
};

onMounted(() => {
  getSelectData();
  getServiceData();
});

const onConfirm = () => {
  addFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/api/room", RoomModel);

      emits("refresh");
      onClose();
      // 清空表单信息
      addFormRef.value.resetFields();
    }
  });
  // console.log(RoomModel);
};

const getSelectData = async () => {
  let res = await axios.get("/api/room/select");
  if (res.data.code == "200") {
    console.log(res.data.data);
    selectData.value = res.data.data;
    
  }
};

const getServiceData = async () => {
  let res = await axios.get("/api/room/service");
  if (res.data.code == "200") {
    console.log(res.data.data);
    RoomModel.service = res.data.data;
  }
};
</script>

<style lang="scss" scoped></style>
