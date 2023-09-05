<script setup lang="ts">
import { ref } from 'vue';

interface chatMessage {
  role: "user" | "assistant";
  content: string;
}
const messageList = ref<chatMessage[]>([
  {
    role: "assistant",
    content: "AI聊天助手的提示信息。"
  },
  {
    role: "user",
    content: "用户回复"
  },
  {
    role: "assistant",
    content: "AI回复"
  }
])
</script>

<template>
  <div class="chat-box">
    <div class="message-window">
      <div class="message-cell" v-for="message in messageList" :class="`message-cell-${message.role}`">
        <div :class="`${message.role}-avator`"></div>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="send-bar"></div>
  </div>
</template>

<style lang="less" scoped>
.chat-box {
  width: 400px;
  height: 600px;
  border: 3px solid black;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.message-window {
  flex-grow: 1;
  background-color: bisque;

  display: flex;
  flex-direction: column;

}

.avator {
  padding-right: 15px;
}

.user-avator {
  .avator();
  background-image: radial-gradient(circle at right, #0C7BB3, #F2BAE8);
}

.assistant-avator {
  .avator();
  background-image: radial-gradient(circle at left, #EEBD89, #DE3ABD);
}

.message-cell {
  border: 3px solid blue;

  display: flex;

  &-assistant {
    flex-direction: row;
  }

  &-user {
    flex-direction: row-reverse;
  }
}

.send-bar {
  width: 100%;
  height: 60px;
  background-color: azure;
}
</style>