<template>
  <van-nav-bar
      :title="team.name+'('+ ids.length + '/' + team.maxNum +')'"
      right-text="更多"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />

  <div id="chatPosition">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <template v-if="messages !== null" v-for="(message, index) in messages" :key="index">
          <template v-if="message.fromUserId === currentUserId">
            <q-chat-message
                :name="getUsername(currentUserId)"
                :avatar="getAvatarUrl(currentUserId)"
                :text="[message.message]"
                sent
                :stamp="getHourAndMinutes(message.createTime)"
            />
          </template>
          <template v-if="message.fromUserId !== currentUserId">
            <q-chat-message
                :name="getUsername(message.fromUserId)"
                :avatar="getAvatarUrl(message.fromUserId)"
                :text="[message.message]"
                :stamp="getHourAndMinutes(message.createTime)"
            />
          </template>
        </template>
      </div>
    </div>
  </div>

  <div class="input">
    <q-input class="q-input" outlined bottom-slots v-model="text" :dense="true">
      <template v-slot:after>
        <q-btn icon="send" @click="sendMessage"/>
      </template>
    </q-input>
  </div>
  <van-popup
      v-model:show="showBottom"
      position="bottom"
      round
      :style="{ height: '15%' }"
  >
    <div class="button">
      <template v-if="team.userId === currentUserId">
        <van-button @click="logout('解散')" color="linear-gradient(to right, #ff6034, #ee0a24)">
          解散队伍
        </van-button>
      </template>
      <template v-if="team.userId !== currentUserId">
        <van-button @click="logout('退出')" color="linear-gradient(to right, #ff6034, #ee0a24)">
          退出队伍
        </van-button>
      </template>
    </div>
  </van-popup>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {disbandTeam, getTeamMessage, quitTeam, sendMessageToTeam} from "@/utils/request/team.js";
import {getHourAndMinutes} from "@/utils/methods/date.js";
import {showConfirmDialog, showFailToast} from "vant";
import router from "@/router/router.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLoginStore = useRegisterAndLoginStore()

const route = useRoute()
// 获取路由传递的参数
const team = JSON.parse(route.query.team)
let ids = team.ids
ids.push(team.userId)
const currentUserId = registerAndLoginStore.userInfo.id
// 输入框内容
const text = ref(null)
// 获取队伍聊天记录
let messages = ref(null)
let users = ref(null)
onMounted(async () => {
  const res = await getTeamMessage(team.id, ids)
  if (res !== null) {
    messages.value = res.messages
    users.value = res.users
  }
})
setInterval(async () => {
  const res = await getTeamMessage(team.id, ids)
  if (res !== null && messages.value.length !== res.messages.length) {
    messages.value = res.messages
    users.value = res.users
  }
}, 500)
// 侦听
watch(messages, () => {
  nextTick(() => {
    let chatBox = document.getElementById('chatPosition');
    chatBox.scrollTop = chatBox.scrollHeight
  })
})
// 发送消息
const sendMessage = () => {
  sendMessageToTeam(currentUserId, team.id, text.value)
  text.value = null
}
const onClickLeft = () => {
  history.back()
}
// 获取当前名称
const getUsername = (id) => {
    for (let user of users.value) {
        if (user.id === id) {
          return user.username
        }
    }
}
// 获取当前头像
const getAvatarUrl = (id) => {
  for (let user of users.value) {
    if (user.id === id) {
      return user.avatarUrl
    }
  }
}
// 右侧按钮
const showBottom = ref(false)
const onClickRight = () => {
  showBottom.value = true
}
// 退出或解散队伍
const logout = (str) => {
  let message = null
  if (str === '退出') {
    message = '确定退出队伍吗？'
  } else {
    message = '确定解散队伍吗？'
  }
  showConfirmDialog({
    title: message,
  })
      .then(async () => {
          if (str === '退出') {
            const res = await quitTeam(team.id, currentUserId)
            if (res.data.code === 1) {
              await router.push('/main/team')
            } else {
              showFailToast(res.data.message)
            }
          } else {
            const res = await disbandTeam(team.id, currentUserId)
            if (res.data.code === 1) {
              await router.push('/main/team')
            } else {
              showFailToast(res.data.message)
            }
          }
      }).catch(() => {

  })
  showBottom.value = false
}
</script>

<style scoped lang="less">
.input {
  width: 97%;
  position: fixed;
  bottom: -18px;

  .q-input {
    margin-left: 10px;
  }
}

#chatPosition {
  width: 100vw;
  height: 85vh;
  overflow-y: auto;
}

.button {
  width: 70%;
  margin-left: 15%;
  margin-top: 8%;
  .van-button {
    width: 100%;
  }
}
</style>