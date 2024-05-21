<template>
  <van-nav-bar
      title="消息"
  >
  </van-nav-bar>
  <div class="q-pa-md" style="max-width: 350px">
    <q-item @click="chat(user.id, user.username, user.avatarUrl)" v-for="user in users" :key="user.id" class="q-mb-sm"
            clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img :src="user.avatarUrl">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.username }}</q-item-label>
        <q-item-label caption lines="1">{{ getLastMessage(user.id) }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chat_bubble" color="grey"/>
      </q-item-section>
    </q-item>

    <q-item @click="teamChat(msg.teamId)" class="q-mb-sm" v-for="(msg, index) in teamMessage" :key="index"
            clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img :src="getAvatarUrl(msg.teamId)">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ getTeamName(msg.teamId) }}</q-item-label>
        <q-item-label caption lines="1">{{ getMessage(msg.fromUserId, msg.message) }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chat_bubble" color="grey"/>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
// 测试数据
import {onMounted, reactive, ref} from "vue";
import {getUserLastMessage} from "@/utils/request/user.js";
import router from "@/router/router.js";
import {getTeamLastMessage} from "@/utils/request/team.js";
// 一对一聊天相关数据
const messages = ref(null)
const users = ref(null)
// 群聊相关数据
const teamMessage = ref(null)
const teamUsers = ref(null)
const teams = ref(null)
const map = ref(null)
// 构造一个team，传递给聊天页面
let teamInfo = reactive({
  avatarUrl: '',
  createTime: '',
  description: '',
  id: '',
  ids: [],
  maxNum: '',
  name: '',
  userId: ''
})

onMounted(async () => {
  const res = await getUserLastMessage()
  if (res.data.data !== null) {
    messages.value = res.data.data.messages
    users.value = res.data.data.users
  }
  const data = await getTeamLastMessage()
  if (data !== null) {
    map.value = data.map
    teams.value = data.teams
    teamUsers.value = data.users
    teamMessage.value = data.messages
  }
})
setInterval(async () => {
  const res = await getUserLastMessage()
  if (res.data.data !== null) {
    messages.value = res.data.data.messages
    users.value = res.data.data.users
  }
  const data = await getTeamLastMessage()
  if (data !== null) {
    map.value = data.map
    teams.value = data.teams
    teamUsers.value = data.users
    teamMessage.value = data.messages
  }
}, 500)
// 获取最后一条聊天记录
const getLastMessage = (id) => {
  for (let i = 0; i < messages.value.length; i++) {
    if (messages.value[i].toUserId === id || messages.value[i].fromUserId === id) {
      return messages.value[i].message
    }
  }
}
// 跳转到聊天页面
const chat = (id, username, avatarUrl) => {
  router.push({
    path: '/userChat',
    query: {
      id: id,
      username: username,
      avatarUrl: avatarUrl
    }
  })
}
// 跳转到队伍聊天页面
const teamChat = (teamId) => {
  for (let team of teams.value) {
    if (teamId === team.id) {
      teamInfo = team
      break
    }
  }
  for (let key in map.value) {
    if (teamId === Number(key)) {
      teamInfo.ids = map.value[key]
      break
    }
  }
  router.push({
    path: '/teamChat',
    query: {
      team: JSON.stringify(teamInfo)
    }
  })
}
// 获取队伍头像
const getAvatarUrl = (teamId) => {
  for (let team of teams.value) {
    if (team.id === teamId) {
      return team.avatarUrl
    }
  }
}
// 获取队伍名称
const getTeamName = (teamId) => {
  for (let team of teams.value) {
    if (team.id === teamId) {
      return team.name
    }
  }
}
// 获取队伍最后一条聊天记录
const getMessage = (fromUserId, message) => {
  for (let user of teamUsers.value) {
    if (fromUserId === user.id) {
      return user.username + ":" + message
    }
  }
}
</script>

<style scoped lang="less">

</style>