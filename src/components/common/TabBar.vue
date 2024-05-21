<template>
  <div class="tab-bar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>
      <van-tabbar-item icon="flag-o" name="team">队伍</van-tabbar-item>
      <van-tabbar-item icon="chat-o" name="message" badge="">消息</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="friend" badge="">好友</van-tabbar-item>
      <van-tabbar-item icon="user-o" name="user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import router from '@/router/router.js'
import useIndexStore from "@/store/index/index.js";
const indexStore = useIndexStore()
const active = ref(indexStore.tabBar)

watch(active, () => {
  router.push(`/main/${active.value}`)
})

// 记录高亮tabBar
watch(active, () => {
  indexStore.rememberTabBar(active.value)
})

</script>

<style scoped lang="less">

</style>