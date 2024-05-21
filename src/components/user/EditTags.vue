<template>
  <edit-basic-info-header/>
  <div class="title">
    <span class="main-title">添加标签</span><br>
    <span class="sub-title">添加符合你的{{ 10 - newTagsArray.length }}个标签</span>
  </div>
  <div class="tags">
    <template v-for="(tag, index) in tagsArray">
      <van-button
          :class="{'tags-item': true, active: tagIsInArray(tag)}"
          :style="{color:tagsColorArray[index]}"
          @click="selectTag(tag)"
      >
        {{ tag }}
      </van-button>
    </template>
  </div>
  <van-button
      type="primary"
      class="btn"
      @click="onSubmit"
  >
    提交
  </van-button>
</template>

<script setup>
import {useRoute} from "vue-router";

console.log()
import EditBasicInfoHeader from "@/components/common/EditBasicInfoHeader.vue";
import {tags} from "@/utils/data/tagsData.js";
import {ref} from "vue";
import {tagsColor} from "@/utils/data/tagsData.js";
import {updateTags} from "@/utils/request/user.js";

const route = useRoute()
//标签数组
const tagsArray = ref(tags)
//标签颜色数组
const tagsColorArray = ref(tagsColor)
//存放被选中的标签
let newTagsArray = ref(JSON.parse(route.query.tags) === null ? [] : JSON.parse(route.query.tags))
//判断是否被选中
//若没有选中，则添加
//若已经选中，则删除
const selectTag = (tag) => {
  for (let i = 0; i < newTagsArray.value.length; i++) {
    if (newTagsArray.value[i] === tag) {
      newTagsArray.value.splice(i, 1)
      return
    }
  }
  if (newTagsArray.value.length >= 10) {
    return
  }
  newTagsArray.value.push(tag)
}
//判断当前标签是否在选中数组里面
//若在，则添加背景颜色
//若不在，则不添加背景颜色
const tagIsInArray = (tag) => {
  for (let i = 0; i < newTagsArray.value.length; i++) {
    if (newTagsArray.value[i] === tag) {
      return true;
    }
  }
  return false
}
//提交标签
const onSubmit = async () => {
  const tagsList = JSON.stringify(newTagsArray.value)
  await updateTags(tagsList)
  await history.back()
}
</script>

<style scoped lang="less">
.title {
  margin-left: 10px;

  .main-title {
    font-size: 30px;
  }

  .sub-title {
    font-size: 12px;
  }
}

.tags-item {
  margin-left: 10px;
  margin-top: 10px;
  height: 30px;
}

.active {
  background-color: #bde5f6;
}

.btn {
  width: 80%;
  position: absolute;
  bottom: 10%;
  left: 10%;
}
</style>