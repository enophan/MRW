<script setup lang="ts">
import { ref } from 'vue';

interface chatMessage {
  role: "user" | "assistant";
  content: string;
}

const messageList = ref<chatMessage[]>([
  {
    role: "assistant",
    content: "AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息AI聊天助手的提示信息。"
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
        <div class="avator">
          <div :class="`avator-${message.role}`"></div>
        </div>
        <div class="message-content">
          <span>
            {{ message.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="send-bar">
      <input type="text" class="message-input" placeholder="输入……">
      <input type="button" value="发送" class="send-button">
    </div>
  </div>
</template>

<style scoped lang="less">
@message-content-boxInner: 10px;

.chat-box {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.message-window {
  flex-grow: 1;
  background-color: rgb(247, 248, 249);

  display: flex;
  flex-direction: column;

  padding: 0 15px;
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
  padding: @message-content-boxInner;
  background-color: rgb(0, 136, 255);
  border-radius: 5px;
}

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