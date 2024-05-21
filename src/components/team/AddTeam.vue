<template>
  <div>
    <van-nav-bar
        title="添加队伍"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
  <div>
    <div class="upload-avatarUrl">
      <div>队伍头像</div>
      <van-uploader class="avatarUrl" v-model="fileList" multiple :max-count="1"/>
    </div>
    <van-cell-group inset>
      <van-field v-model="teamInfo.name" label="队伍名" placeholder="请输入队伍名"/>
    </van-cell-group>
    <van-cell-group inset>
      <van-field
          rows="2"
          autosize
          label="队伍描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入队伍描述"
          show-word-limit
          v-model="teamInfo.description"
      />
    </van-cell-group>
    <van-cell-group inset>
      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="teamInfo.maxNum" min="3" max="10"/>
        </template>
      </van-field>
    </van-cell-group>
  </div>
    <div class="btn">
      <van-button round type="primary" @click="onsubmit">提交</van-button>
    </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {addTeam} from "@/utils/request/team.js";
import {showFailToast} from "vant";
import router from "@/router/router.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLoginStore = useRegisterAndLoginStore()

const onClickLeft = () => history.back()
//队伍状态
const checked = ref('1');

// const showPicker = ref(false);
// const onConfirm = ({selectedValues}) => {
//   teamInfo.expireTime = selectedValues.join('-');
//   showPicker.value = false;
// };
// const currentDate = ref(['2024', '01', '01']);
// const minDate = new Date(2024, 3, 20)
// const maxDate = new Date(2025, 5, 1)
// 创建队伍信息
const teamInfo = reactive({
  name: '',
  description: '',
  maxNum: '',
  // expireTime: '',
  userId: registerAndLoginStore.userInfo.id,
  // status: checked.value,
  // password: '',
})
// 队伍头像
const fileList = ref([]);
// 提交创建队伍信息
const onsubmit = async () => {
  if (teamInfo.name === '' || teamInfo.description === '') {
    showFailToast('信息不能为空')
    return
  }
  // if (checked.value === '2' && teamInfo.password === '') {
  //   showFailToast('密码不能为空')
  //   return
  // }
  teamInfo.status = checked.value
  let formData = new FormData()
  formData.append('avatarUrl', fileList.value[0].file)
  formData.append('teamInfo', JSON.stringify(teamInfo))
  const res = await addTeam(formData)
  if (res !== 40000) {
    await router.push('/main/createdTeam')
  }
}

</script>

<style scoped lang="less">
.btn {
  text-align: center;

  .van-button {
    width: 80%;
    margin-top: 20px;
  }
}

.password-enter-from,
.password-leave-to {
  opacity: 0;
}

.password-enter-active {
  transition: opacity .5s ease;
}

.password-leave-active {
  transition: opacity .3s ease;
}

/*队伍头像*/
.upload-avatarUrl {
  margin-left: 32px;

  .avatarUrl {
    margin-left: 100px;
  }
}
</style>