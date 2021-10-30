import { computed } from "vue";
import { useStore } from "vuex";

const useChat = () => {

  const store = useStore()

  return {
      room: store.getters["page/getRoom"],
      token: store.getters["auth/getToken"],
      username: store.getters["auth/getUsername"],
      messages: computed(() => store.getters["page/getMessages"]),
      userId: computed(() => store.getters["auth/getUserId"]),
  }
}
export default useChat;
