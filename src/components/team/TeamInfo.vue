<template>
  <van-nav-bar
      title="队伍详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="content">
    <div class="header">
      <div class="q-pa-md q-gutter-sm">
        <q-item clickable v-ripple>
          <q-item-section avatar top>
            <q-avatar size="90px">
              <img :src="avatarUrl">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label style="font-size: 20px">{{ name }}</q-item-label>
            <q-item-label caption>{{ ids.length }}/{{ maxNum }}人</q-item-label>
          </q-item-section>
        </q-item>
        <q-avatar
            v-for="(team, index) in teamUsersInfo"
            :key="index + 1"
            size="40px"
            class="overlapping"
            :style="`left: ${(index + 1) * 25}px`"
        >
          <img :src="team.avatarUrl === null ? 'https://partner-files-1318575555.cos.ap-chengdu.myqcloud.com/%E5%B0%8F%E9%BB%91%E5%AD%90.jpg' : team.avatarUrl">
        </q-avatar>
      </div>
    </div>
    <div class="foot">
      <div class="button">
        <van-button type="primary" @click="joinTeam">申请加入</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getTeamUserInfo, joinTeamByUser} from "@/utils/request/team.js";
import router from "@/router/router.js";
import {showFailToast} from "vant";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLoginStore = useRegisterAndLoginStore()
// 获取队伍主页面传递过来的数据
const route = useRoute()
const team = JSON.parse(route.query.team)
let ids = team.ids
ids.push(team.userId)
const name = team.name
const avatarUrl = team.avatarUrl
const maxNum = team.maxNum
const teamId = team.id
const userId = registerAndLoginStore.userInfo.id
// 队伍成员信息
const teamUsersInfo = ref([])
// 返回事件
const onClickLeft = () => {
  history.back()
}
// 加载页面数据
onMounted(async () => {
  teamUsersInfo.value = await getTeamUserInfo(ids)
})
// 申请加入队伍
const joinTeam = async () => {
  const res = await joinTeamByUser({teamId, userId})
  if (res.data.code === 1) {
    await router.push({
      path: '/teamChat',
      query: {
        team: JSON.stringify(team)
      }
    })
  } else {
    showFailToast(res.data.description)
  }
}
</script>

<style scoped lang="less">
.content {
  width: 100vw;
  height: 83%;
  background-color: #f3f3f3;

  .header {
    width: 100vw;
    height: 35%;
    background-color: white;
  }

  .foot {
    position: fixed;
    bottom: 9%;
    width: 100vw;
    height: 12%;
    background-color: white;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5%;

      .van-button {
        width: 90%;
      }
    }
  }
}

.overlapping {
  border: 2px solid white;
  position: absolute
}
</style>