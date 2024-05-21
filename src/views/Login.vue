<template>
  <van-nav-bar title="登录"/>
  <div class="container-avatar">
    <div class="van-image van-image-round" style="width: 9rem; height: 9rem">
      <div>
        <img class="van-image-img" :src="avatarUrl" alt="">
      </div>
    </div>
  </div>
  <div class="login">
    <div class="login-item">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
        >
          <q-input
              filled
              v-model="userLoginInfo.userAccount"
              label="账号 *"
              lazy-rules
              @blur="handleImg"
              :rules="[ val => val && val.length > 0 || '请输入账号']"
          />
          <q-input
              filled
              type="password"
              v-model="userLoginInfo.userPassword"
              label="密码 *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || '请输入密码']"
          />

          <q-toggle v-model="accept" label="接受协议"/>

          <div class="login-btn">
            <q-btn class="button" label="登录" type="submit" color="primary"/>
            <q-btn label="重置" type="reset" color="primary" class="q-ml-sm button"/>
          </div>
          <div class="register">
            <q-btn class="button" label="去注册" flat color="primary" @click="register"/>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import router from "@/router/router.js";
import {showFailToast} from "vant";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
import {getAvatarUrl} from "@/utils/request/user.js";
// 登录信息
// 如果注册成功，从pinia里面取出账号和密码
const registerAndLoginStore = useRegisterAndLoginStore()
let userLoginInfo = reactive({
  userAccount: registerAndLoginStore.userAccount,
  userPassword: registerAndLoginStore.userPassword
})
let avatarUrl = ref('https://partner-files-1318575555.cos.ap-chengdu.myqcloud.com/%E5%B0%8F%E9%BB%91%E5%AD%90.jpg')
// 是否勾选协议
const accept = ref(false)
//用户登录提交
const onSubmit = async () => {
  if (accept.value === false) {
    showFailToast('请勾选协议')
  } else {
    await registerAndLoginStore.login(userLoginInfo.userAccount, userLoginInfo.userPassword)
  }
}
// 账号输入完获取该账号的头像
const handleImg = async () => {
  const res = await getAvatarUrl(userLoginInfo.userAccount)
  if (res.data.data !== null) {
    avatarUrl.value = res.data.data
  }
}

// 账号密码重置
const onReset = () => {
  userLoginInfo.userAccount = null
  userLoginInfo.userPassword = null
  accept.value = false
}

//用户注册账号
const register = () => {
  router.push('/registerAndLogin')
}

</script>

<style scoped lang="less">
.login {
  padding: 30px 0;
  /*登录重置按钮整体*/

  .login-btn {
    display: flex;
    justify-content: space-around;
    /*登录按钮和重置按钮*/

    .button {
      width: 100px;
    }
  }

  .register {
    float: right;

    .button {
      width: 100px;
    }
  }
}

.container-avatar {
  padding: 5px;
  text-align: center;
  margin-bottom: 5px;
}

.van-image {
  position: relative;
  display: inline-block;
  box-shadow: rgb(0, 0, 0) 0 4px 12px;
}

.van-image-round {
  overflow: hidden;
  border-radius: var(--van-radius-max);
}

.van-image-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

</style>