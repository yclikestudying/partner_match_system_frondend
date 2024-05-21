<template>
  <van-search
      placeholder="搜索"
      input-align="center"
      @click="onClick"
  />
  <van-notice-bar
      left-icon="volume-o"
      text="社会主义核心价值观：富强、民主、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善。"
  />
  <div id="items" class="content">
    <van-swipe class="index-photo" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="img in imgData" :key="img">
        <img :src="img" style="width: 100%;height:160px" alt=""/>
      </van-swipe-item>
    </van-swipe>

    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
        >
          <q-tab name="推荐用户" label="推荐用户"/>
          <q-tab name="热门博文" label="热门博文"/>
        </q-tabs>


        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="推荐用户">
            <div class="index-card">
              <template v-if="userList === null">
                <van-empty>去选择你感兴趣的标签吧</van-empty>
              </template>
              <template v-for="(userInfo, index) in userList" :key="index">
                <van-card
                    :desc="profileChange(userInfo)"
                    :title="usernameChange(userInfo)"
                    :thumb="userInfo.avatarUrl === null ? 'https://partner-files-1318575555.cos.ap-chengdu.myqcloud.com/%E5%B0%8F%E9%BB%91%E5%AD%90.jpg' : userInfo.avatarUrl"
                >
                  <template #tags>
                    <div class="tags">
                      <template v-for="(tag, index) in JSON.parse(userInfo.tags)" :key="index">
                        <van-tag :class="{tag: true, highlight: tagsHighLight(tag)}" plain type="primary">{{
                            tag
                          }}
                        </van-tag>
                      </template>
                    </div>
                  </template>
                  <template #bottom>
                    <van-tag class="role" color="#7232dd">
                      {{ userInfo.userRole === 1 ? '管理员' : '用户' }}
                    </van-tag>
                  </template>
                  <template #footer>
                    <van-button class="btn" size="mini" @click="showUser(userInfo.id)">联系我</van-button>
                  </template>
                </van-card>
              </template>
            </div>
          </q-tab-panel>

          <q-tab-panel name="热门博文">
            <div class="text-h6">热门博文</div>
            经典阅读
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/router.js";
import {imgData} from "@/utils/data/index.js";
import {recommend} from "@/utils/request/user.js";
import {nextTick, onBeforeMount, onMounted, onUpdated, ref, watch} from "vue";
import useIndexStore from "@/store/index/index.js";
// 保存tab的定位
const indexStore = useIndexStore()
const tab = ref(indexStore.tab)
watch(tab, () => {
  indexStore.rememberTab(tab.value)
})
// 保存滚轴的定位

let userList = ref([])
let tagsArray = []
const bar = ref(null)
// 拿到pinia中的当前登录用户的信息
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";

const registerAndLogin = useRegisterAndLoginStore()
//获取推荐用户
onMounted(async () => {
  tagsArray = JSON.parse(registerAndLogin.userInfo.tags)
  const id = JSON.parse(registerAndLogin.userInfo.id)
  userList.value = await recommend(tagsArray, id)
})
//进入搜索页面
const onClick = () => {
  router.push('/main/search')
}
//名字拼接
const usernameChange = (userInfo) => {
  return `昵称:${userInfo.username}`
}
//简介拼接
const profileChange = (userInfo) => {
  return `简介:${userInfo.profile}`
}
//标签高亮
const tagsHighLight = (tag) => {
  for (let i = 0; i < tagsArray.length; i++) {
    if (tag === tagsArray[i]) {
      return true
    }
  }
  return false
}
// 点击展示用户详细信息
const showUser = (id) => {
  router.push({
    path: '/main/showUserInfo',
    query: {
      id: id,
      status: 0
    }
  })
}
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-card {
  height: 120px;
}

.index-photo {
  margin-top: 2px;
}

.index-recommend {
  display: flex;
  justify-content: space-around;
  color: rgb(114, 50, 221);
  font-size: 11px;

  .recommend-item {
    border-bottom: 3px solid rgb(114, 50, 221);
  }
}

.index-card {
  .tags {
    margin-left: -5px;
  }

  .tag {
    margin-left: 5px;
    margin-top: 5px;
  }

  .role {
    margin-top: 5px;
  }

  .highlight {
    color: red;
  }

  .btn {
    position: relative;
    bottom: 20px;
  }
}

.content {
  width: 100vw;
  height: 78%;
  overflow: auto;
}
</style>
