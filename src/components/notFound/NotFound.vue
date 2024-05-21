<template>
  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
    <van-empty image="error" description="页面出错啦"></van-empty>
</template>

<script setup>
const onClickLeft = () => history.back()
</script>

<style scoped lang="less">

</style>