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
        console.error('jwt가 비어있음.');
        return null;
      }
      return jwt;
    } catch (error) {
      console.error('JWT 가져오기 실패:', error);
      return null;
    }
  }

  async function connect() {
    if (isConnected.value) {
      console.log('Already connected.');
      return;
    }

    const jwt = await getJWT();

    const chatStore = useChatStore();
    const socket = new SockJS('http://localhost:8080/chat');
    stompClient.value = Stomp.over(socket);

    const headers = {
      Authorization: jwt
    };

    stompClient.value.connect(
      headers,
      (frame) => {
        console.log('WebSocket connected:', frame);
        isConnected.value = true;

        stompClient.value.subscribe('/user/queue/messages', (message) => {
          console.log('Socket: Received raw message:', message);
          const messageData = JSON.parse(message.body);
          console.log('Socket: Parsed messageData:', messageData);
          
          const transformedMessage = {
            id: messageData.createdAt || Date.now(),
            content: messageData.message,
            sender: messageData.senderName,
            sent: String(messageData.senderIdx) === String(chatStore.currentMemberIdx),
            time: new Date(messageData.createdAt).toLocaleTimeString(),
            isRead: messageData.isRead,
          };

          chatStore.addMessage(transformedMessage);
        });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
        isConnected.value = false;
        stompClient.value = null;
      }
    );
  }

  function disconnect() {
    if (stompClient.value) {
      stompClient.value.disconnect(() => {
        console.log('WebSocket disconnected.');
        isConnected.value = false;
        stompClient.value = null;
      });
    }
  }

  function sendMessage(messageDto) {
    if (stompClient.value && isConnected.value) {
      console.log("보내는 DTO:", messageDto);

      stompClient.value.send(
        '/app/chat/send',
        {},
        JSON.stringify(messageDto)
      );
    } else {
      console.error('Cannot send message, not connected.');
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
