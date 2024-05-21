<template>
  <edit-basic-info-header/>
  <van-cell-group inset>
    <van-field :label="editInfo.editKey" v-model="editInfo.editValue"/>
  </van-cell-group>
  <van-button
      type="primary"
      size="medium"
      style="width: 80%;
      height: 6%;
      margin-left: 10%"
      @click="onSubmit(editInfo)"
  >
    修改
  </van-button>
</template>

<script setup>
import EditBasicInfoHeader from "@/components/common/EditBasicInfoHeader.vue";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import {updateBasicInfo} from "@/utils/request/user.js";
import {showFailToast} from "vant";
// 获取从个人信息页传递过来的参数
const route = useRoute()
const editInfo = reactive({
  editKey: route.query.key,
  editValue: route.query.value,
  originalName: route.query.originalName
})
// 提交修改信息
const onSubmit = (editInfo) => {
  let originalName = editInfo.originalName
  let editValue = editInfo.editValue

  // 判断昵称
  if (originalName === 'username') {
    if (editValue.length > 11) {
      showFailToast('当前昵称字数为 ' + editValue.length + ' 位，不应超过 11 位')
      return
    }
  }

  // 判断性别
  if (originalName === 'gender') {
    if (editValue !== '男' && editValue !== '女') {
      showFailToast('性别格式不正确')
      return
    }
  }

  // 判断电话
  if (originalName === 'phone') {
    if (editValue === '' || (editValue.length !== 11)) {
      showFailToast('电话格式不正确')
      return
    }
  }

  // 判断邮箱
  if (originalName === 'email') {
    if (editValue === '') {
      showFailToast('邮箱格式不正确')
      return
    }
  }

  // 判断简介
  if (originalName === 'profile') {
    if (editValue.length > 15) {
      showFailToast('当前字数为 ' + editValue.length + ' 位，字数不应超过 15 位')
      return
    }
  }

  updateBasicInfo(editInfo.originalName, editInfo.editValue)
}
</script>

<style scoped lang="less">

</style>