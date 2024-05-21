<template>
  <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="user">
    <div class="container-avatar">
      <div class="van-image van-image-round" style="width: 9rem; height: 9rem">
        <van-uploader :after-read="afterRead">
          <img class="van-image-img" :src="userInfo.avatarUrl">
        </van-uploader>
      </div>
    </div>

    <van-cell title="账号" :value="userInfo.userAccount"/>
    <template v-for="(item, index) in nameValue">
      <van-cell :title="nameKey[index]" is-link :value="item"
                @click="updateBasicInfo(nameKey[index], item, origin[index])"/>
    </template>
    <van-cell title="注册时间" :value="userInfo.createTime"/>

    <van-collapse v-model="activeNames">
      <van-collapse-item title="标签" name="1" @click="toEditTag">
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
  </div>
</template>

<script setup>
//返回用户信息页面
import {ref, reactive} from "vue";
import {numberToGender} from "@/utils/methods/gender.js";
import {timestampToTime} from "@/utils/methods/date.js";
import router from "@/router/router.js";
import {updateImg} from "@/utils/request/user.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
import {showFailToast} from "vant";

const registerAndLogin = useRegisterAndLoginStore()

let data = registerAndLogin.userInfo
const userInfo = reactive({
  id: data.id,
  userAccount: data.userAccount,
  avatarUrl: data.avatarUrl,
  username: data.username === null ? '暂无' : data.username,
  gender: numberToGender(data.gender) === undefined ? '暂无' : numberToGender(data.gender),
  phone: data.phone === null ? '暂无' : data.phone,
  email: data.email === null ? '暂无' : data.email,
  profile: data.profile === null ? '暂无' : data.profile,
  createTime: timestampToTime(data.createTime),
  userRole: data.userRole,
  tags: JSON.parse(data.tags)
})
//表示标签内容总是打开的
const activeNames = ref(['1'])

const nameKey = ref([
  '昵称', '性别', '电话',
  '邮箱', '个人简介'
])
const nameValue = ref([
  userInfo.username, userInfo.gender,
  userInfo.phone, userInfo.email, userInfo.profile
])
const origin = ref([
  'username', 'gender', 'phone',
  'email', 'profile'
])
//上传头像
const afterRead = async (file) => {
  console.log(file.file)
  let fileTypes = ['image/jpeg', 'image/png'] // 图片限制的格式类型
  if (!fileTypes.includes(file.file.type)) {
    showFailToast('当前图片仅支持格式为：' + fileTypes.join(' ，'))
    return false
  }
  if (file.file.type === 'image/jpeg' || file.file.type === 'image/png') {
    const result = verificationPicSize(file, 1000, 'K')
    console.log(result)
    if (!result) {
      showFailToast('jpg/png小于1000k')
      return false
    } else {
      registerAndLogin.userInfo.avatarUrl = await updateImg(file.file, userInfo.id)
      userInfo.avatarUrl = registerAndLogin.userInfo.avatarUrl
    }
  }
}
// 上传照片大小校验
const verificationPicSize = (file, limit, unit) => {
  if (!file || !limit || !unit) return false
  return file.file.size / 1024 <= limit;
}

//进入基本信息编辑页面
const updateBasicInfo = (nameKey, nameValue, origin) => {
  router.push({
    path: '/main/editBasicInfo',
    query: {
      key: nameKey,
      value: nameValue,
      originalName: origin
    }
  })
}
//编辑标签页面
const toEditTag = () => {
  router.push({
    path: '/main/editTags',
    query: {
      tags: data.tags
    }
  })
}
const onClickLeft = () => history.back()
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
</style>