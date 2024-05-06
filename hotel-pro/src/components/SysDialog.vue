<template>
  <el-dialog
    v-model="props.visible"
    title="新增角色"
    :before-close="onClose"
    append-to-body
    :close-on-click-modal="false"
  >
    <div class="container">
        <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>


// 子组件接收父组件的值
const props = defineProps({
    visible: false,
})
// 注册事件
const emits = defineEmits(['onConfirm', 'onClose'])
// 弹框的确定事件
const onConfirm = () => {
    emits('onConfirm')
}
// 弹框的取消事件
const onClose = () => {
    emits('onClose')
}
</script>

<style lang="scss" scoped>
// .container {
//     overflow-x: initial;
//     overflow-y: auto;
// }
// .el-dialog {
//     border-top-left-radius: 7px !important;
//     border-top-right-radius: 7px !important;
//     .el-dialog__header {
//         margin-right: 0px;
//         border-top-left-radius: 7px !important;
//         border-top-right-radius: 7px !important;
//         background-color: #009688 !important;
//         .el-dialog__title {
//             color: #fff;
//             font-size: 16px;
//             font-weight: 600;
//         }
//     }
// }
// .el-dialog__headerbtn {
//     .el-dialog__close {
//         color: #fff;
//     }
// }
// .el-dialog__body {
//     padding: 10px;
// }
// .el-dialog__footer {
//     border-top: 1px solid #e8eaec !important;
//     padding: 10px;
// }
</style>