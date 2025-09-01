import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', () => {
  const currentRoomIdx = ref(null);
  const currentRecipientIdx = ref(null);
  const currentMemberIdx = ref(null); // New state for current user's ID
  const currentMemberName = ref(null); // New state for current user's name
  const messages = ref([]); // New state for messages in the current chat room

  function setCurrentChatRoom(roomIdx, recipientIdx) {
    currentRoomIdx.value = roomIdx;
    currentRecipientIdx.value = recipientIdx;
    messages.value = []; // Clear messages when switching rooms
  }

  function setCurrentMember(idx, name) { // New function to set current user's info
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

  return {
    currentRoomIdx,
    currentRecipientIdx,
    currentMemberIdx,
    currentMemberName,
    messages, // Return new state
    setCurrentChatRoom,
    setCurrentMember,
    addMessage,
    setMessages,
    clearMessages,
  };
});
