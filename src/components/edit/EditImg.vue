<template>
  <edit-basic-info-header/>
  <div class="avatar-item">
    <van-image
        round
        width="9rem"
        height="10rem"
        :src="avatarUrl"
    />
  </div>
  <div class="avatar-item">
    <van-uploader :after-read="afterRead">
      <van-button>上传头像</van-button>
    </van-uploader>
  </div>

</template>

<script setup>
import EditBasicInfoHeader from "@/components/common/EditBasicInfoHeader.vue";
// import {updateImg} from "@/utils/request/user.js";
import {ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute()

const avatarUrl = ref(route.query.avatarUrl)
const id = ref(route.query.id)
//上传头像
const afterRead = async (file) => {
  // avatarUrl.value = await https://partner-files-1318575555.cos.ap-chengdu.myqcloud.com/%E5%B0%8F%E9%BB%91%E5%AD%90.jpg(file.file, id.value)
};


</script>

<style scoped lang="less">
.avatar-item {
  text-align: center;
}

.van-tabs {
  margin-top: 20px;
  text-align: center;

  .content {
    margin-top: 20px;

    .tag {
      margin-left: 10px;
    }
  }
}
</style>