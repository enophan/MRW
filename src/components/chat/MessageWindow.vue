<script setup lang="ts">
import MessageCell from './MessageCell.vue';
</script>

<template>
  <div class="message-window" ref="messageWindow">
    <MessageCell></MessageCell>
  </div>
</template>

<style scoped lang="less">
.message-window {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  overflow-y: auto;
}
</style>