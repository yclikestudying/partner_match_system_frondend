<template>
  <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="content">
    <template v-if="userList.length !== 0">
      <div class="search-card">
        <template v-for="(userInfo, index) in userList">
          <van-card
              :desc="profileChang(userInfo)"
              :title="usernameChange(userInfo)"
              :thumb="userInfo.avatarUrl === null ? 'https://partner-files-1318575555.cos.ap-chengdu.myqcloud.com/%E5%B0%8F%E9%BB%91%E5%AD%90.jpg' : userInfo.avatarUrl"
          >
            <template #tags>
              <div class="tags">
                <template v-for="tag in JSON.parse(userInfo.tags)">
                  <van-tag
                      :class="{tag: true, highlight: tagsHighLight(tag)}"
                      plain
                      type="primary"
                  >
                    {{ tag }}
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
              <van-button class="btn" size="mini" @click="showUser(index)">联系我</van-button>
            </template>
          </van-card>
        </template>
      </div>
    </template>
    <template v-if="userList.length === 0">
      <van-empty>试试其他标签吧~</van-empty>
    </template>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {showUserInfo} from "@/utils/request/user.js";
import router from "@/router/router.js";
import {ref} from "vue";

const route = useRoute()
let userList = ref(JSON.parse(route.query.userList) === null ? [] : JSON.parse(route.query.userList))
const tagsArray = JSON.parse(route.query.tags)
//名字拼接
const usernameChange = (userInfo) => {
  return `昵称:${userInfo.username}`
}
//简介拼接
const profileChang = (userInfo) => {
  return `简介:${userInfo.profile}`
}
//返回搜索页面
const onClickLeft = () => history.back()
//将搜索的标签高亮显示
const tagsHighLight = (tag) => {
  for (let i = 0; i < tagsArray.length; i++) {
    if (tag === tagsArray[i]) {
      return true
    }
  }
  return false
}
// 点击展示用户详细信息
const showUser = async (index) => {
  const userInfo = await showUserInfo(userList.value[index].id)
  await router.push({
    path: '/main/showUserInfo',
    name: 'showUserInfo',
    query: {
      id: userInfo.id,
      status: 0
    }
  })
}
</script>

<style scoped lang="less">
.van-card {
  height: 115px;
}

.tags {
  margin-left: -5px;
}

.tag {
  margin-left: 5px;
  margin-top: 5px;
}

.highlight {
  color: red;
}

.btn {
  position: relative;
  bottom: 20px;
}

.search-card {
  padding-bottom: 50px;
}

.content {
  width: 100vw;
  height: 85%;
  overflow: auto;
}
</style>