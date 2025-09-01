import { ref } from 'vue';
import { defineStore } from 'pinia';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useChatStore } from './useChatStore'; // Import chat store

export const useSocketStore = defineStore('socket', () => {
  const stompClient = ref(null);
  const isConnected = ref(false);
  // receivedMessages is removed, chatStore will be the single source of truth

  function connect() {
    if (isConnected.value) {
      console.log('Already connected.');
      return;
    }

    const chatStore = useChatStore(); // Initialize chat store

    const socket = new SockJS('http://localhost:8080/chat');
    stompClient.value = Stomp.over(socket);

    stompClient.value.connect(
      {},
      (frame) => {
        console.log('WebSocket connected:', frame);
        isConnected.value = true;

        stompClient.value.subscribe('/user/queue/messages', (message) => {
          console.log('Socket: Received raw message:', message); // Log raw message
          const messageData = JSON.parse(message.body);
          console.log('Socket: Parsed messageData:', messageData); // Log parsed data
          
          // Transform the message to the format MessageBubble expects
          const transformedMessage = {
            id: messageData.createdAt || Date.now(),
            content: messageData.message,
            sender: messageData.senderName,
            sent: String(messageData.senderIdx) === String(chatStore.currentMemberIdx),
            time: new Date(messageData.createdAt).toLocaleTimeString(),
            isRead: messageData.isRead,
          };

          // Add the transformed message to the central chat store
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
        // No need to clear messages here anymore
      });
    }
  }

  function sendMessage(messageDto) { // Expects a single object argument
    if (stompClient.value && isConnected.value) {
      console.log("보내는 DTO:", messageDto); // Debug log for the actual DTO being sent

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
    // receivedMessages is removed
    connect,
    disconnect,
    sendMessage,
  };
});
