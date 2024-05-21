<template>
  <template v-if="status === 1">
    <van-nav-bar
        title="用户资料"
        right-text="更多"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
  </template>
  <template v-if="status === 0">
    <van-nav-bar
        title="用户资料"
        left-arrow
        @click-left="onClickLeft"
    />
  </template>
  <div class="user">
    <q-item clickable v-ripple>
      <q-item-section side>
        <q-avatar rounded size="100px">
          <img :src="userInfo.avatarUrl === null ? 'https://partner-files-1318575555.cos.ap-chengdu.myqcloud.com/%E5%B0%8F%E9%BB%91%E5%AD%90.jpg' : userInfo.avatarUrl"/>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>昵称:{{ userInfo.username }}</q-item-label>
        <q-item-label caption>简介:{{
            userInfo.profile === null ? '这个人很懒，什么也没有留下' : userInfo.profile
          }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <van-cell title="账号" :value="userInfo.userAccount"/>
    <van-cell title="性别" :value="numberToGender(userInfo.gender)"/>
    <van-cell title="注册时间" :value="timestampToTime(userInfo.createTime)"/>
  </div>
  <template v-if="status === 0">
    <div class="button">
      <van-button type="primary" @click="add">加好友</van-button>
    </div>
  </template>
  <template v-if="status === 1">
    <div class="button">
      <div class="btn">
        <van-button type="primary" @click="checkSpace">动态</van-button>
        <van-button type="primary" @click="chat(userInfo.id, userInfo.username, userInfo.avatarUrl)">发消息</van-button>
      </div>
    </div>
  </template>
  <van-popup
      v-model:show="showBottom"
      position="bottom"
      round
      :style="{ height: '15%' }"
  >
    <div class="delete">
      <van-button @click="deleteUser" color="linear-gradient(to right, #ff6034, #ee0a24)">
        删除好友
      </van-button>
    </div>
  </van-popup>
</template>

<script setup>
//返回用户信息页面
import {ref, reactive, onMounted} from "vue";
import {numberToGender} from "@/utils/methods/gender.js";
import {timestampToTime} from "@/utils/methods/date.js";
import {useRoute} from "vue-router";
import {addFriend, deleteUserByUserId, showUserInfo, userLogout} from "@/utils/request/user.js";
import router from "@/router/router.js";
import {showConfirmDialog} from "vant";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";

const route = useRoute()
const id = Number(route.query.id)
const status = Number(route.query.status)
const showBottom = ref(false)
const onClickLeft = () => history.back()
const onClickRight = () => {
  showBottom.value = true
}
// 删除好友
const deleteUser = () => {
  showConfirmDialog({
    title: '确定删除该好友吗？',
  })
      .then(async () => {
        await deleteUserByUserId(id)
        await router.push('/main/friend')
      })
      .catch(() => {
        console.log('取消')
      })
  showBottom.value = false
}
// 存放添加好友的id和当前用户的id
const fromUserId = useRegisterAndLoginStore().userInfo.id
const toUserId = id
// 存放用户信息
let userInfo = ref({})
// 获取用户信息
onMounted(async () => {
  userInfo.value = await showUserInfo(id)
})

// 添加好友
const add = () => {
  addFriend(fromUserId, toUserId)
}

// 查看动态
const checkSpace = () => {
  console.log('查看动态')
}

// 发消息
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

  .btn-item {
    width: 40%;
    height: 40px;
  }

  padding-bottom: 10px;
}

.container-avatar {
  padding: 5px;
  text-align: center;
  background: linear-gradient(135deg, rgb(246, 211, 101) 0%, rgb(253, 160, 133) 100%);
  box-shadow: rgb(204, 204, 204) 0 4px 8px;
  border: 1px solid rgb(204, 204, 204);
  margin-bottom: 5px;
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

/*加为好友按钮*/
.button {
  position: absolute;
  bottom: 10%;
  text-align: center;
  width: 80%;
  left: 10%;

  .van-button {
    width: 100%;
  }
}

/*动态和发消息按钮*/
.btn {
  display: flex;
  justify-content: space-around;

  .van-button {
    width: 40%;
  }
}

.delete {
  width: 70%;
  margin-left: 15%;
  margin-top: 8%;

  .van-button {
    width: 100%;
  }
}
</style>