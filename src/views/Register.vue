<template>
  <div class="register">
    <van-nav-bar
        title="注册"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="q-pa-md" style="max-width: 400px">

      <q-form
          @submit="onRegister"
          @reset="onReset"
          class="q-gutter-md"
      >
        <q-input
            filled
            v-model="userAccount"
            label="账号 *（账号应为4~8位）"
            lazy-rules
            :rules="[ val => val && val.length >= 4 && val.length <= 8 || userAccountMessage]"
        />

        <q-input
            filled
            v-model="userPassword"
            label="密码 *（密码应为6~15位）"
            type="password"
            lazy-rules
            :rules="[ val => val && val.length >= 6 && val.length <= 15 || userPasswordMessage]"
        />

        <q-input
            filled
            v-model="checkPassword"
            label="校验密码 *"
            type="password"
            lazy-rules
            :rules="[ val => val && val === userPassword || checkPasswordMessage]"
        />

        <div class="register-btn">
          <q-btn class="button" label="注册" type="submit" color="primary"/>
          <q-btn label="重置" type="reset" color="primary" class="q-ml-sm button" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import router from "@/router/router.js"
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
// 用户注册信息
const userAccount = ref(null)
const userPassword = ref(null)
const checkPassword = ref(null)
// 账号验证信息
const userAccountMessage = ref('账号应为4~8位')
// 密码验证信息
const userPasswordMessage = ref('密码应为6~15位')
// 校验密码验证信息
const checkPasswordMessage = ref('校验密码和输入密码不一致')

//用户注册
const registerAndLoginStore = useRegisterAndLoginStore()
const onRegister = async () => {
  await registerAndLoginStore.register(userAccount.value, userPassword.value, checkPassword.value)
}
// 注册信息重置
const onReset = () => {
  userAccount.value = null
  userPassword.value = null
  checkPassword.value = null
}

//返回按钮，返回登录页面
const onClickLeft = () => {
  router.push('/login')
}

</script>

<style scoped lang="less">
.register-btn {
  display: flex;
  justify-content: space-around;
  .button {
    width: 100px;
  }
}
</style>