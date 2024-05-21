<template>
  <div class="team-container">
    <div class="search-bar">
      <van-search
          show-action
          label="关键字"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          v-model="searchText"
      >
        <template #action>
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="search-btn">
      <van-button class="btn-item" type="primary" @click="addTeam">创建队伍</van-button>
      <van-button class="btn-item" type="primary" @click="joinedTeam">已加入队伍</van-button>
      <van-button class="btn-item" type="primary" @click="createdTeam">已创建队伍</van-button>
    </div>

    <div>
      <van-divider class="search-title">推荐队伍</van-divider>
    </div>

    <template v-if="teamInfo.length === 0">
      <van-empty>没有更多啦</van-empty>
    </template>
    <div class="list">
      <template v-if="teamInfo.length !== 0" v-for="(team, index) in teamInfo" :key="index">
        <q-item clickable v-ripple>
          <q-item-section @click="detail(team)" avatar top>
            <q-avatar size="50px">
              <img :src="team.avatarUrl">
            </q-avatar>
          </q-item-section>
          <q-item-section @click="detail(team)">
            <q-item-label>{{ team.name }}</q-item-label>
            <q-item-label caption>{{ team.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <van-button @click="joinTeam(team.id, team)" style="height: 25px">
              加入
            </van-button>
          </q-item-section>
        </q-item>
      </template>
    </div>
  </div>
</template>

<script setup>
import {showFailToast} from "vant";
import {onMounted, reactive, ref, watch} from "vue";
import router from "@/router/router.js";
import {joinTeamByUser, recommendTeam, selectTeam} from "@/utils/request/team.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLoginStore = useRegisterAndLoginStore()

const searchText = ref(null)
let teamInfo = ref([])
// 获取推荐队伍信息
onMounted(async () => {
  teamInfo.value = await recommendTeam()
})

// 加入队伍时存入的信息
const joinTeamInfo = reactive({
  teamId: '',
  userId: registerAndLoginStore.userInfo.id
})
// 搜索框
const value = ref('');
const onSearch = () => searchTeam()
const onClickButton = () => searchTeam()

const searchTeam = async () => {
  if (searchText.value === '') {
    showFailToast('搜索关键字不能为空')
    return
  }
  const res = await selectTeam(searchText.value)
  teamInfo.value = res.data.data
}

// 添加队伍页面
const addTeam = () => router.push('/main/addTeam')
// 已加入队伍页面
const joinedTeam = () => {
  router.push('/main/joinedTeam')
}
// 已创建队伍页面
const createdTeam = () => {
  router.push('/main/createdTeam')
}
// 查看队伍详情
const detail = (team) => {
  router.push({
    path: '/main/teamInfo',
    query: {
      team: JSON.stringify(team)
    }
  })
}
// 加入队伍
const joinTeam = async (teamId, team) => {
  joinTeamInfo.teamId = teamId
  const res = await joinTeamByUser(joinTeamInfo)
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
.search-btn {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;

  .btn-item {
    box-shadow: 2px 2px 5px 1px gray;
  }

  .btn-item:active {
    box-shadow: none;
    transform: translateY(2px);
  }
}

.search-title {
  margin-top: 20px;
  color: #7232dd;
  font-size: 17px;
  font-weight: 800;
}

.list {
  width: 100vw;
  height: 68vh;
  overflow: auto;
}
</style>