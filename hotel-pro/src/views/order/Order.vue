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
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" :icon="Search">搜索</el-button>
        <el-button @click="resetBtn" plain type="danger" :icon="Close"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      :height="tableHeight"
      :data="tableList"
      style="width: 100%"
      stripe
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="room_id" label="房间ID"></el-table-column>
      <el-table-column  label="预订时间">
        <template #default="scope">
            {{ formatTime.getTime(scope.row.create_time) }}
          </template>
      </el-table-column>
      <el-table-column prop="info_status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.info_book === 1" class="ml-2" type="success"
            >已预定</el-tag
          >
          <el-tag v-else class="ml-2" type="danger"> 已退房 </el-tag>
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
  </el-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/utils/formatTime";

const tableList = ref([]);
const tableHeight = ref();

const listParm = reactive({
  name: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const searchBtn = async () => {
  let res = await axios.get('/api/searchorder', {params: listParm})
  if(res.data.code == '200'){
    tableList.value = res.data.data
  }
}

const resetBtn = () => {
  listParm.name = ''
  getList()
}

// 分页展示数据
const getList = async () => {
  let res = await axios.get("/api/order/list", { params: listParm });
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

onMounted(() => {
  getList();
//   nextTick(() => {
//     tableHeight.value = window.innerHeight - 210;
//   });
tableHeight.value = window.innerHeight - 235;
});

</script>

<style lang="scss" scoped></style>
