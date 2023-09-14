<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import { ChatMessage } from './types';
import type { PropType } from 'vue'
const props = defineProps({
  messageList: Object as PropType<ChatMessage[]>,
})

let messageWindow = ref<HTMLElement>();

function scrollToBottom() {
  if (messageWindow.value) {
    messageWindow.value.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      left: 0,
      behavior: "smooth"
    });
  }
};

onUpdated(
  () => {
    scrollToBottom();
  }
)

</script>

<template>
  <div class="message-window" ref="messageWindow">
    <div class="message-cell" v-for="message in props.messageList" :class="`message-cell-${message.role}`">
      <div class="avator">
        <div :class="`avator-${message.role}`"></div>
      </div>
      <div class="message-content" :class="`message-content-${message.role}`" v-if="message.content"
        v-html="message.content">
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.message-window {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  overflow-y: auto;
  height: 500px;
}

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