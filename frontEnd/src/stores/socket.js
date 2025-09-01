import { ref } from 'vue';
import { defineStore } from 'pinia';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const useSocketStore = defineStore('socket', () => {
  const stompClient = ref(null);
  const isConnected = ref(false);
  const receivedMessages = ref([]);

  function connect() {
    if (isConnected.value) {
      console.log('Already connected.');
      return;
    }

    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('JWT Token not found.');
      return;
    }

    const socket = new SockJS('http://localhost:8080/chat');
    stompClient.value = Stomp.over(socket);

    stompClient.value.connect(
      { Authorization: `Bearer ${jwtToken}` },
      (frame) => {
        console.log('WebSocket connected:', frame);
        isConnected.value = true;

        stompClient.value.subscribe('/user/queue/messages', (message) => {
          const messageData = JSON.parse(message.body);
          receivedMessages.value.push(messageData);
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
        receivedMessages.value = [];
      });
    }
  }

  function sendMessage(messageDto) {
    if (stompClient.value && isConnected.value) {
      stompClient.value.send('/app/chat/send', {}, JSON.stringify(messageDto));
    } else {
      console.error('Cannot send message, not connected.');
    }
  }

  return {
    stompClient,
    isConnected,
    receivedMessages,
    connect,
    disconnect,
    sendMessage,
  };
});
