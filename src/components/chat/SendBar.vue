<script setup lang="ts">

</script>

<template>
  <div class="send-bar">
    <textarea name="" id="" cols="30" rows="10"></textarea>
    <input type="text" class="message-input" placeholder="请输入你的问题" v-model="userMessageContent"
      @keydown.enter="sendMessage(userMessageContent)">
    <input type="button" value="发送" class="send-button" @click="sendMessage(userMessageContent)">
  </div>
</template>

<style scoped></style>