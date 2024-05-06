<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <img class="userimg" src="../../assets/login/wode1.png">
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userStore } from '@/store/user/user';

const store = userStore()
const router = useRouter()
const loginOut = () => {
    localStorage.removeItem("token")
    router.push("/login")
    store.setUserId('')
    store.setRole('')
}

</script>

<style lang="scss" scoped>
.userimg {
    height: 38px;
    width: 38px;
    border-radius: 50%;
}
</style>