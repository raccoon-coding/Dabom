import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {
  const currentRoomIdx = ref(null);
  const currentRecipientIdx = ref(null);
  const currentRecipientName = ref(null);
  const currentMemberIdx = ref(null);
  const currentMemberName = ref(null);
  const messages = ref([]);
  const chatRooms = ref({}); // chatData from component is now here

  function setChatRooms(rooms) {
    chatRooms.value = rooms;
  }

  function setCurrentChatRoom(roomIdx, recipientIdx, recipientName) {
    currentRoomIdx.value = roomIdx;
    currentRecipientIdx.value = recipientIdx;
    currentRecipientName.value = recipientName;
    messages.value = []; // Clear messages when switching rooms

    // Reset unread count for the selected chat room
    if (chatRooms.value[roomIdx]) {
      chatRooms.value[roomIdx].unreadCount = 0;
    }
  }

  function setCurrentMember(idx, name) {
    currentMemberIdx.value = idx;
    currentMemberName.value = name;
  }

  function addMessage(message) {
    messages.value.push(message);
  }

  function setMessages(newMessages) {
    messages.value = newMessages;
  }

  function clearMessages() {
    messages.value = [];
  }

  // New function to handle all incoming messages
  function processIncomingMessage(messageData) {
    console.log('ChatStore: Processing incoming message', messageData);
    const roomIdx = messageData.roomIdx.toString();

    // Update last message and time for the chat room list
    if (chatRooms.value[roomIdx]) {
      chatRooms.value[roomIdx].lastMessage = messageData.message;
      chatRooms.value[roomIdx].time = new Date(messageData.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // If it's for the currently open chat, add it to the messages list
    if (String(messageData.roomIdx) === String(currentRoomIdx.value)) {
      console.log('ChatStore: Message is for the CURRENT chat room. Adding to messages list.');
      const transformedMessage = {
        id: messageData.createdAt || Date.now(),
        content: messageData.message,
        sender: messageData.senderName,
        sent: String(messageData.senderIdx) === String(currentMemberIdx.value),
        time: new Date(messageData.createdAt).toLocaleTimeString(),
        isRead: messageData.isRead,
      };
      addMessage(transformedMessage);
    } else {
      console.log('ChatStore: Message is for an INACTIVE chat room. Updating unread count.');
      // If it's for another chat room, increment unread count
      if (chatRooms.value[roomIdx]) {
        chatRooms.value[roomIdx].unreadCount = (chatRooms.value[roomIdx].unreadCount || 0) + 1;
      }
    }
  }

  return {
    currentRoomIdx,
    currentRecipientIdx,
    currentRecipientName,
    currentMemberIdx,
    currentMemberName,
    messages,
    chatRooms, // expose new state
    setChatRooms, // expose new action
    setCurrentChatRoom,
    setCurrentMember,
    addMessage,
    setMessages,
    clearMessages,
    processIncomingMessage, // expose new action
  };
});
