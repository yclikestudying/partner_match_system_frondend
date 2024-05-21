<template>
  <van-nav-bar
      title="好友列表"
  >
  </van-nav-bar>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 350px">
      <q-tabs
          v-model="tab"
          indicator-color="primary"
          narrow-indicator
      >
        <q-tab name="好友" label="好友"/>
        <q-tab name="新朋友" label="新朋友"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="好友">
          <template v-if="friendList !== null" v-for="friend in friendList">
            <q-item @click="showUserInfo(friend.id)" clickable v-ripple>
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img :src="friend.avatarUrl"/>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ friend.username }}</q-item-label>
                <q-item-label caption :class="{online: isOnline(friend.id) === '在线'}">{{ isOnline(friend.id) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-if="friendList === null">
            <van-empty>去添加你的新朋友吧</van-empty>
          </template>
        </q-tab-panel>

        <q-tab-panel name="新朋友">
          <template v-if="friendApplications !== null" v-for="friend in friendApplications">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img :src="friend.avatarUrl"/>
                  <q-badge floating color="teal">new</q-badge>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ friend.username }}</q-item-label>
                <q-item-label caption>请求添加你为好友</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div style="display: flex">
                  <van-button style="height: 30px" @click="reply(1, friend.id)">同意</van-button>
                  <van-button style="height: 30px" @click="reply(0, friend.id)">拒绝</van-button>
                </div>
              </q-item-section>
            </q-item>
          </template>
          <template v-if="friendApplications === null">
            <van-empty>没有好友请求</van-empty>
          </template>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUpdated, ref, watch} from "vue";
import {getFriendApplication, getFriendList, replyApplication} from "@/utils/request/user.js";
import router from "@/router/router.js";
import {useRoute} from "vue-router";

const tab = ref('好友')
let friendApplications = ref(null)
let friendList = ref(null)
let ids = ref(null)
// 获取好友申请
setInterval(async () => {
  friendApplications.value = await getFriendApplication()
}, 500)
// 获取好友列表
onMounted(async () => {
  const res = await getFriendList()
  if (res !== null) {
    friendList.value = res.userList
    ids.value = res.ids
  }
})
setInterval(async () => {
  const res = await getFriendList()
  if (res !== null) {
    friendList.value = res.userList
    ids.value = res.ids
  } else {
    friendList.value = null
  }
}, 500)

// 回复好友请求
const reply = (num, fromUserId) => {
  replyApplication(num, fromUserId)
}
// 判断用户是否在线
const isOnline = (id) => {
  if (ids.value !== null) {
    for (let i = 0; i < ids.value.length; i++) {
      if (id === ids.value[i]) {
        return '在线'
      }
    }
  }
  return '离线'
}

// 跳转到用户主页
const showUserInfo = (id) => {
  router.push({
    path: '/main/showUserInfo',
    query: {
      id: id,
      status: 1
    }
  })
}
</script>

<style scoped lang="less">
.online {
  color: #00b400;
}
</style>