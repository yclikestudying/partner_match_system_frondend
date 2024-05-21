<template>
  <div class="user">
    <q-item clickable v-ripple>
      <q-item-section side>
        <q-avatar rounded size="100px">
          <img :src="userInfo.avatarUrl"/>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>昵称:{{ userInfo.username === null ? '暂无' : userInfo.username }}</q-item-label>
        <q-item-label caption>简介:{{ userInfo.profile === null ? '暂无' : userInfo.profile }}</q-item-label>
      </q-item-section>
      <q-item-section side @click="showInfo">
        详细资料
      </q-item-section>
    </q-item>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="我的标签" name="1">
        <template v-for="tag in userInfo.tags">
          <van-tag
              class="tag"
              type="primary"
              style="height: 20px"
          >
            {{ tag }}
          </van-tag>
        </template>
      </van-collapse-item>
    </van-collapse>

    <div class="user-function">
      <div class="function-item">
        <div  @click="toPage('创建队伍')">
          <div>
            <img class="item-img" src="/icon/创建队伍.png" alt="">
          </div>
          <div class="item-content">
            <span>创建队伍</span>
          </div>
        </div>

      </div>
      <div class="function-item">
        <div @click="toPage('加入队伍')">
          <div>
            <img class="item-img" src="/icon/加入队伍.png" alt="">
          </div>
          <div class="item-content">
            <span>加入队伍</span>
          </div>
        </div>
      </div>
      <div class="function-item">
        <div @click="toPage('热门博文')">
          <div>
            <img class="item-img" src="/icon/查询.png" alt="">
          </div>
          <div class="item-content">
            <span>热门博文</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="logoutBtn">
    <van-button @click="logout" color="linear-gradient(to right, #ff6034, #ee0a24)">
      退出登录
    </van-button>
  </div>
</template>

<script setup>
//返回用户信息页面
import {ref, reactive} from "vue";
import {numberToGender} from "@/utils/methods/gender.js";
import {timestampToTime} from "@/utils/methods/date.js";
import router from "@/router/router.js";
import {showConfirmDialog} from 'vant';
import {userLogout} from "@/utils/request/user.js";
import useAllStore from "@/store/manage/index.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const allStore = useAllStore()

const registerAndLoginStore = useRegisterAndLoginStore()

let data = registerAndLoginStore.userInfo
const userInfo = reactive({
  id: data.id,
  userAccount: data.userAccount,
  avatarUrl: data.avatarUrl,
  username: data.username,
  gender: numberToGender(data.gender),
  phone: data.phone,
  email: data.email,
  profile: data.profile,
  createTime: timestampToTime(data.createTime),
  userRole: data.userRole,
  tags: JSON.parse(data.tags)
})
//表示标签内容总是打开的
const activeNames = ref(['1'])
//展示基本信息
const showInfo = () => {
  router.push('/main/info')
}
// 退出登录
const logout = () => {
  showConfirmDialog({
    title: '确定退出吗',
  })
      .then(() => {
        userLogout()
        allStore.clear()
        router.push('/login')
      })
      .catch(() => {
        console.log('取消')
      })
}
// 页面跳转
const toPage = (str) => {
  if (str === '创建队伍') {
    router.push('/main/createdTeam')
  }
  if (str === '加入队伍') {
    router.push('/main/joinedTeam')
  }
}
</script>

<style scoped lang="less">
.img {
  border-radius: 50%;
}

.tag {
  margin-left: 5px;
}

.logoutBtn {
  text-align: center;
  margin-top: 25%;

  .van-button {
    width: 40%;
    height: 40px;
  }
}

.container-avatar {
  padding: 5px;
  background: linear-gradient(135deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%);
  box-shadow: rgb(204, 204, 204) 0 4px 8px;
  border: 1px solid rgb(204, 204, 204);
  display: flex;
  margin-bottom: 10px;

  .avatar-item {
    margin-left: 5%;
    padding-top: 5%;

    .item {
      margin-top: 10px;

      .item-content {
        width: 12rem;
        height: 5.6rem;
        overflow: hidden;
      }
    }
  }
}

.van-image {
  position: relative;
  display: inline-block;
  box-shadow: rgb(0, 0, 0) 0 4px 12px;
}

.van-image-round {
  overflow: hidden;
  border-radius: var(--van-radius-max);
}

.van-image-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.user-function {
  height: 250px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;

  .function-item {
    text-align: center;

    .item-img {
      width: 25px;
    }
  }
}
</style>