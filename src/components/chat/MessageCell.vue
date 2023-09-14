<script setup lang="ts">
import { ChatMessage } from './types';
import type { PropType } from 'vue';
defineProps({
  message: Object as PropType<ChatMessage>,
})
</script>

<template>
  <div class="message-cell" v-if="message" :class="`message-cell-${message.role}`">
    <div class="avator">
      <div :class="`avator-${message.role}`"></div>
    </div>
    <div class="message-content" :class="`message-content-${message.role}`" v-if="message.content"
      v-html="message.content">
    </div>
  </div>
</template>

<style scoped lang="less">
.message-cell {
  margin: 10px 0px;
  display: flex;

  &-assistant {
    flex-direction: row;
  }

  &-user {
    flex-direction: row-reverse;
  }
}

.avator {
  display: flex;
  align-items: center;
  width: 45px;
  height: 45px;

  &-user {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 10px;
    background-image: radial-gradient(circle at right, #0C7BB3, #F2BAE8);
  }

  &-assistant {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    background-image: radial-gradient(circle at left, #EEBD89, #DE3ABD);
  }
}

.message-content {
  padding: 10px;
  border-radius: 12px;

  &-user {
    background-color: rgb(250, 228, 203);
  }

  &-assistant {
    background-color: rgb(242, 242, 242);
  }
}
</style>