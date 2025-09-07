import { ref } from 'vue';
import { defineStore } from 'pinia';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useChatStore } from './useChatStore';
import together from '@/api/together'; // 올바른 import 방식으로 수정

export const useSocketStore = defineStore('socket', () => {
  const stompClient = ref(null);
  const isConnected = ref(false);

  async function getJWT() {
    try {
      const tokenData = await together.getToken();
      const jwt = tokenData['authorization']; // 헤더에서 JWT 추출
      if (!jwt) {

        return null;
      }
      return jwt;
    } catch (error) {

      return null;
    }
  }

  async function connect() {
    if (isConnected.value) {

      return;
    }

    const jwt = await getJWT();

    const chatStore = useChatStore();
    const socket = new SockJS('https://api.dabomvideo.kro.kr/chat', null,
        {
          transportOptions: {
            xhr: { withCredentials: true },
            xhrStreaming: { withCredentials: true }
          }
        });
    stompClient.value = Stomp.over(socket);

    stompClient.value.connect(
        {},
      (frame) => {
        console.log('WebSocket connected:', frame);
        isConnected.value = true;

        stompClient.value.subscribe('/user/queue/messages', (message) => {
          console.log('Socket: Received raw message:', message);
          const messageData = JSON.parse(message.body);
          // Delegate all message processing to the chat store
          chatStore.processIncomingMessage(messageData);
        });
      },
      (error) => {
        console.error('STOMP: Connection error', error);
        isConnected.value = false;
        stompClient.value = null;
      }
    );
  }

  function disconnect() {
    if (stompClient.value) {
      stompClient.value.disconnect(() => {

        isConnected.value = false;
        stompClient.value = null;
      });
    }
  }

  function sendMessage(messageDto) {
    if (stompClient.value && isConnected.value) {


      stompClient.value.send(
        '/app/chat/send',
        {},
        JSON.stringify(messageDto)
      );
    } else {

    }
  }

  return {
    stompClient,
    isConnected,
    connect,
    disconnect,
    sendMessage,
  };
});
