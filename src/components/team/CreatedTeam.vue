<template>
  <div>
    <van-nav-bar
        title="已创建队伍列表"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
  <template v-if="myCreateTeam.length === 0">
    <van-empty>没有更多啦</van-empty>
  </template>
  <template v-if="myCreateTeam.length !== 0" v-for="(team, index) in myCreateTeam" :key="index">
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
import {myCreate} from "@/utils/request/team.js";
import {onMounted, ref, watch} from "vue";
import router from "@/router/router.js";

let myCreateTeam = ref([])
const onClickLeft = () => history.back()
// 获取创建的队伍的数据
onMounted(async () => {
  myCreateTeam.value = await myCreate()
})

// 侦听创建的队伍的数据
watch(myCreateTeam, async () => {
  myCreateTeam.value = await myCreate()
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