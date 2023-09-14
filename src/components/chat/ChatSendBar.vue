<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  content: String
})

const emit = defineEmits(['update:content'])

const centent = computed({
  get() {
    return props.content;
  },
  set(value) {
    emit('update:content', value)
  }
})
</script>

<template>
  <div class="send-bar">
    <input type="text" class="message-input" placeholder="请输入你的问题" v-model="content"
      @keydown.enter="sendMessage(userMessageContent)">
    <input type="button" value="发送" class="send-button" @click="sendMessage(userMessageContent)">
  </div>
</template>

<style scoped lang="less">
.send-bar {
  width: 100%;
  height: 50px;
  display: flex;
}

.message-input {
  flex: 4;
  margin-right: 10px;
  border: none;
  padding: 10px;
  background-color: rgba(148, 163, 184, .15);
}

.message-input:focus {
  outline: none;
  background-color: rgba(148, 163, 184, .25);
}

.send-button {
  flex: 1;
  border: none;
  background-color: rgba(148, 163, 184, .15);
  font-size: 16px;

  &:active {
    background-color: rgba(148, 163, 184, .25);
  }
}
</style>