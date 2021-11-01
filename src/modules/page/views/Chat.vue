<template>
  <div class="div-messages-container">
    <div class="div-messages px-4 py-4 d-flex flex-column">
      <template v-if="!!messages && !!messages.length">
        <div
          class="card col-6 col-sm-5 col-md-4 col-lg-3 mt-4"
          v-for="(message, index) in messages" :key="`message-${index}`"
          :class="message?.user == userId ? 'ms-auto div-my-message' : ''"
        >
          <div class="card-body">{{ message?.data }}</div>
        </div>
      </template>
      <div class="clearfix"></div>
    </div>
    <div class="px-4">
      <input
        type="text"
        class="form-control mt-1"
        placeholder="Mensaje..."
        aria-label="Mensaje..."
        minlength="2"
        v-model="newMessageInput"
        @keyup.enter="send"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import useSocket from "../composables/useSocket";
import useChat from "../composables/useChat";

export default {
  setup() {
    const store = useStore();
    const newMessageInput = ref("");

    const { newMessage } = useSocket();
    const { room, token, username, messages, userId } = useChat();
    
    const send = () => {
      if (!!newMessageInput.value && !!room) {
        newMessage({
          message: newMessageInput.value,
          room,
          user: {
            token,
            username,
          },
        });
      }
      newMessageInput.value = "";
    };

    return {
      newMessageInput,
      messages,
      userId,
      send,
    };
  },
};
</script>

<style scoped>
.div-my-message {
  background-color: #d2f4ea;
}

.div-messages {
  height: calc(100vh - 56px);
  overflow-y: scroll;
}

.div-messages-container {
  height: 100vh;
  background-color: #cff4fc;
}
</style>
