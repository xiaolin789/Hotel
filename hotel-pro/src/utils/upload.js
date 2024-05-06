import axios from "axios";
import { ElMessage } from "element-plus";

function upload(path, userForm) {
    const params = new FormData();
    for (let i in userForm) {
      params.append(i, userForm[i]);
    }

    return axios.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => {
        if(res.data.code == '200') {
            ElMessage.success("添加成功");
        }
        if(res.data.code == '201') {
            ElMessage.success("编辑成功");
        }
    })
}


export default upload