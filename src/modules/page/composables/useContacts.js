import { computed, ref } from "vue";
import { useStore } from "vuex";
import useSocket from "./useSocket";

const useContacts = () => {
  const store = useStore();
  const { listenMessage } = useSocket();
  store.dispatch("page/getContacts").then(() => listenMessage());

  const haveNotification = (id) =>
    store.getters["page/getNotifications"].some((notified) => notified === id);

  return {
    contacts: computed(() => store.getters["page/getContacts"]),
    selectedUser: computed(() => store.getters["page/getSelectedContact"]),
    haveNotification,
    handleSetContact: (index) => {
      store.dispatch("page/setSelectedContactAndRom", index).then(() => {
        listenMessage();
      });
    },
  };
};
export default useContacts;
