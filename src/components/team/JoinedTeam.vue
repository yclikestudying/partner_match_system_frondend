<template>
  <div>
    <van-nav-bar
        title="已加入队伍列表"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
  <template v-if="myJoinTeam === null">
    <van-empty>没有更多啦</van-empty>
  </template>
  <template v-if="myJoinTeam !== null" v-for="(team, index) in myJoinTeam" :key="index">
    <q-item clickable v-ripple>
      <q-item-section @click="detail(team)" avatar top>
        <q-avatar>
          <img :src="team.avatarUrl">
        </q-avatar>
      </q-item-section>
      <q-item-section @click="detail(team)">
        <q-item-label>{{ team.name }}</q-item-label>
        <q-item-label caption>{{ team.description }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
</template>

<script setup>
import {myJoin, quitTeam} from "@/utils/request/team.js";
import {onMounted, ref, watch} from "vue";
import {showConfirmDialog} from "vant";
import router from "@/router/router.js";

let myJoinTeam = ref(null)
const onClickLeft = () => history.back()

// 获取已加入队伍数据
onMounted(async () => {
  myJoinTeam.value = await myJoin()
})

// 侦听已加入队伍数据
watch(myJoinTeam,  async () => {
  myJoinTeam.value = await myJoin()
})

// 查看详情
const detail = (team) => {
  router.push({
    path: '/teamChat',
    query: {
      team: JSON.stringify(team)
    }
  })
}
</script>

<style scoped lang="less">
</style>