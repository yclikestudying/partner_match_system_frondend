<template>
  <van-nav-bar
      :title="leftUsername"
      left-arrow
      @click-left="onClickLeft"
  />

  <div id="chatPosition">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <template v-for="msg in messages">
          <template v-if="msg.fromUserId !== rightUserId">
            <q-chat-message
                :avatar="leftAvatarUrl"
                :text="[msg.message]"
                :stamp="getHourAndMinutes(msg.createTime)"
            />
          </template>
          <template v-if="msg.fromUserId === rightUserId">
            <q-chat-message
                :avatar="rightAvatarUrl"
                :text="[msg.message]"
                sent
                :stamp="getHourAndMinutes(msg.createTime)"
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
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getUserMessage, sendMessageToUser} from "@/utils/request/user.js"
import {getHourAndMinutes} from "@/utils/methods/date.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";

const registerAndLoginStore = useRegisterAndLoginStore()
const route = useRoute()
const leftUserId = route.query.id
const leftUsername = route.query.username
const leftAvatarUrl = route.query.avatarUrl
const rightUserId = registerAndLoginStore.userInfo.id
const rightAvatarUrl = registerAndLoginStore.userInfo.avatarUrl
const text = ref(null)
const onClickLeft = () => {
  history.back()
}


// 消息集合
const messages = ref(null)
// 给好友发送消息
const sendMessage = async () => {
  await sendMessageToUser(leftUserId, text.value)
  text.value = null
}
// 获取与好友的聊天记录
onMounted(async () => {
  const list = await getUserMessage(leftUserId)
  if (messages.value === null) {
    messages.value = list
    return
  }
  if (messages.value.length !== list.length) {
    messages.value = list
  }
})
setInterval(async () => {
  const list = await getUserMessage(leftUserId)
  if (messages.value === null) {
    messages.value = list
    return
  }
  if (messages.value.length !== list.length) {
    messages.value = list
  }
}, 500)
// 聊天记录定位在最下面
watch(messages, () => {
  nextTick(() => {
    let chatBox = document.getElementById('chatPosition');
    chatBox.scrollTop = chatBox.scrollHeight
  })
})
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
</style>