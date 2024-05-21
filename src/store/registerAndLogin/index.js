import {defineStore} from "pinia";
import {userLogin, userRegister} from "@/utils/request/user.js";
import {showFailToast, showSuccessToast} from "vant";
import router from "@/router/router.js";

/**
 * 注册成功时保存注册的账号和密码
 * 一旦登录，账号和密码清空
 */

const useRegisterAndLoginStore = defineStore('register', {
    state: () => ({
        // 账号
        userAccount: null,
        // 密码
        userPassword: null,
        // 当前登录用户的个人信息
        userInfo: {
            avatarUrl: null,
            createTime: null,
            email: null,
            gender: null,
            id: null,
            phone: null,
            profile: null,
            tags: null,
            userAccount: null,
            userRole: null,
            username: null
        },
        // token
        token: null
    }),
    getters: {},
    actions: {
        //用户注册
        async register(userAccount, userPassword, checkPassword) {
            const res = await userRegister(userAccount, userPassword, checkPassword)
            console.log(res)
            if (res.data.code === 1) {
                showSuccessToast(res.data.message)
                this.userAccount = userAccount
                this.userPassword = userPassword
                await router.push('/login')
            }
            if (res.data.code === -1) {
                showFailToast(res.data.description)
            }
        },
        async login(userAccount, userPassword) {
            const res = await userLogin(userAccount, userPassword)
            if (res.data.code === 1) {
                // 登录成功，保存当前用户个人信息
                this.userInfo = res.data.data
                // 登录成功，删除pinia中注册时保存的账号和密码
                this.userAccount = null
                this.userPassword = null
                // 目前设置一个假的token
                this.token = 'token'
                await router.push('/main/index')
            }
            if (res.data.code === -1) {
                showFailToast(res.data.description)
            }
        }
    }
})

export default useRegisterAndLoginStore