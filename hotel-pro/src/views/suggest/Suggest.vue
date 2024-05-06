<template>
  <el-main>
    <el-table
      :height="tableHeight"
      :data="tableList"
      style="width: 100%"
      stripe
    >
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
            {{ formatTime.getTime(scope.row.create_time) }}
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
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import formatTime from "@/utils/formatTime";

const tableList = ref([]);
const tableHeight = ref();


const listParm = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

// 页容量改变时触发
const sizeChange = (val) => {
  listParm.pageSize = val;
  getSuggest();
};
// 页数改变时触发
const currentChange = (val) => {
  listParm.currentPage = val;
  getSuggest();
};

const getSuggest = async () => {
  let res = await axios.get("/api/suggest/getList", { params: listParm });
  console.log(res.data);
  if (res.data.code == "200") {
    tableList.value = res.data.data.data;
    listParm.total = res.data.data.total;
  }
};

onMounted(() => {
  getSuggest();
  tableHeight.value = window.innerHeight - 235;
});
</script>

<style lang="scss" scoped></style>
