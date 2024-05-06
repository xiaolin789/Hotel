<template>
  <el-container class="container" :style="{ height: height + 'px' }">
    <el-container>
      <el-header class="header">
        <el-form
          :model="listParm.info_order"
          :inline="true"
          size="small"
          style="border-bottom: 1px solid #efefef; margin-top: 20px"
        >
          <el-form-item>
            <el-input
              v-model="listParm.info_order"
              placeholder="请输入房间号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchBtn()" :icon="Search">搜索</el-button>
            <el-button @click="resetBtn()" :icon="Close">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="main" style="padding: 10px 20px">
        <!-- 房间列表 -->
        <div class="roomList">
          <div
            v-for="(item, index) in roomList"
            :key="index"
            :class="{
              item: item['info_book'] == 0,
              bookitem: item['info_book'] == 1,
            }"
          >
            <div>{{ item["info_name"] }}</div>
            <div style="font-weight: 600; margin: 6px 0px">
              {{ item["info_order"] }}
            </div>
            <div>{{ status[item.info_book] }}</div>

            <el-icon
              style="
                position: relative;
                left: 60px;
                bottom: 6px;
                font-size: 18px;
              "
              @click="openInfo(item)"
            >
              <EditPen />
            </el-icon>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-aside class="aside" width="200px">
      <el-divider style="margin-bottom: 35px" content-position="left">颜色状态</el-divider>
      <div class="items">
        <div class="noitem"></div>
        <div class="item-text">空房</div>
      </div>
      <div class="items">
        <div class="hasitem"></div>
        <div class="item-text">已预定</div>
      </div>
      <el-divider style="margin-top: 60px;margin-bottom: 35px" content-position="left">房间总数：{{ total.total_count }}</el-divider>
      <div class="total">
        <div>空房：</div>
        <div>{{ total.no_book_count }}</div>
      </div>
      <div class="total">
        <div style="color: #1aad19;">已预定：</div>
        <div>{{ total.has_book_count }}</div>
      </div>
    </el-aside>
  </el-container>

  <!-- 前台预订 -->
  <!-- <add-order
    :visible="dialogVisible"
    @onClose="onClose"
    @refresh="refresh"
  ></add-order> -->
  <el-dialog
    v-model="visible"
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
            <el-select v-model="bookModel.sex" class="m-2" style="width: 100%">
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
          <el-form-item prop="info_book" label="状态">
            <el-select
              v-model="bookModel.info_book"
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
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { Search, Close, EditPen } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
// import AddOrder from "./AddOrder.vue";

// 容器高度
const height = ref(0);
const addFormRef = ref();

const roomList = ref([]);

const headerHeight = ref("40px");

const status = ["空房", "已预订"];

// const dialogVisible = ref(false);
const visible = ref(false);

const rules = reactive({
  name: [{ trigger: "blur", message: "请输入姓名", required: true }],
  phone: [{ trigger: "blur", message: "请输入手机号", required: true }],
  card: [{ trigger: "blur", message: "请输入身份证", required: true }],
  sex: [{ trigger: "blur", message: "请选择性别", required: true }],
  price: [{ trigger: "blur", message: "请填写价格", required: true }],
  user: [{ trigger: "blur", message: "请输入操作员姓名", required: true }],
  info_book: [{ trigger: "blur", message: "请选择状态", required: true }],
});

const bookModel = reactive({
  name: "",
  phone: "",
  card: "",
  sex: "",
  price: "",
  user: "",
  info_book: "",
  info_code: "",
  room_id: '',
});

const openInfo = async (item) => {
  // dialogVisible.value = true;
  
  let res = await axios.get(`/api/room/listId/${item.info_id}`);
  console.log(res);
  if (res.data.code == "200" && res.data.data[0].info_book == 0) {
    visible.value = true;
    bookModel.info_code = res.data.data[0].info_order;
    bookModel.room_id = res.data.data[0].info_id
    console.log(bookModel.room_id);
  }
  else {
    let res = await axios.get(`/api/bookroom`)
    console.log(item.info_id);
    res.data.data.forEach(data => {
      console.log(data.room_id);
      if(data.info_code == item.info_order) {
        bookModel.value = data
        console.log(bookModel.value);
      }
    })
    // console.log(res.data);
    ElMessageBox.confirm("确定要退房", "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res = await axios.put(`/api/room/update/${item.info_id}`);
      if (res.data.code == "200") {
        ElMessage.success("办理成功");
      }
      refresh();
    })
    .catch(() => {});
  }
  
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
      let res = await axios.post("/api/room/book", bookModel);
      console.log(res);
      if (res.data.code == "200") {
        // 信息提示
        ElMessage.success("登记成功");
        addFormRef.value.resetFields();
        // 刷新列表
        refresh();
        onClose();
      }
    }
  });
};

const onClose = () => {
  // dialogVisible.value = false;
  visible.value = false;
};

const listParm = reactive({
  info_label: "",
  info_order: "",
});

const searchBtn = async () => {
  let res = await axios.get('/api/searchhome', {params: listParm})
  if(res.data.code == '200'){
    roomList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.info_order = ''
  getRoomList()
}

const refresh = () => {
  getRoomList();
  getTotal()
};

const getRoomList = async () => {
  let res = await axios.get("/api/roomList");
  //   console.log(res.data.data);
  if (res.data.code == "200") {
    const newData = ref([]);
    res.data.data.forEach((data) => {
      // console.log(data);
      if (data.info_status == 1) {
        newData.value.push(data);
        roomList.value = newData.value;
        // console.log(newData.value);
      }
    });

    //   console.log(roomList.value);
  }
};

// 统计
const total = reactive({
  no_book_count: 0,
  has_book_count: 0,
  total_count: 0
})
const getTotal = async() => {
  let res = await axios.get('/api/home/getTotal')
  if(res.data.code == '200') {
    console.log(res.data.data);
    Object.assign(total, res.data.data[0])
    console.log(total);
  }
}


onMounted(() => {
  height.value = window.innerHeight - 100;
  getTotal()
  getRoomList();
  window.onresize = () => {
    return () => {
      if (document.body.clientWidth < 1450) {
        headerHeight.value = "140px";
      } else {
        headerHeight.value = "90px";
      }
    };
  };
});
</script>

<style lang="scss" scoped>
.container {
  .header {
    border-bottom: 1px solid #efefef;
    // height: 90px;
    display: flex;
    // align-items: center;
    flex-direction: column;
  }
  .aside {
    padding: 15px 20px;
    border-left: 1px solid #efefef;
    .items {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .noitem {
        border: 1px solid #dedfe0;
        background-color: #f5f7fa;
        height: 25px;
        width: 50px;
        border-radius: 5px;
      }
      .hasitem {
        border: 1px  solid #dedfe0;
        background-color: #1aad19;
        height: 25px;
        width: 50px;
        border-radius: 5px;
      }
      .item-text {
        font-size: 12px;
        font-weight: bold;
        margin-left: 14px;
      }
    }
    .total {
      display: flex;
      align-items: 20px;
      margin-bottom: 20px;
      font-size: bold;
      font-size: 14px;
    }
  }
}
.roomList {
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  .item {
    border: 1px solid #dedfe0;
    margin: 10px;
    border-radius: 7px;
    background-color: #f5f7fa;
    width: 150px;
    height: 85px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .bookitem {
    border: 1px solid #dedfe0;
    margin: 10px;
    border-radius: 7px;
    background-color: #1aad19;
    width: 150px;
    height: 85px;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
:deep(.el-divider__text) {
  font-weight: bold!important;
}
</style>
