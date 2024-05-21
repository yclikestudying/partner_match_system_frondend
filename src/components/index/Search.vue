<template>
  <div class="search">
    <van-nav-bar
        title="标签搜索"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="search-show-tags">
      <van-divider>已选标签</van-divider>
      <template v-for="(item, index) in activeIds">
        <van-tag :show="show" closeable size="large" type="primary" @close="close(index)">
          {{ item }}
        </van-tag>
      </template>
    </div>
    <div class="select">
      <van-tree-select
          v-model:active-id="activeIds"
          v-model:main-active-index="activeIndex"
          :items="items"
      />
    </div>

    <div class="search-btn">
      <van-button round type="primary" @click="onSubmit">开始搜索</van-button>
    </div>
    <div id="q-app" style="min-height: 100vh;">
      <div class="q-pa-md">
        <q-ajax-bar
            ref="bar"
            position="top"
            color="accent"
            size="7px"
            skip-hijack
        ></q-ajax-bar>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/router.js";
import {ref, watch} from 'vue'
//导入的标签数据
import {items} from '@/utils/data/tagsData.js'
import {selectByTags} from "@/utils/request/user.js";
import {showSuccessToast, showToast} from 'vant';
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLoginStore = useRegisterAndLoginStore()
//返回到主页面
const onClickLeft = () => {
  router.push('/main/index')
}

const activeIds = ref([]);
const activeIndex = ref();

watch(activeIds, (newValue) => {
  if (newValue.length > 10) {
    showToast('最多选择10个标签');
    activeIds.value.pop()

  }
})
//默认展示标签
const show = ref(true);
//去掉标签
const close = (index) => {
  activeIds.value.splice(index, 1)
};

//开始搜索
const onSubmit = async () => {
  const id = registerAndLoginStore.userInfo.id
  const res = await selectByTags(activeIds.value, id)
  const userList = JSON.stringify(res.data.data)
  await router.push({
    path: '/main/searchUserByTags',
    query: {
      userList: userList,
      tags: JSON.stringify(activeIds.value)
    }
  })
}
</script>

<style scoped lang="less">
.search-show-tags {
  height: 27%;
}

.van-tag {
  margin-top: 10px;
  margin-left: 10px;
}

.search-btn {
  display: flex;
  justify-content: center;
}

.van-button--primary {
  position: absolute;
  bottom: 60px;
  width: 90%;
}

.tag {
  margin-left: 10px;
}

.search {
  height: 100vh;
  overflow: hidden;
}
</style>