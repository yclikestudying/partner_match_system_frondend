<template>
  <router-view/>
  <tab-bar/>
</template>

<script setup>
import {useQuasar} from 'quasar'
import TabBar from '@/components/common/TabBar.vue'
import {ref} from "vue";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLogin = useRegisterAndLoginStore()
const currentUserId = registerAndLogin.userInfo.id
const $q = useQuasar()
// 请求添加好友信息
const message = ref(null)
// 头像
const avatarUrl = ref(null)
// 用户名称
const username = ref(null)
const showNotify = () => {
  $q.notify({
    position: 'top',
    message: "用户 " + username.value + " " + message.value,
    color: 'white',
    textColor: 'black',
    avatar: avatarUrl.value,
    timeout: 1000
  })
}
let ws = null
if ('WebSocket' in window) {
  ws = new WebSocket(`ws://162.14.69.240:8080/api/websocket/${currentUserId}`)
  /*建立连接*/
  ws.onopen = () => {
    ws.send('建立连接')
  }
  /*接收消息*/
  ws.onmessage = (evt) => {
    const res = JSON.parse(evt.data)
    message.value = res.message
    avatarUrl.value = res.avatarUrl
    username.value = res.username
    showNotify()
  }
  /*关闭连接*/
  ws.onclose = () => {
    console.log('关闭连接')
  }
  ws.onbeforeunload = () => {
    ws.close()
  }
} else {
  console.log('您的浏览器不支持websocket')
}
</script>

<style scoped lang="less">

</style>