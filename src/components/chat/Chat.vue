<script setup lang="ts">
import { nextTick, ref } from 'vue';
import CryptoJs from 'crypto-js'
import * as base64 from 'base-64'
import {
  ChatMessage,
  SparkAPICredentials,
  UserData
} from './types.ts'


let userMessageContent = ref("");
let messageWindow = ref<HTMLElement>();
const aipCredentials: SparkAPICredentials = {
  APPID: '6833b54e',
  APISecret: 'MzgzYmFkNDRhYWQxM2UzNjAwYzM4ZTMy',
  APIKey: '08ac3ff24d928dcbe748b5528afbbe4e',
};

const userData: UserData = {
  id: "user"
};

const messageList = ref<ChatMessage[]>([
  {
    role: "assistant",
    content: "AI聊天助手的提示信息"
  },
  {
    role: "user",
    content: "用户回复"
  },
  {
    role: "assistant",
    content: "AI回复"
  }
]);

function sendMessage(messageContent: string | undefined) {
  let message: ChatMessage = {
    role: "user",
    content: messageContent
  }
  messageList.value.push(message);
  userMessageContent.value = ""
  scrollToBottom();
  getSparkReply(messageContent);
};

function getWebsocketUrl(sparkRequest: SparkAPICredentials) {
  return new Promise<string>((resovle,) => {
    let url = "wss://spark-api.xf-yun.com/v1.1/chat";
    let host = "spark-api.xf-yun.com";
    let apiKeyName = "api_key";
    let date = new Date().toUTCString();
    let algorithm = "hmac-sha256"
    let headers = "host date request-line";
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, sparkRequest.APISecret);
    let signature = CryptoJs.enc.Base64.stringify(signatureSha);
    let authorizationOrigin = `${apiKeyName}="${sparkRequest.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    let authorization = base64.encode(authorizationOrigin);
    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;
    resovle(url)
  })

};

function getSparkRequestParam(
  sparkAPI: SparkAPICredentials,
  messageContent: string | undefined,
  user: UserData
) {
  let param = {
    "header": {
      "app_id": sparkAPI.APPID,
      "uid": user.id
    },
    "parameter": {
      "chat": {
        "domain": "general",
        "temperature": 0.5,
        "max_tokens": 1024,
      }
    },
    "payload": {
      "message": {
        "text": [
          { "role": "user", "content": messageContent },
        ]
      }
    }
  };
  return param;
};

async function getSparkReply(userMessageContent: string | undefined) {
  let url: string = await getWebsocketUrl(aipCredentials)
  let socket = new WebSocket(url);
  socket.onopen = () => {
    let param = getSparkRequestParam(aipCredentials, userMessageContent, userData)
    socket.send(JSON.stringify(param))
  }
  socket.onmessage = (event) => {
    let data = JSON.parse(event.data);
    let sparkReplyContent = data.payload.choices.text[0].content;
    if (data.header.code !== 0) {
      console.log("出错了", data.header.code, ":", data.header.message);
      socket.close();
    }
    if (data.header.code === 0) {
      if (data.payload.choices.text && data.header.status === 2) {
        setTimeout(() => {
          socket.close()
        }, 1000)
      }
    }
    addReplyToMsgwindow(sparkReplyContent);
  }
};

function addReplyToMsgwindow(reply: string) {
  if (messageList.value.slice(-1)[0].role == "user") {
    let sparkResult: ChatMessage = {
      role: "assistant",
      content: "",
    }
    sparkResult.content = reply;
    messageList.value.push(sparkResult);
    return;
  }
  messageList.value.slice(-1)[0].content += reply;
  scrollToBottom()
};

function scrollToBottom() {
  nextTick(() => {
    if (messageWindow.value)
      messageWindow.value.scrollTop = Number.MAX_SAFE_INTEGER
  })
};

</script>

<template>
  <div class="chat-box">
    <div class="message-window" ref="messageWindow">
      <div class="message-cell" v-for="message in messageList" :class="`message-cell-${message.role}`">
        <div class="avator">
          <div :class="`avator-${message.role}`"></div>
        </div>
        <div class="message-content" :class="`message-content-${message.role}`" v-if="message.content"
          v-html="message.content">
        </div>
      </div>
    </div>
    <div class="send-bar">
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <input type="text" class="message-input" placeholder="请输入你的问题" v-model="userMessageContent"
        @keydown.enter="sendMessage(userMessageContent)">
      <input type="button" value="发送" class="send-button" @click="sendMessage(userMessageContent)">
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
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  overflow-y: auto;
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
  border-radius: 12px;

  &-user {
    background-color: rgb(250, 228, 203);
  }

  &-assistant {
    background-color: rgb(242, 242, 242);
  }
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