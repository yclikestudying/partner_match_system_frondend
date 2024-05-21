// 对所有store进行管理
import {defineStore} from "pinia";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
import useIndexStore from "@/store/index/index.js";

const registerAndLogin = useRegisterAndLoginStore()
const indexStore = useIndexStore()
const useAllStore = defineStore('allStore', {
    actions: {
        clear() {
            // 重置注册登录保存在pinia中的信息
            registerAndLogin.$reset()
            // 重置主页中pinia的信息
            indexStore.$reset()
        }
    }
})

export default useAllStore