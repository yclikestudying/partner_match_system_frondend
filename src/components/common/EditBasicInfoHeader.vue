<template>
  <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="onClickLeft"
  />
</template>

<script setup>
const onClickLeft = () => history.back()
</script>

<style scoped lang="less">

</style>